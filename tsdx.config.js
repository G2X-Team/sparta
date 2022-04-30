/* eslint-disable @typescript-eslint/no-var-requires */
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [autoprefixer()],
                inject: true,
                extract: 'css/main.css',
                // modules: true,
                // autoModules: true,
            })
        );

        return config;
    },
};
