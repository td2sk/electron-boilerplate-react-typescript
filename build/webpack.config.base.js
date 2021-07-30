const webpack = require("webpack");

const mode = process.env.NODE_ENV || "development";
const isDevelopment = mode === "development";

module.exports = {
  mode,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: isDevelopment ? "inline-source-map" : false,
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
