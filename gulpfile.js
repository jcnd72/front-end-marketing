var gulp = require('gulp');
// var fs = require('fs');
// var config = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.aws/fed-credentials'));
// var s3 = require('gulp-s3-upload')(config);
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autopolyfiller = require('gulp-autopolyfiller');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var include = require('gulp-include');
var runSequence = require('run-sequence');

// var s3Bucket = 'assets.ngin.com/site_files/2730/m/lp/lp-template-2/base/modular-template/';
var sourcePath = '_source';
var compiledPath = '';

gulp.task('sass', function() {
    return gulp.src('_source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        })) // compact, compressed, expanded, nested
        .pipe(prefix({
            browsers: ['Last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(compiledPath + 'css'))
});


gulp.task('js', function() {
  gulp.src(sourcePath+'/js/[^_]*.js')
    // .pipe(include())
    // .pipe(gulp.dest(compiledPath+'/js'))
    .pipe(uglify({mangle: false}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(compiledPath+'js'));
});

gulp.task('build', function(callback) {
    runSequence(['sass', 'minify'],
        callback
    )
})

gulp.task('default', function(callback) {
    runSequence(['sass', 'watch'],
        callback
    )
})

gulp.task('watch', ['sass', 'js'], function() {
    gulp.watch('_source/scss/**/*.scss', ['sass']);
    gulp.watch('_source/js/*.js', ['js']);
})

// gulp.task('deploy', ['upload-source']);
