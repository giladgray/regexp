"use strict";

import gulp from "gulp";
import del from "del";
import gulpLoadPlugins from "gulp-load-plugins";

const plugins = gulpLoadPlugins({
  scope: ["devDependencies"],
});

const config = {
  src: "client",
  dest: "build",
  port: 8080,
  title: "Application",
  webpackBundleName: "codes",
};

require("./gulp/template")(gulp, plugins, config);
require("./gulp/webpack")(gulp, plugins, config);

gulp.task("clean", () => del([config.dest]));

gulp.task("build", ["template", "webpack"]);

gulp.task("dev", ["template", "webpack-dev-server"]);

gulp.task("default", ["build"]);
