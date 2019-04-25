const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer'); // 添加CSS3属性前缀
const webserver = require('gulp-webserver'); // 启服务

// 编译sass
gulp.task('devsass', () => {
        return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css'));
    })
    //启服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9999,
            proxies: [{
                source: '/getData',
                target: 'http://localhost:3000/getData'
            }]
        }));

})

// 监听
gulp.task('watching', () => {
    return gulp.watch('./src/scss/*.scss', gulp.series('devsass'));

})

// 管理开发任务
gulp.task('default', gulp.series('devsass', 'server', 'watching'));