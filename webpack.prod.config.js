const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const CopyPlugin = require('copy-webpack-plugin');

const config = createConfig('webpack-prod');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

config.resolve.alias = {
  ...config.resolve.alias,
  '@src': path.resolve(__dirname, 'src'),
  './ErrorBoundary': path.resolve(__dirname, 'node_modules/@openedx/gym-frontend/overrides/platform/ErrorBoundary'),
};

config.module.rules[0].exclude = /node_modules\/(?!(query-string|split-on-first|strict-uri-encode|@edx|@openedx))/;

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, './public/robots.txt'),
        to: path.resolve(__dirname, './dist/robots.txt'),
      },
    ],
  }),
);

module.exports = config;
