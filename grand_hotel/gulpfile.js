/**
 * Created by stefan on 2019-05-20.
 * gulp-clean is replaced by gulp-rimraf
 * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 *
 */

/* jshint node: true */
"use strict";

const gulp = require("gulp"),
  prettyError = require("gulp-prettyerror"),
  watch = require("gulp-watch"),
  prefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  cleancss = require("gulp-clean-css"),
  rimraf = require("rimraf"),
  fileinclude = require('gulp-file-include'),
  imagemin = require("gulp-imagemin");

/**
 *
 * @type {{dist: {bower: string, html: string, php: string, js: string, css: string, img: string, fonts: string},
 * src: {bower: string, twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, watch: {twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, clean: string}}
 *
 */

/**
 * Variables
 *
 */
const path = {
  dist: {
    bower: "dist/bower_components/",
    php: "dist/templates/",
    theme: "dist",
    js: "dist/js/",
    info: "dist/",
    css: "dist/css/",
    img: "dist/images/",
    fonts: "dist/fonts/",
    html: "dist/",
    png: "dist"
  },
  src: {
    bower: "bower_components/**/*.*",
    php: "templates/**/*.php",
    theme: "*.php",
    js: "js/**/*.js",
    info: "*.info",
    style: "sass/*.scss",
    img: "images/**/*.*",
    fonts: "fonts/**/*.*",
    html: "index.html",
    png: "*.png"
  },
  watch: {
    style: "sass/**/*.scss"
  },
  clean: "./dist"
};

/**
 * clean task
 *
 */
gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});

/**
 * deploy tasks
 *
 */
gulp.task("bower:dist", function() {
  gulp.src(path.src.bower).pipe(gulp.dest(path.dist.bower));
});

gulp.task("php:dist", function() {
  gulp.src(path.src.php).pipe(gulp.dest(path.dist.php));
});

gulp.task("theme:dist", function() {
  gulp.src(path.src.theme).pipe(gulp.dest(path.dist.theme));
});

gulp.task("js:dist", function() {
  gulp
    .src(path.src.js)
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task("info:dist", function() {
  gulp.src(path.src.info).pipe(gulp.dest(path.dist.info));
});

gulp.task("style:dist", function() {
  gulp
    .src(path.src.style)
    .pipe(prettyError())
    .pipe(
      sass({
        sourceMap: true,
        errLogToConsole: true
      })
    )
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleancss({ compatibility: "ie9" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css));
});

gulp.task("img:dist", function() {
  gulp
    .src(path.src.img)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(path.dist.img));
});

gulp.task("fonts:dist", function() {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.dist.fonts));
});

gulp.task("png:dist", function() {
  gulp.src(path.src.png).pipe(gulp.dest(path.dist.png));
});

gulp.task('fileinclude', function() {
  gulp.src(path.src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task("deploy", [
  "bower:dist",
  "php:dist",
  "theme:dist",
  "info:dist",
  "js:dist",
  "style:dist",
  "fonts:dist",
  "img:dist",
  "png:dist"
]);

/**
 * sass task
 * 
 */

gulp.task("style:sass", function() {
  gulp
    .src(path.src.style)
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        sourceMap: true,
        errLogToConsole: true
      })
    )
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"));
});

/**
 * Watch
 *
 */

gulp.task("watch", function() {
  watch([path.watch.style], function(event, cb) {
    gulp.start("style:sass");
  });
});

gulp.task("default", ["watch"]);