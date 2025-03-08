const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    transpileDependencies: true,
    pages: {
        index: {
            entry: 'src/main.js', // 入口文件
            title: 'POMOTODO'
        }
    }
})
