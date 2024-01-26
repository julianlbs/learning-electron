/* eslint-disable @typescript-eslint/no-var-requires */
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  // Required to copy asset folders/files to webpack
  new CopyPlugin({
    patterns: [
      {
        from: 'public/images',
        to: 'public/images'
      }
    ]
  }),
  // Required not to throw errors when using node imports on preload.js
  new NodePolyfillPlugin()
];
