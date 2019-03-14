var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifyes = require('gulp-uglifyes');
var concat = require('gulp-concat');
gulp.task('js',function () {
    return gulp.src('./src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglifyes())
        .pipe(gulp.dest('./dist/'))
})
gulp.task('default',['js'])