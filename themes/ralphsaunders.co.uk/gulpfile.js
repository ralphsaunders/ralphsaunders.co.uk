// THEME RELATED GULP TASKS
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var imagemin = require('gulp-imagemin');

gulp.task('css', function() {
    gulp.src('./static/css/src/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./static/css/build/'))
});

gulp.task('images', function() {
    gulp.src('./static/images/src/*')
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./static/images/build/'))
});
