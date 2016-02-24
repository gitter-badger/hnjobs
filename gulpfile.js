var gulp = require('gulp');
var concat = require('gulp-concat');
var ngConstant = require('gulp-ng-constant');

gulp.task('js', function() {
    gulp.src('public/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch:js', ['js'], function() {
    gulp.watch('public/js/*.js', ['js']);
});

// when this runs in the backend, process.env.NODE_ENV is known
gulp.task('config', function() {
    var environment = process.env.NODE_ENV || 'development';
    gulp.src('public/config/' + environment + '.json')
        .pipe(ngConstant({
            name: 'app.config',
            wrap: 'amd'
        }))
        .pipe(concat('public/js/config.js'))
        .pipe(gulp.dest('.'));
});
