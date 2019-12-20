const path = require("path");
const webpack = require("webpack");

var config = {
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /.\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};

module.exports = config;
