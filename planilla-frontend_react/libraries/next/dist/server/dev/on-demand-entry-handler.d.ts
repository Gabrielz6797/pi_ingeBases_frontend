import type ws from 'ws';
import type { webpack5 as webpack } from 'next/dist/compiled/webpack/webpack';
import type { NextConfigComplete } from '../config-shared';
export declare const ADDED: unique symbol;
export declare const BUILDING: unique symbol;
export declare const BUILT: unique symbol;
export declare const entries: {
    /**
     * The key composed of the compiler name and the page. For example:
     * `edge-server/about`
     */
    [page: string]: {
        /**
         * The absolute page to the page file. For example:
         * `/Users/Rick/project/pages/about/index.js`
         */
        absolutePagePath: string;
        /**
         * Path to the page file relative to the dist folder with no extension.
         * For example: `pages/about/index`
         */
        bundlePath: string;
        /**
         * Tells if a page is scheduled to be disposed.
         */
        dispose?: boolean;
        /**
         * Timestamp with the last time the page was active.
         */
        lastActiveTime?: number;
        /**
         * Page build status.
         */
        status?: typeof ADDED | typeof BUILDING | typeof BUILT;
    };
};
export declare function onDemandEntryHandler({ maxInactiveAge, multiCompiler, nextConfig, pagesBufferLength, pagesDir, watcher, }: {
    maxInactiveAge: number;
    multiCompiler: webpack.MultiCompiler;
    nextConfig: NextConfigComplete;
    pagesBufferLength: number;
    pagesDir: string;
    watcher: any;
}): {
    ensurePage(page: string, clientOnly: boolean): Promise<void[]>;
    onHMR(client: ws): void;
};
