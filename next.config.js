// next.config.js
const withPlugins = require('next-compose-plugins');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const plugins = withPlugins([
], {
  dev: !PHASE_PRODUCTION_BUILD,
  compress: PHASE_PRODUCTION_BUILD,
  pageExtension: ['tsx', 'js'],
  env: {
    VERSION: `${require('./package.json').version}`
  },
  webpack(config) {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./polyfills.js')
      ) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    };
    return config
  }
});

module.exports = plugins;
