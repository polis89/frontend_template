var gulp = require('gulp'); 
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var styleInject = require("gulp-style-inject");
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

gulp.task('build', 
          ['compile_styles_and_js',
            'copy_fonts',
            'copy_htaccess'],function() {
  return; 
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('copy_fonts', ['copy_fonts_css'], function() {
  return gulp.src('src/fonts/*/**')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy_fonts_css', function() {
  return gulp.src('src/fonts.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_htaccess', function() {
  return gulp.src('src/.htaccess')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy_index_useref', function() {
  return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile_styles_and_js', ['copy_index_useref', 'build_boot_head_css'], function() {
  return gulp.src("dist/index.html")
        .pipe(styleInject())
        .pipe(gulp.dest("dist"));
});

gulp.task('build_boot_head_css', function() {
  return gulp.src(["src/css/bootstrap-grid-3.3.1.min.css", "src/css/header.css"])
        .pipe(concat('bootstrap_header.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('watch', ['browser_sync', 'compile_sass'], function() {
  gulp.watch('src/sass/*.sass', ['compile_sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
});

gulp.task('browser_sync', function() {
  browserSync({
      server: {
          baseDir: 'src'
      },
      notify: false
  });
});

gulp.task('compile_sass', function() {
  return gulp.src('src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});