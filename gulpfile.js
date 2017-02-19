
const gulp   = require('gulp')
const sass   = require('gulp-sass')
const concat = require('gulp-concat')

gulp.task('build', () => {
  gulp.src([
    './styles/**/*.scss',
    '!./styles/**/_*.scss',
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'))

  gulp.src([
    './node_modules/codemirror/lib/codemirror.js',
    './node_modules/codemirror/mode/javascript/javascript.js',
    './node_modules/typescript/lib/typescript.js',
  ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public'))
})
