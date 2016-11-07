var gulp        = require('gulp'),
    browserify  = require('browserify'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    streamify   = require('gulp-streamify'),
    source      = require('vinyl-source-stream'),
    webpack     = require('webpack'),
    wpConfig    = require('./webpack.config.js'),
    gutil       = require('gulp-util'),
    rename      = require('gulp-rename'),
    coffee      = require('gulp-coffee'),
    gulpJade    = require('gulp-jade'),
    coffee      = require('gulp-coffee'),
    electron    = require('electron-connect').server.create();

gulp.task('serve', function() {
    electron.start();

    gulp.watch("./app/sass/**/*.sass", ['sass']);
    gulp.watch("./app/coffee/**/*.coffee", ['webpack']);
    gulp.watch("./app/vues/**/*.vue", ['webpack']);
    gulp.watch("./app/jade/**/*.jade", ['jade', 'webpack']);
    gulp.watch("./app/js/bundle.js").on('change', electron.reload);
    gulp.watch("./app/css/*.css").on('change', electron.reload);
    // gulp.watch("./app/html/*.html").on('change', electron.reload);

});

gulp.task('sass', function() {

    var compile = function(){
        gulp.src("./app/sass/main.sass")
            .pipe(sass({outputStyle: 'indented'}))
            .pipe(gulp.dest("./app/css"))
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
      pretty: false
    }))
    .pipe(gulp.dest('./app/html/'))
});

gulp.task('webpack', ['coffee'], function() {
    webpack( wpConfig , function( err, stats ) {
        if( err ) throw new gutil.PluginError( 'webpack', err );
        gutil.log( '[webpack]', stats.toString( { colors: true } ) );
    });
});

gulp.task('default', ['serve']);
