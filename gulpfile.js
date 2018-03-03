var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
    return gulp.src('./src/css/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('script', function(){
    return gulp.src('./src/js/script/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat({
        path: 'client.js'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/js'));
});

gulp.task('vendorjs', function(){
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/gsap/src/minified/TweenMax.min.js'
    ])
    .pipe(concat({
        path: 'vendor.js'
    }))
    .pipe(gulp.dest('./src/js'));
});


gulp.task('deploy', function() {
    return gulp.src('./src/**/*')
    .pipe(ghPages());
});


gulp.task('default', ['sass','script'], function () {
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/js/script/*.js', ['script']);
});