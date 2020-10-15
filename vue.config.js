module.exports = {
    chainWebpack: config => {
        config.resolve.extensions.merge(['.ts']).end()
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end()
    },
}
