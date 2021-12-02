const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [autoprefixer()],
                inject: true,
                extract: !!options.writeMeta,
                // modules: true,
                // autoModules: true,
            })
        );

        return config;
    },
};
