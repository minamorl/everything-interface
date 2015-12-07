'use strict'

let gulp = require('gulp');
let del = require('del');
let bower = require('gulp-bower');
let uglify = require('gulp-uglify');
let cond = require('gulp-if');
let gutil = require('gulp-util');
let runSequence = require('run-sequence');
let merge = require('merge');
let frontMatter = require('gulp-front-matter');
let yamlFront = require('yaml-front-matter');
let layout = require('gulp-layout');
let markdown = require('gulp-markdown');
let jade = require('gulp-jade');
let fs = require('fs');
let rename = require('gulp-rename');
let tap = require('gulp-tap');
let path = require('path');
let marked = require('marked');
let git = require('gulp-git');
let htmlmin = require('gulp-htmlmin');
let cssmin = require('gulp-minify-css');
let webserver = require('gulp-webserver');
let webpack = require('webpack');
let webpackConfig = require("./webpack.config");
let webpackProd = require("./webpack.config.production");
let cheerio = require('cheerio');
let striptags = require('striptags');

gulp.task('clean', () => {
    return del(['.tmp', 'dist']);
})

gulp.task('build:misc', () => {
    return gulp.src(['favicon/**/*', '*.html', 'css/**/*', 'js/**/*'], {
            base: "."
        })
        .pipe(gulp.dest('dist'))
});

gulp.task('compress', ['compress:html', 'compress:css']);

gulp.task('compress:html', () => {
    return gulp.src('dist/**/*.html', {
            base: "."
        })
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('compress:css', () => {
    return gulp.src('dist/**/*.css', {
            base: "."
        })
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('bower', () => {
    return bower();
});

gulp.task('default', () => {
    return runSequence('clean', 'bower', 'build', 'webpack', 'serve');
});

gulp.task('deploy', () => {
    return runSequence('clean', 'bower', 'build', 'compress', 'webpack:prod');
});

let _webpack = (config, callback) => {
    return webpack(config, (err, stats) => {
        if (err)
            throw new gutil.PluginError("webpack:build", err)
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback()
    })
};


gulp.task('webpack', (callback) => {
    let myConfig = Object.create(webpackConfig);
    return _webpack(myConfig, callback);
});

gulp.task('webpack:prod', (callback) => {
    let myConfig = Object.create(webpackProd);
    return _webpack(myConfig, callback);
});

gulp.task('build', ['build:misc', 'build:index'])

gulp.task('build:index', () => {
    let defaultLayout = {
        layout: "templates/index.jade"
    };

    return gulp.src("./templates/index.jade")
        .pipe(jade())
        .pipe(gulp.dest('./dist'))
});

gulp.task('serve', () => {
    gulp.watch(['./templates/**/*.jade', './articles/**/*.md'], () => {
        runSequence('build', 'compress');
    });
    gulp.watch(['./app/**/*', './sass/**/*.sass'], () => {
        runSequence('webpack');
    });
    return gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            proxies: [{
                source: '/api/',
                target: 'http://localhost:9010/api/'
            }]
        }));
});