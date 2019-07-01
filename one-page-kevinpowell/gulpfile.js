/**
 * Created by stefan on 14-02-2019.
 * Only for html - scss - images
 * HTML not in a subdirectory
 *
 */

/* jshint node: true */
"use strict";

const gulp = require('gulp'),
      prettyError = require('gulp-prettyerror'),
      watch = require('gulp-watch'),
      prefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      cleancss = require('gulp-clean-css'),
      rimraf = require('rimraf')

/**
 * Variables
 *
*/
const path = {
    dist: {
        html: 'dist',
        css: 'dist/css/',
        img: 'dist/images/'
    },
    src: {
        html: '*.html',
        style: 'sass/style.scss',
        img: 'images/**/*.*'
    },
    watch: {
        html: '*.html',
        style: 'sass/**/*.scss',
        img: 'images/**/*.*'
    },
    clean: './dist'
};

/**
 * clean task
 *
*/
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

/**
 * task
 *
*/
gulp.task('html:dist', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('img:dist', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('dist', [
    'html:dist',
    'style:dist',
    'img:dist'
]);

/**
 * Watch
 *
*/
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dist');
    });
});

gulp.task('default', ['dist', 'watch']);