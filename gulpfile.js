var gulp = require('gulp'); 
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('build', ['clean'],function() {
  return; 
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
        .pipe(clean());
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