const merge = require('lodash/merge');
const path = require('path');
const serverPort = require('../server').port;

const rootPath = path.resolve(__dirname, '../../');

const aliases = {
  client: path.join(rootPath, 'client'),
  assets: path.join(rootPath, 'client/assets'),
  components: path.join(rootPath, 'client/components'),
  shared: path.join(rootPath, 'config/shared'),
  utils: path.join(rootPath, 'client/utils'),
  EventBus: path.join(rootPath, 'client/EventBus')
};

const rules = [{
  test: /bootstrap-sass[/\\]assets[/\\]javascripts[/\\]/,
  use: 'imports-loader?jQuery=jquery'
}, {
  test: /\.load.js$/,
  use: 'val-loader'
}];

const uglifyJsOptions = {
  compressor: { warnings: false, keep_fnames: true },
  mangle: { keep_fnames: true }
};

module.exports = (options, req) => ({
  presets: [
    require('poi-preset-eslint')({ mode: '*' }),
    require('poi-preset-bundle-report')()
  ],
  entry: {
    app: 'client/main.js'
  },
  dist: 'dist',
  html: {
    template: 'index.html'
  },
  webpack(config) {
    config.module.rules.push(...rules);
    return config;
  },
  extendWebpack(config) {
    config.resolve.alias.merge(aliases);
    if (options.mode !== 'production') return;
    config.plugin('minimize').tap(args => [merge(...args, uglifyJsOptions)]);
  },
  sourceMap: options.mode === 'development',
  generateStats: true,
  port: 8080,
  devServer: {
    proxy: {
      '/api/v1': {
        target: `http://127.0.0.1:${serverPort}`
      }
    }
  }
});
