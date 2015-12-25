import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import makeWebpackConfig from "./make-webpack-config";


module.exports = (gulp, plugins, config) => {
  const webpackConfig = makeWebpackConfig(config);
  const {colors, log, PluginError} = plugins.util;

  gulp.task("webpack", (callback) => {
    // run webpack
    webpack(webpackConfig, (err, stats) => {
      if (err) throw new PluginError("webpack", err);
      log("[webpack]", stats.toString({
        // output options
      }));
      callback();
    });
  });

  gulp.task("webpack-dev-server", (callback) => { // eslint-disable-line no-unused-vars
    const webpackConfig = makeWebpackConfig(config, {hot: true});

    // launch webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig), {
      contentBase: config.dest,
      hot: true,
      historyApiFallback: true,
      noInfo: true,
      proxy: {
        // proxy backend calls to another server
        "/api/*": "http://localhost:9000",
      },
    }).listen(config.port, "localhost", (err) => {
      if (err) throw new PluginError("webpack-dev-server", err);
      log("[webpack-dev-server]", "server started at", colors.magenta(`http://localhost:${config.port}/`));
    });

    // by not calling the callback param, this task never terminates
  });
};
