import "webpack-dev-server";

declare module "webpack" {
  interface Configuration {
    devServer?: import("webpack-dev-server").Configuration;
  }
}
