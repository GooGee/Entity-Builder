const Title = 'Entity-Builder'

process.env.VUE_APP_TITLE = Title
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    lintOnSave: false,
    publicPath: '',
    chainWebpack: config => {
        config.optimization.minimize(false)
        config.plugin('html').tap(args => {
            args[0].title = Title
            return args
        })

        config.resolve.extensions.merge(['.ts']).end()
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end()
    },
}
