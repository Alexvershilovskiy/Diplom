const gulp = require('gulp'),
browserSync = require('browser-sync'),
sass = require('gulp-sass')(require('sass')),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
pug = require('gulp-pug'),
plumber = require('gulp-plumber');

function browserSyncFunc() {
browserSync.init({
 server: {
     baseDir:'build'
 }   
})
}

function images() {
    return gulp.src('src/assets/img/**/*')
    .pipe(gulp.dest('build/assets/img'))
    .pipe(browserSync.stream())

}
function pugFunc() {
    return gulp.src('src/pug/**/*.pug')
    .pipe(plumber())
    .pipe(pug({ 
        pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('build'))
    .on('end', browserSync.reload)
}
function scss() {
    return gulp.src('src/assets/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        grid:'autoplace',

    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browserSync.stream())
    }

function watcher() {
    gulp.watch('src/pug/**/*.pug', pugFunc)
    gulp.watch('src/assets/scss/**/*.scss', scss)
    gulp.watch('src/assets/imgs/**/*',images)
}
gulp.task(
    'default',
    gulp.series(
        gulp.parallel(pugFunc, scss, images),
        gulp.parallel(watcher, browserSyncFunc)
    )
);

