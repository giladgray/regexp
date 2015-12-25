import path from "path";
import webpack from "webpack";

/*
options: {
  hot: enable hot reloading
}
 */

module.exports = (config, options = {}) => {
  const webpackConfig = {
    entry: `./${config.src}/index.tsx`,
    output: {
      path: path.resolve(`./${config.dest}`),
      filename: `${config.webpackBundleName}.js`,
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader` and hot-reloaded
        {
          test: /\.tsx?$/,
          loaders: ["react-hot", "ts-loader"],
          include: path.resolve(`./${config.src}`),
        },
        {
          test: /\.s[ac]ss$/,
          loaders: ["style", "css", "autoprefixer", "sass"],
          include: path.resolve(`./${config.src}`),
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        // make these packages available implicitly (they'll be required automatically if used)
        "Promise": "es6-promise",
        "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch",
      }),
      new webpack.NoErrorsPlugin(),
    ],
  };

  if (options.hot) {
    // configure for hot reloading!
    webpackConfig.entry = [
      `webpack-dev-server/client?http://localhost:${config.port}`,
      "webpack/hot/only-dev-server", // "only" prefix prevents reload on syntax errors
      webpackConfig.entry,
    ];
    webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }

  return webpackConfig;
};
