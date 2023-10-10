const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    // 打包文件夹
    publicPath: 'dist',
    // 打包文件
    filename: 'index.js',
    // 设置对外暴露对象的全局名称
    library: 'YJTools',
    // 打包生成通过esm、commonjs、requirejs的语法引入
    libraryTarget: 'umd'
  },
  devServer: {
    // 静态根目录
    contentBase: 'www',
    // 端口号
    port: 8080
  }
}
