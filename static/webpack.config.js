const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // Entry points for your application
  entry: {
    colors: path.resolve(__dirname, "src", "js", "colors.js"),
    audio: path.resolve(__dirname, "src", "js", "audio.js"),
    timebytime: path.resolve(__dirname, "src", "js", "timebytime.js")
  },
  mode: "development",
  target: "web",
  devServer: {
    hot: false
  },
  output: {
    path: path.resolve(__dirname, 'src', 'js', 'dist'),
    filename: '[name].js'
  },
  plugins: [new HTMLWebpackPlugin({})]
};
