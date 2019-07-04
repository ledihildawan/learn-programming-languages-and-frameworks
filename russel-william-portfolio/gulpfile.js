const gulp = require('gulp')
const maps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const cleanCSS  = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const del = rquire('del')

gulp.task('sass', () => gulp.src('./scss/main.scss')
    .pipe(plumber())
    .pipe(maps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(cleanCSS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css')))

gulp.task('images', () => gulp.src('./images/**/*.{png,jpeg,jpg,svg,gif}')
  .pipe(plumber())
  .pipe(imagemin([
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    imagemin.optipng(),
    imagemin.svgo(),
    imageminPngquant(),
    imagemininJpegRecompress()
  ]))
  .pipe(gulp.dest('./images'))
)

gulp.task('clean', () => {
  return del.sync([
    './css/style.css',
    './css/style.css.map'
  ])
})

gulp.task('default', gulp.series('sass', 'imagemin'))

gulp.task('watch', () => {
  console.log('Starting watch task')
  require('./server.js')
  gulp.watch(STYLE_PATH, ['sass'])
})