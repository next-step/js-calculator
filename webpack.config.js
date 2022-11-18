var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 mode: 'none',
 entry: './src/js/index.js',
 output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
 },
 devServer: {
  port: 3000,
 },
 module: {
  rules: [
   {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
   },
  ],
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: 'index.html',
   favicon: 'src/images/calculator_icon.png',
  }),
 ],
};
