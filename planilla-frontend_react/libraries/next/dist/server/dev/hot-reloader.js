"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderScriptError = renderScriptError;
exports.default = void 0;
var _middleware = require("next/dist/compiled/@next/react-dev-overlay/middleware");
var _hotMiddleware = require("./hot-middleware");
var _path = require("path");
var _webpack = require("next/dist/compiled/webpack/webpack");
var _entries = require("../../build/entries");
var _output = require("../../build/output");
var _webpackConfig = _interopRequireDefault(require("../../build/webpack-config"));
var _constants = require("../../lib/constants");
var _recursiveDelete = require("../../lib/recursive-delete");
var _constants1 = require("../../shared/lib/constants");
var _pathMatch = require("../../shared/lib/router/utils/path-match");
var _findPageFile = require("../lib/find-page-file");
var _onDemandEntryHandler = require("./on-demand-entry-handler");
var _denormalizePagePath = require("../../shared/lib/page-path/denormalize-page-path");
var _normalizePathSep = require("../../shared/lib/page-path/normalize-path-sep");
var _getRouteFromEntrypoint = _interopRequireDefault(require("../get-route-from-entrypoint"));
var _fileExists = require("../../lib/file-exists");
var _utils = require("../../build/utils");
var _utils1 = require("../../shared/lib/utils");
var _trace = require("../../trace");
var _isError = require("../../lib/is-error");
var _ws = _interopRequireDefault(require("next/dist/compiled/ws"));
var _fs = require("fs");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const wsServer = new _ws.default.Server({
    noServer: true
});
async function renderScriptError(res, error, { verbose =true  } = {}) {
    // Asks CDNs and others to not to cache the errored page
    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    if (error.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('404 - Not Found');
        return;
    }
    if (verbose) {
        console.error(error.stack);
    }
    res.statusCode = 500;
    res.end('500 - Internal Error');
}
function addCorsSupport(req, res) {
    const isApiRoute = req.url.match(_constants.API_ROUTE);
    // API routes handle their own CORS headers
    if (isApiRoute) {
        return {
            preflight: false
        };
    }
    if (!req.headers.origin) {
        return {
            preflight: false
        };
    }
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    // Based on https://github.com/primus/access-control/blob/4cf1bc0e54b086c91e6aa44fb14966fa5ef7549c/index.js#L158
    if (req.headers['access-control-request-headers']) {
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return {
            preflight: true
        };
    }
    return {
        preflight: false
    };
}
const matchNextPageBundleRequest = (0, _pathMatch).getPathMatch('/_next/static/chunks/pages/:path*.js(\\.map|)');
// Recursively look up the issuer till it ends up at the root
function findEntryModule(compilation, issuerModule) {
    const issuer = compilation.moduleGraph.getIssuer(issuerModule);
    if (issuer) {
        return findEntryModule(compilation, issuer);
    }
    return issuerModule;
}
function erroredPages(compilation) {
    const failedPages = {};
    for (const error of compilation.errors){
        if (!error.module) {
            continue;
        }
        const entryModule = findEntryModule(compilation, error.module);
        const { name  } = entryModule;
        if (!name) {
            continue;
        }
        // Only pages have to be reloaded
        const enhancedName = (0, _getRouteFromEntrypoint).default(name);
        if (!enhancedName) {
            continue;
        }
        if (!failedPages[enhancedName]) {
            failedPages[enhancedName] = [];
        }
        failedPages[enhancedName].push(error);
    }
    return failedPages;
}
class HotReloader {
    constructor(dir, { config , pagesDir , distDir , buildId , previewProps , rewrites  }){
        this.clientError = null;
        this.serverError = null;
        this.pagesMapping = {};
        this.buildId = buildId;
        this.dir = dir;
        this.middlewares = [];
        this.pagesDir = pagesDir;
        this.distDir = distDir;
        this.clientStats = null;
        this.serverStats = null;
        this.edgeServerStats = null;
        this.serverPrevDocumentHash = null;
        this.config = config;
        this.runtime = config.experimental.runtime;
        this.hasReactRoot = !!process.env.__NEXT_REACT_ROOT;
        this.hasServerComponents = this.hasReactRoot && !!config.experimental.serverComponents;
        this.previewProps = previewProps;
        this.rewrites = rewrites;
        this.hotReloaderSpan = (0, _trace).trace('hot-reloader', undefined, {
            version: "12.1.6"
        });
        // Ensure the hotReloaderSpan is flushed immediately as it's the parentSpan for all processing
        // of the current `next dev` invocation.
        this.hotReloaderSpan.stop();
    }
    async run(req, res, parsedUrl) {
        // Usually CORS support is not needed for the hot-reloader (this is dev only feature)
        // With when the app runs for multi-zones support behind a proxy,
        // the current page is trying to access this URL via assetPrefix.
        // That's when the CORS support is needed.
        const { preflight  } = addCorsSupport(req, res);
        if (preflight) {
            return {};
        }
        // When a request comes in that is a page bundle, e.g. /_next/static/<buildid>/pages/index.js
        // we have to compile the page using on-demand-entries, this middleware will handle doing that
        // by adding the page to on-demand-entries, waiting till it's done
        // and then the bundle will be served like usual by the actual route in server/index.js
        const handlePageBundleRequest = async (pageBundleRes, parsedPageBundleUrl)=>{
            const { pathname  } = parsedPageBundleUrl;
            const params = matchNextPageBundleRequest(pathname);
            if (!params) {
                return {};
            }
            let decodedPagePath;
            try {
                decodedPagePath = `/${params.path.map((param)=>decodeURIComponent(param)
                ).join('/')}`;
            } catch (_) {
                throw new _utils1.DecodeError('failed to decode param');
            }
            const page = (0, _denormalizePagePath).denormalizePagePath(decodedPagePath);
            if (page === '/_error' || _constants1.BLOCKED_PAGES.indexOf(page) === -1) {
                try {
                    await this.ensurePage(page, true);
                } catch (error) {
                    await renderScriptError(pageBundleRes, (0, _isError).getProperError(error));
                    return {
                        finished: true
                    };
                }
                const errors = await this.getCompilationErrors(page);
                if (errors.length > 0) {
                    await renderScriptError(pageBundleRes, errors[0], {
                        verbose: false
                    });
                    return {
                        finished: true
                    };
                }
            }
            return {};
        };
        const { finished  } = await handlePageBundleRequest(res, parsedUrl);
        for (const fn of this.middlewares){
            await new Promise((resolve, reject)=>{
                fn(req, res, (err)=>{
                    if (err) return reject(err);
                    resolve();
                });
            });
        }
        return {
            finished
        };
    }
    onHMR(req, _res, head) {
        wsServer.handleUpgrade(req, req.socket, head, (client)=>{
            var ref, ref1;
            (ref = this.webpackHotMiddleware) === null || ref === void 0 ? void 0 : ref.onHMR(client);
            (ref1 = this.onDemandEntries) === null || ref1 === void 0 ? void 0 : ref1.onHMR(client);
            client.addEventListener('message', ({ data  })=>{
                data = typeof data !== 'string' ? data.toString() : data;
                try {
                    const payload = JSON.parse(data);
                    let traceChild;
                    switch(payload.event){
                        case 'client-hmr-latency':
                            {
                                traceChild = {
                                    name: payload.event,
                                    startTime: BigInt(payload.startTime * 1000 * 1000),
                                    endTime: BigInt(payload.endTime * 1000 * 1000)
                                };
                                break;
                            }
                        case 'client-reload-page':
                        case 'client-success':
                            {
                                traceChild = {
                                    name: payload.event
                                };
                                break;
                            }
                        case 'client-error':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        errorCount: payload.errorCount
                                    }
                                };
                                break;
                            }
                        case 'client-warning':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        warningCount: payload.warningCount
                                    }
                                };
                                break;
                            }
                        case 'client-removed-page':
                        case 'client-added-page':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        page: payload.page || ''
                                    }
                                };
                                break;
                            }
                        default:
                            {
                                break;
                            }
                    }
                    if (traceChild) {
                        this.hotReloaderSpan.manualTraceChild(traceChild.name, traceChild.startTime || process.hrtime.bigint(), traceChild.endTime || process.hrtime.bigint(), {
                            ...traceChild.attrs,
                            clientId: payload.id
                        });
                    }
                } catch (_) {
                // invalid WebSocket message
                }
            });
        });
    }
    async clean(span) {
        return span.traceChild('clean').traceAsyncFn(()=>(0, _recursiveDelete).recursiveDelete((0, _path).join(this.dir, this.config.distDir), /^cache/)
        );
    }
    async getWebpackConfig(span) {
        const webpackConfigSpan = span.traceChild('get-webpack-config');
        return webpackConfigSpan.traceAsyncFn(async ()=>{
            const pagePaths = await webpackConfigSpan.traceChild('get-page-paths').traceAsyncFn(()=>Promise.all([
                    (0, _findPageFile).findPageFile(this.pagesDir, '/_app', this.config.pageExtensions),
                    (0, _findPageFile).findPageFile(this.pagesDir, '/_document', this.config.pageExtensions), 
                ])
            );
            this.pagesMapping = webpackConfigSpan.traceChild('create-pages-mapping').traceFn(()=>(0, _entries).createPagesMapping({
                    hasServerComponents: this.hasServerComponents,
                    isDev: true,
                    pageExtensions: this.config.pageExtensions,
                    pagePaths: pagePaths.filter((i)=>typeof i === 'string'
                    )
                })
            );
            const entrypoints = await webpackConfigSpan.traceChild('create-entrypoints').traceAsyncFn(()=>(0, _entries).createEntrypoints({
                    buildId: this.buildId,
                    config: this.config,
                    envFiles: [],
                    isDev: true,
                    pages: this.pagesMapping,
                    pagesDir: this.pagesDir,
                    previewMode: this.previewProps,
                    target: 'server'
                })
            );
            const commonWebpackOptions = {
                dev: true,
                buildId: this.buildId,
                config: this.config,
                hasReactRoot: this.hasReactRoot,
                pagesDir: this.pagesDir,
                rewrites: this.rewrites,
                runWebpackSpan: this.hotReloaderSpan
            };
            return webpackConfigSpan.traceChild('generate-webpack-config').traceAsyncFn(()=>Promise.all([
                    (0, _webpackConfig).default(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: 'client',
                        entrypoints: entrypoints.client
                    }),
                    (0, _webpackConfig).default(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: 'server',
                        entrypoints: entrypoints.server
                    }),
                    (0, _webpackConfig).default(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: 'edge-server',
                        entrypoints: entrypoints.edgeServer
                    }), 
                ])
            );
        });
    }
    async buildFallbackError() {
        if (this.fallbackWatcher) return;
        const fallbackConfig = await (0, _webpackConfig).default(this.dir, {
            runWebpackSpan: this.hotReloaderSpan,
            dev: true,
            compilerType: 'client',
            config: this.config,
            buildId: this.buildId,
            pagesDir: this.pagesDir,
            rewrites: {
                beforeFiles: [],
                afterFiles: [],
                fallback: []
            },
            isDevFallback: true,
            entrypoints: (await (0, _entries).createEntrypoints({
                buildId: this.buildId,
                config: this.config,
                envFiles: [],
                isDev: true,
                pages: {
                    '/_app': 'next/dist/pages/_app',
                    '/_error': 'next/dist/pages/_error'
                },
                pagesDir: this.pagesDir,
                previewMode: this.previewProps,
                target: 'server'
            })).client,
            hasReactRoot: this.hasReactRoot
        });
        const fallbackCompiler = (0, _webpack).webpack(fallbackConfig);
        this.fallbackWatcher = await new Promise((resolve)=>{
            let bootedFallbackCompiler = false;
            fallbackCompiler.watch(// @ts-ignore webpack supports an array of watchOptions when using a multiCompiler
            fallbackConfig.watchOptions, // Errors are handled separately
            (_err)=>{
                if (!bootedFallbackCompiler) {
                    bootedFallbackCompiler = true;
                    resolve(true);
                }
            });
        });
    }
    async start() {
        const startSpan = this.hotReloaderSpan.traceChild('start');
        startSpan.stop() // Stop immediately to create an artificial parent span
        ;
        await this.clean(startSpan);
        // Ensure distDir exists before writing package.json
        await _fs.promises.mkdir(this.distDir, {
            recursive: true
        });
        const distPackageJsonPath = (0, _path).join(this.distDir, 'package.json');
        // Ensure commonjs handling is used for files in the distDir (generally .next)
        // Files outside of the distDir can be "type": "module"
        await _fs.promises.writeFile(distPackageJsonPath, '{"type": "commonjs"}');
        const configs = await this.getWebpackConfig(startSpan);
        for (const config1 of configs){
            const defaultEntry = config1.entry;
            config1.entry = async (...args)=>{
                // @ts-ignore entry is always a function
                const entrypoints = await defaultEntry(...args);
                const isClientCompilation = config1.name === 'client';
                const isNodeServerCompilation = config1.name === 'server';
                const isEdgeServerCompilation = config1.name === 'edge-server';
                await Promise.all(Object.keys(_onDemandEntryHandler.entries).map(async (pageKey)=>{
                    const { bundlePath , absolutePagePath , dispose  } = _onDemandEntryHandler.entries[pageKey];
                    const result = /^(client|server|edge-server)(.*)/g.exec(pageKey);
                    const [, key, page] = result// this match should always happen
                    ;
                    if (key === 'client' && !isClientCompilation) return;
                    if (key === 'server' && !isNodeServerCompilation) return;
                    if (key === 'edge-server' && !isEdgeServerCompilation) return;
                    // Check if the page was removed or disposed and remove it
                    const pageExists = !dispose && await (0, _fileExists).fileExists(absolutePagePath);
                    if (!pageExists) {
                        delete _onDemandEntryHandler.entries[pageKey];
                        return;
                    }
                    (0, _entries).runDependingOnPageType({
                        page,
                        pageRuntime: await (0, _entries).getPageRuntime(absolutePagePath, this.config),
                        onEdgeServer: ()=>{
                            if (isEdgeServerCompilation) {
                                _onDemandEntryHandler.entries[pageKey].status = _onDemandEntryHandler.BUILDING;
                                entrypoints[bundlePath] = (0, _entries).finalizeEntrypoint({
                                    compilerType: 'edge-server',
                                    name: bundlePath,
                                    value: (0, _entries).getEdgeServerEntry({
                                        absolutePagePath,
                                        buildId: this.buildId,
                                        bundlePath,
                                        config: this.config,
                                        isDev: true,
                                        page,
                                        pages: this.pagesMapping
                                    })
                                });
                            }
                        },
                        onClient: ()=>{
                            if (isClientCompilation) {
                                _onDemandEntryHandler.entries[pageKey].status = _onDemandEntryHandler.BUILDING;
                                entrypoints[bundlePath] = (0, _entries).finalizeEntrypoint({
                                    name: bundlePath,
                                    compilerType: 'client',
                                    value: (0, _entries).getClientEntry({
                                        absolutePagePath,
                                        page
                                    })
                                });
                            }
                        },
                        onServer: ()=>{
                            if (isNodeServerCompilation) {
                                _onDemandEntryHandler.entries[pageKey].status = _onDemandEntryHandler.BUILDING;
                                let request = (0, _path).relative(config1.context, absolutePagePath);
                                if (!(0, _path).isAbsolute(request) && !request.startsWith('../')) {
                                    request = `./${request}`;
                                }
                                entrypoints[bundlePath] = (0, _entries).finalizeEntrypoint({
                                    compilerType: 'server',
                                    name: bundlePath,
                                    value: request
                                });
                            }
                        }
                    });
                }));
                return entrypoints;
            };
        }
        // Enable building of client compilation before server compilation in development
        // @ts-ignore webpack 5
        configs.parallelism = 1;
        const multiCompiler = (0, _webpack).webpack(configs);
        (0, _output).watchCompilers(multiCompiler.compilers[0], multiCompiler.compilers[1], multiCompiler.compilers[2]);
        // Watch for changes to client/server page files so we can tell when just
        // the server file changes and trigger a reload for GS(S)P pages
        const changedClientPages = new Set();
        const changedServerPages = new Set();
        const changedEdgeServerPages = new Set();
        const prevClientPageHashes = new Map();
        const prevServerPageHashes = new Map();
        const prevEdgeServerPageHashes = new Map();
        const trackPageChanges = (pageHashMap, changedItems)=>(stats)=>{
                try {
                    stats.entrypoints.forEach((entry, key)=>{
                        if (key.startsWith('pages/')) {
                            // TODO this doesn't handle on demand loaded chunks
                            entry.chunks.forEach((chunk)=>{
                                if (chunk.id === key) {
                                    const modsIterable = stats.chunkGraph.getChunkModulesIterable(chunk);
                                    let chunksHash = new _webpack.StringXor();
                                    modsIterable.forEach((mod)=>{
                                        if (mod.resource && mod.resource.replace(/\\/g, '/').includes(key)) {
                                            // use original source to calculate hash since mod.hash
                                            // includes the source map in development which changes
                                            // every time for both server and client so we calculate
                                            // the hash without the source map for the page module
                                            const hash = require('crypto').createHash('sha256').update(mod.originalSource().buffer()).digest().toString('hex');
                                            chunksHash.add(hash);
                                        } else {
                                            // for non-pages we can use the module hash directly
                                            const hash = stats.chunkGraph.getModuleHash(mod, chunk.runtime);
                                            chunksHash.add(hash);
                                        }
                                    });
                                    const prevHash = pageHashMap.get(key);
                                    const curHash = chunksHash.toString();
                                    if (prevHash && prevHash !== curHash) {
                                        changedItems.add(key);
                                    }
                                    pageHashMap.set(key, curHash);
                                }
                            });
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        ;
        multiCompiler.compilers[0].hooks.emit.tap('NextjsHotReloaderForClient', trackPageChanges(prevClientPageHashes, changedClientPages));
        multiCompiler.compilers[1].hooks.emit.tap('NextjsHotReloaderForServer', trackPageChanges(prevServerPageHashes, changedServerPages));
        multiCompiler.compilers[2].hooks.emit.tap('NextjsHotReloaderForServer', trackPageChanges(prevEdgeServerPageHashes, changedEdgeServerPages));
        // This plugin watches for changes to _document.js and notifies the client side that it should reload the page
        multiCompiler.compilers[1].hooks.failed.tap('NextjsHotReloaderForServer', (err)=>{
            this.serverError = err;
            this.serverStats = null;
        });
        multiCompiler.compilers[2].hooks.done.tap('NextjsHotReloaderForServer', (stats)=>{
            this.serverError = null;
            this.edgeServerStats = stats;
        });
        multiCompiler.compilers[1].hooks.done.tap('NextjsHotReloaderForServer', (stats)=>{
            this.serverError = null;
            this.serverStats = stats;
            const { compilation  } = stats;
            // We only watch `_document` for changes on the server compilation
            // the rest of the files will be triggered by the client compilation
            const documentChunk = compilation.namedChunks.get('pages/_document');
            // If the document chunk can't be found we do nothing
            if (!documentChunk) {
                console.warn('_document.js chunk not found');
                return;
            }
            // Initial value
            if (this.serverPrevDocumentHash === null) {
                this.serverPrevDocumentHash = documentChunk.hash || null;
                return;
            }
            // If _document.js didn't change we don't trigger a reload
            if (documentChunk.hash === this.serverPrevDocumentHash) {
                return;
            }
            // Notify reload to reload the page, as _document.js was changed (different hash)
            this.send('reloadPage');
            this.serverPrevDocumentHash = documentChunk.hash || null;
        });
        multiCompiler.hooks.done.tap('NextjsHotReloaderForServer', ()=>{
            const serverOnlyChanges = (0, _utils).difference(changedServerPages, changedClientPages);
            const middlewareChanges = Array.from(changedEdgeServerPages).filter((name)=>name.match(_constants.MIDDLEWARE_ROUTE)
            );
            changedClientPages.clear();
            changedServerPages.clear();
            changedEdgeServerPages.clear();
            if (middlewareChanges.length > 0) {
                this.send({
                    event: 'middlewareChanges'
                });
            }
            if (serverOnlyChanges.length > 0) {
                this.send({
                    event: 'serverOnlyChanges',
                    pages: serverOnlyChanges.map((pg)=>(0, _denormalizePagePath).denormalizePagePath(pg.slice('pages'.length))
                    )
                });
            }
        });
        multiCompiler.compilers[0].hooks.failed.tap('NextjsHotReloaderForClient', (err)=>{
            this.clientError = err;
            this.clientStats = null;
        });
        multiCompiler.compilers[0].hooks.done.tap('NextjsHotReloaderForClient', (stats)=>{
            this.clientError = null;
            this.clientStats = stats;
            const { compilation  } = stats;
            const chunkNames = new Set([
                ...compilation.namedChunks.keys()
            ].filter((name)=>!!(0, _getRouteFromEntrypoint).default(name)
            ));
            if (this.prevChunkNames) {
                // detect chunks which have to be replaced with a new template
                // e.g, pages/index.js <-> pages/_error.js
                const addedPages = diff(chunkNames, this.prevChunkNames);
                const removedPages = diff(this.prevChunkNames, chunkNames);
                if (addedPages.size > 0) {
                    for (const addedPage of addedPages){
                        const page = (0, _getRouteFromEntrypoint).default(addedPage);
                        this.send('addedPage', page);
                    }
                }
                if (removedPages.size > 0) {
                    for (const removedPage of removedPages){
                        const page = (0, _getRouteFromEntrypoint).default(removedPage);
                        this.send('removedPage', page);
                    }
                }
            }
            this.prevChunkNames = chunkNames;
        });
        this.webpackHotMiddleware = new _hotMiddleware.WebpackHotMiddleware(multiCompiler.compilers);
        let booted = false;
        this.watcher = await new Promise((resolve)=>{
            const watcher = multiCompiler.watch(// @ts-ignore webpack supports an array of watchOptions when using a multiCompiler
            configs.map((config)=>config.watchOptions
            ), // Errors are handled separately
            (_err)=>{
                if (!booted) {
                    booted = true;
                    resolve(watcher);
                }
            });
        });
        this.onDemandEntries = (0, _onDemandEntryHandler).onDemandEntryHandler({
            multiCompiler,
            watcher: this.watcher,
            pagesDir: this.pagesDir,
            nextConfig: this.config,
            ...this.config.onDemandEntries
        });
        this.middlewares = [
            (0, _middleware).getOverlayMiddleware({
                rootDirectory: this.dir,
                stats: ()=>this.clientStats
                ,
                serverStats: ()=>this.serverStats
            }), 
        ];
    }
    async stop() {
        await new Promise((resolve, reject)=>{
            this.watcher.close((err)=>err ? reject(err) : resolve(true)
            );
        });
        if (this.fallbackWatcher) {
            await new Promise((resolve, reject)=>{
                this.fallbackWatcher.close((err)=>err ? reject(err) : resolve(true)
                );
            });
        }
    }
    async getCompilationErrors(page) {
        var ref4, ref2, ref3;
        const getErrors = ({ compilation  })=>{
            var ref;
            const failedPages = erroredPages(compilation);
            const normalizedPage = (0, _normalizePathSep).normalizePathSep(page);
            // If there is an error related to the requesting page we display it instead of the first error
            return ((ref = failedPages[normalizedPage]) === null || ref === void 0 ? void 0 : ref.length) > 0 ? failedPages[normalizedPage] : compilation.errors;
        };
        if (this.clientError || this.serverError) {
            return [
                this.clientError || this.serverError
            ];
        } else if ((ref4 = this.clientStats) === null || ref4 === void 0 ? void 0 : ref4.hasErrors()) {
            return getErrors(this.clientStats);
        } else if ((ref2 = this.serverStats) === null || ref2 === void 0 ? void 0 : ref2.hasErrors()) {
            return getErrors(this.serverStats);
        } else if ((ref3 = this.edgeServerStats) === null || ref3 === void 0 ? void 0 : ref3.hasErrors()) {
            return getErrors(this.edgeServerStats);
        } else {
            return [];
        }
    }
    send(action, ...args) {
        this.webpackHotMiddleware.publish(action && typeof action === 'object' ? action : {
            action,
            data: args
        });
    }
    async ensurePage(page, clientOnly = false) {
        var ref;
        // Make sure we don't re-build or dispose prebuilt pages
        if (page !== '/_error' && _constants1.BLOCKED_PAGES.indexOf(page) !== -1) {
            return;
        }
        const error = clientOnly ? this.clientError : this.serverError || this.clientError;
        if (error) {
            return Promise.reject(error);
        }
        return (ref = this.onDemandEntries) === null || ref === void 0 ? void 0 : ref.ensurePage(page, clientOnly);
    }
}
exports.default = HotReloader;
function diff(a, b) {
    return new Set([
        ...a
    ].filter((v)=>!b.has(v)
    ));
}

//# sourceMappingURL=hot-reloader.js.map