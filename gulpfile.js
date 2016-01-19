// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    bower = require('gulp-bower');
    server = require('gulp-server-livereload');
    wiredep = require('wiredep')().js;
    ngAnnotate = require('gulp-ng-annotate');

var config = {
    appPath: './src/app',
    imagesPath: './src/images',
    bowerDir: './bower_components',
    srcPath: './src'
};

// Styles
gulp.task('styles', function() {
    return gulp.src(config.srcPath + '/styles.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'));
});

// Icons
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dist/assets/fonts'));
});

// Scripts
gulp.task('scripts', function() {
    gulp.src(wiredep)
        .pipe(concat('vendor.js'))
        //.pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));

    gulp.src([config.srcPath + '/app.js', config.appPath + '/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', function() {
    return gulp.src(config.imagesPath + '/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'));
});

//Templates
gulp.task('templates', function() {
   return gulp.src([config.srcPath + '/index.html', config.appPath + '/**/*.html'])
       .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function() {
    return del(['dist/**/*']);
});

// Default task
gulp.task('default', ['clean', 'build'], function() {

});

gulp.task('build', function() {
    gulp.start('styles', 'scripts', 'images', 'icons', 'templates');
});

// Watch
gulp.task('watch', function() {
// Watch .scss files
    gulp.watch([config.srcPath + '/styles.scss', config.appPath + '/**/*.scss'], ['styles']);
// Watch .js files
    gulp.watch([config.srcPath + '/app.js', config.appPath + '/**/*.js'], ['scripts']);
// Watch image files
    gulp.watch(config.imagesPath + '/**/*', ['images']);
// Watch template files
    gulp.watch([config.srcPath + '/index.html', config.appPath + '/**/*.html'], ['templates']);
// Create LiveReload server
    livereload.listen();
// Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('serve', ['build', 'watch'], function() {
    gulp.src('./dist/')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            defaultFile: 'index.html',
            open: true
        }));
});