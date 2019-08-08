/*
npm init

npm install gulp gulp-util gulp-sass browser-sync gulp-autoprefixer gulp-notify gulp-rsync gulp-pug gulp-image gulp-iconfont gulp-iconfont-css gulp-cached gulp-string-replace gulp-line-ending-corrector gulp-zip --save-dev

npm install -g npm

git rm -r --cached .

git add .; git commit -m 'update'; git push

*/

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  // rsync = require('gulp-rsync'),
  pug = require('gulp-pug'),
  image = require('gulp-image'),
  iconfont = require('gulp-iconfont'),
  iconfontCss = require('gulp-iconfont-css'),
  cache = require('gulp-cached'),
  replace = require('gulp-string-replace'),
  lec = require('gulp-line-ending-corrector'),
  // zip = require('gulp-zip'),
  runTimestamp = Math.round(Date.now() / 1000),
  font_name = 'base-icon';

gulp.task('browser-sync', function () {
    browserSync({
        server: "./",
        notify: false,
    })
});

gulp.task('styles', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(cache('sass'))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on("error", notify.onError())
    .pipe(lec())
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function () {
  return gulp.src('js/*.js')
    .on('error', gutil.log)
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('code', function () {
  return gulp.src('*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function () {
  return gulp.src('pug/*.pug')
    .pipe(cache('pug'))
    .pipe(pug({
      pretty: true // If not minify
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//
// gulp.task('rsync', function () {
//   return gulp.src(['**', '!**/pug/**', '!**/fonts/svg/**', '!**/node_modules/**', '!**/.git/**', '!**/build/**'], {
//       base: './'
//     })
//     .pipe(rsync({
//       root: '../home/admin/web/test.pankevich.pro/public_html/',
//       hostname: 'root@212.80.218.20',
//       destination: '/stalker/',
//       exclude: ['**/Thumbs.db', '**/*.DS_Store', 'pug/**', 'fonts/svg/**', '.git/**', 'node_modules/**'],
//       archive: true,
//       silent: false,
//       compress: true
//     }))
// });

gulp.task('imagemin', function () {
  return gulp.src(['images/1_origin/**', '!images/1_origin/**/*.svg'])
    .pipe(cache('image'))
    .pipe(image())
    .pipe(gulp.dest('images'))
});

gulp.task('bp', function () {
  var date = new Date();
  date = date.getFullYear() + '-' +
    parseInt(date.getMonth() + 1) + '-' +
    date.getDate() + '-' +
    (date.getHours()) + '-' +
    date.getMinutes();

  return gulp.src(['**', plugin_dir + '/**'], {
      base: './'
    })
    .pipe(gulp.dest('backup/v-' + date));
});

gulp.task('iconfont', function () {
  return gulp.src('fonts/svg/' + font_name + '/*.svg')
    .pipe(iconfontCss({
      fontName: font_name,
      path: 'scss/_icon.scss',
      targetPath: '../scss/iconfonts/_' + font_name + '.scss',
      cssClass: font_name,
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      prependUnicode: false,
      fontName: font_name,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest('fonts/'));
});

// gulp.task('build', function () {
//   return gulp.src(['**', '!**/pug/**', '!**/fonts/svg/**', '!**/node_modules/**', '!**/.git/**', '!**/build/**', '!**/scss/**', '!**/*.json', '!**/gulpfile.js'], {
//       base: '../stalker.loc/'
//     })
//     .pipe(zip('stalker.zip'))
//     .pipe(gulp.dest('build'));
// });

gulp.task('watch', function () {
  gulp.watch('scss/*.scss', gulp.parallel('styles'));
  gulp.watch('js/*.js', gulp.parallel('scripts'));
  gulp.watch('pug/**/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('styles', 'pug', 'scripts', 'browser-sync', 'watch'));
