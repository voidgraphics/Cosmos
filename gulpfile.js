var gulp        = require('gulp'),
    browserify  = require('browserify'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    streamify   = require('gulp-streamify'),
    source      = require('vinyl-source-stream'),
    rename      = require('gulp-rename'),
    coffee      = require('gulp-coffee'),
    gulpJade    = require('gulp-jade'),
    coffee      = require('gulp-coffee'),
    electron    = require('electron-connect').server.create();

gulp.task('serve', ['sass'], function() {

    electron.start();

    gulp.watch("./app/sass/**/*.sass", ['sass']);
    gulp.watch("./app/coffee/**/*.coffee", ['browserify']);
    gulp.watch("./app/jade/**/*.jade", ['jade']);
    gulp.watch("./app/js/bundle.js").on('change', electron.reload);
    gulp.watch("./app/css/*.css").on('change', electron.reload);
    gulp.watch("./app/html/*.html").on('change', electron.reload);

});

gulp.task('sass', function() {

    var compile = function(){
        gulp.src("./app/sass/**/*")
            .pipe(sass({outputStyle: 'indented'}))
            .pipe(gulp.dest("./app/css/"))
            .pipe(browserSync.stream());
    };

    return compile();
});

gulp.task('coffee', function() {
  gulp.src('./app/coffee/*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function () {
  return gulp.src('./app/jade/**/*.jade')
    .pipe(gulpJade({
      pretty: true
    }))
    .pipe(gulp.dest('./app/html/'))
})

gulp.task('browserify', ['coffee'], function() {
    var bundleStream = browserify('./app/js/main.js').bundle()

    bundleStream
        .pipe(source('./app/js/main.js'))
        .pipe(streamify(uglify()))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app/js'))
});

gulp.task('default', ['serve']);
