var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');


var paths = {
  css: 'public/scss/**/*.*'
};

var dist = {
  out: 'public/stylesheets/'
};

//Sass compile
gulp.task('sass',function(){
  return gulp.src(paths.css)
         .pipe(plumber())
         .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
         .pipe(rename('main.css'))
         .pipe(gulp.dest(dist.out));
});

gulp.task('watch', function(){
  gulp.watch(paths.css,['sass']);
});

/**********************************************************************/
//1st gulp-compile
gulp.task('default', ['sass' ,'watch']);
