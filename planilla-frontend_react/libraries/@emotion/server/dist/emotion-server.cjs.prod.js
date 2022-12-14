"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var createInstance_dist_emotionServerCreateInstance = require("../create-instance/dist/emotion-server-create-instance.cjs.prod.js");

require("through"), require("html-tokenize"), require("multipipe");

var css = require("@emotion/css"), _createEmotionServer = createInstance_dist_emotionServerCreateInstance.default(css.cache), extractCritical = _createEmotionServer.extractCritical, extractCriticalToChunks = _createEmotionServer.extractCriticalToChunks, renderStylesToString = _createEmotionServer.renderStylesToString, renderStylesToNodeStream = _createEmotionServer.renderStylesToNodeStream, constructStyleTagsFromChunks = _createEmotionServer.constructStyleTagsFromChunks;

exports.constructStyleTagsFromChunks = constructStyleTagsFromChunks, exports.extractCritical = extractCritical, 
exports.extractCriticalToChunks = extractCriticalToChunks, exports.renderStylesToNodeStream = renderStylesToNodeStream, 
exports.renderStylesToString = renderStylesToString;
