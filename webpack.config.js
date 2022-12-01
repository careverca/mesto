const path = require('path');

module.exports = {
  entry: { main: './src/index.js' },
  devServer: {
    static: './dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  mode: 'development',
    devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
}