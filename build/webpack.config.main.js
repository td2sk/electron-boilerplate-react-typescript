const { merge } = require("webpack-merge");
const path = require("path");

const base = require("./webpack.config.base");

const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");
const mode = process.env.NODE_ENV || "development";
const isDevelopment = mode === "development";

module.exports = merge(base, {
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: isDevelopment ? "tsconfig.json" : "tsconfig.prod.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/main/main.ts",
  output: {
    filename: "main.js",
    path: distDir,
  },
});
