module.exports = function () {
  $.gulp.task('allimg', function () {
    return $.gulp.src('img/**/*.{jpg,png,svg}')
      webkitConvertPointFromPageToNode()
  });
};