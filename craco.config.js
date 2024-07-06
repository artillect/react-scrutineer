const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Allow imports from outside src
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
      );
      
      // Add aliases for easier imports
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, '.'),
      };

      // Modify the rule for JavaScript/JSX files
      const babelLoader = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && rule.oneOf.find((r) => r.loader && r.loader.includes('babel-loader'))
      );
      if (babelLoader) {
        const jsRule = babelLoader.oneOf.find((r) => r.test && r.test.toString().includes('jsx'));
        if (jsRule) {
          jsRule.include = [
            jsRule.include,
            path.resolve(__dirname, 'components'),
            path.resolve(__dirname, 'lib'),
          ];
        }
      }

      return webpackConfig;
    },
  },
};