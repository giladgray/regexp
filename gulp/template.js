module.exports = (gulp, plugins, config) => {
  gulp.task("template", () => (
    gulp.src(`${config.src}/*.html`)
      .pipe(plugins.template(config))
      .pipe(gulp.dest(config.dest))
      .pipe(plugins.count("<%= files %> templated"))
  ));
};
