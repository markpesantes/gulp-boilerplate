var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {

    function handle_error(err) {
        notify.onError({
            "title": "Scripts error.",
            "message": "<%= error.message %>"
        })(err);
        console.log(err);
        this.emit('end');
    }

    gulp.src("./js/*.js")
        .pipe(sourcemaps.init())
        .pipe(plumber({
             errorHandler: handle_error
         }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./build"))
        .pipe(notify({
            "title": "Scripts compiled.",
            "message": "Compiled <%= file.relative %>"
        }));

});

gulp.task('styles', function(){
    gulp.src(["./stylesheets/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    "title": "Styles error.",
                    "message": "<%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass({outputStyle: 'compressed'})) // Using gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./build"))
        .pipe(notify({
            "title": "Stylesheets compiled.",
            "message": "Compiled <%= file.relative %>"
        }));

});


gulp.task('watch:scripts', function () {
     return gulp.watch('./js/*.js', ["scripts"]);
});

gulp.task('watch:styles', function () {
     return gulp.watch(['./components/**/*.scss', './layouts/**/*.scss','./stylesheets/*.scss'], ["styles"]);
});

gulp.task('watch', ['watch:styles','watch:scripts']);
gulp.task('build', ['styles', 'scripts']);
gulp.task('default', ['build','watch']);
