var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// css
gulp.task('css', function () {
  gulp.src('css/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(autoprefixer('last 2 version', '> 1%', 'ie 9'))
    .pipe(gulp.dest('app/css/'))
    //.pipe(notify('Done!'))
    .pipe(connect.reload());
});

// minify-сss
gulp.task('minify-сss', function () {
  gulp.src('app/css/bundle.css')
    .pipe(minifyCss())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(connect.reload());
});
// watch
gulp.task('watch', function () {
  gulp.watch('css/*.css', ['css'])
  gulp.watch('app/css/bundle.css', ['minify-сss'])
	gulp.watch('app/index.html', ['html'])
});

// default
gulp.task('default', ['connect', 'html', 'css', 'minify-сss', 'watch']);