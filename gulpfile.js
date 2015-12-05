var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    coffee      = require('gulp-coffee'),
    gulpJade    = require('gulp-jade'),
    electron    = require('electron-connect').server.create();;

gulp.task('serve', ['sass'], function() {

    electron.start();

    gulp.watch("./app/sass/**/*.sass", ['sass']);
    gulp.watch("./js/*.coffee", ['coffee']);
    gulp.watch("./app/jade/**/*.jade", ['jade']);
    gulp.watch("./app/js/*.js").on('change', electron.reload);
    gulp.watch("./app/css/*.css").on('change', electron.reload);
    gulp.watch("./app/html/*.html").on('change', electron.reload);
    gulp.watch("./*.php").on('change', browserSync.reload);
});

gulp.task('sass', function() {

    var compile = function(){
        gulp.src("./app/sass/**/*")
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest("./app/css/"))
            .pipe(browserSync.stream());
    };

    return compile();
});

gulp.task('coffee', function() {
  gulp.src('./app/js/*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest('./app/js/*.js'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function () {
  return gulp.src('./app/jade/**/*.jade')
    .pipe(gulpJade({
      pretty: true
    }))
    .pipe(gulp.dest('./app/html/'))
})

gulp.task('default', ['serve']);
