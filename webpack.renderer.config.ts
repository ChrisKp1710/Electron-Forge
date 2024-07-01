// webpack.renderer.config.ts
import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";
import { merge } from "webpack-merge";

rules.push({
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"],
});

const commonConfig: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};

const devConfig: Configuration = {
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
};

const isProduction = process.env.NODE_ENV === "production";

export const rendererConfig: Configuration = isProduction
  ? commonConfig
  : merge(commonConfig, devConfig);
