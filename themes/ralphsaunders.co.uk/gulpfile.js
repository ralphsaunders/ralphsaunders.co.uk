'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    args = require('yargs').argv,
    debug = require('gulp-debug'),
    autoprefixer = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    paths = {
        scss: {
            src: 'src/scss/**/*.scss',
            dist: 'dist/css'
        },
        js: {
            src: 'src/js/**/*.js',
            dist: 'dist/js'
        },
        images: {
            src: 'src/images/*',
            dist: 'dist/images'
        }
    }

gulp.task('scss', function() {
    return gulp.src(paths.scss.src)
        .pipe(gulpif(!args.production, sourcemaps.init()))
        .pipe(gulpif(args.production, sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError)))
        .pipe(gulpif(!args.production, sass().on('error', sass.logError)))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            flexbox: 'no-2009',
            cascade: false
        }))
        .pipe(gulpif(!args.production, sourcemaps.write()))
        .pipe(gulp.dest(paths.scss.dist));
});

gulp.task('js', function() {
    return gulp.src(paths.js.src)
        .pipe(changed(paths.js.dist))
        .pipe(debug({title: 'js'}))
        .pipe(gulp.dest(paths.js.dist))
});

gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.images.dist))
});

gulp.task('default', ['scss', 'js', 'images'], function() {
    gulp.watch(paths.scss.src, ['scss']);
    gulp.watch(paths.js.src, ['js']);
    gulp.watch(paths.images.src, ['images']);
});
