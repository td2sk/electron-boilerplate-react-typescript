const { spawn } = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const base = require("./webpack.config.base");

const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");
const mode = process.env.NODE_ENV || "development";
const isDevelopment = mode === "development";

module.exports = merge(base, {
  target: "web",
  entry: "./src/renderer/index.tsx",
  output: {
    filename: "bundle.js",
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { chrome: "92", electron: "13" } },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: isDevelopment
                ? "tsconfig.json"
                : "tsconfig.prod.json",
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src", "renderer", "index.ejs"),
      inject: false,
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    inline: true,
    contentBase: distDir,
    before: () => {
      console.log("Starting Main Process...");
      spawn("yarn", ["start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(code))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
});
