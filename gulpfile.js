// Content related gulp tasks
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
    gulp.src('./content/images/src/**/*')
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('./content/images/dist/'))
});

gulp.task('write', function() {
    return gulp.watch('./content/images/src/**/*', ['images']);
});
