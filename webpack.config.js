var webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    },
    alias: {
      // replace native `scrypt` module with pure js `js-scrypt`
      scrypt: "js-scrypt",
      Buffer: "buffer",
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist/web"),
    filename: "bundle.js",
    library: "SwarmBackup",
  },
};
