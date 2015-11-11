gulp          = require 'gulp'
del           = require 'del'
bower         = require 'gulp-bower'
uglify        = require 'gulp-uglify'
cond          = require 'gulp-if'
gutil         = require 'gulp-util'
runSequence   = require 'run-sequence'
merge         = require 'merge'
frontMatter   = require 'gulp-front-matter'
yamlFront     = require 'yaml-front-matter'
layout        = require 'gulp-layout'
markdown      = require 'gulp-markdown'
jade          = require 'gulp-jade'
fs            = require 'fs'
rename        = require 'gulp-rename'
tap           = require 'gulp-tap'
path          = require 'path'
marked        = require 'marked'
git           = require 'gulp-git'
htmlmin       = require 'gulp-htmlmin'
cssmin        = require 'gulp-minify-css'
webserver     = require 'gulp-webserver'
webpack       = require 'webpack'
webpackConfig = require "./webpack.config.coffee"
webpackProd   = require "./webpack.config.production.coffee"
cheerio       = require 'cheerio'
striptags     = require 'striptags'


gulp.task 'clean', ->
  del ['.tmp', 'dist']

gulp.task 'build:misc', ->
  gulp.src(['favicon/**/*', '*.html', 'css/**/*', 'js/**/*'], {base: "."})
    .pipe (gulp.dest 'dist')

gulp.task 'compress', ['compress:html', 'compress:css']

gulp.task 'compress:html', ->
  gulp.src 'dist/**/*.html', {base: "."}
    .pipe htmlmin({collapseWhitespace: true})
    .pipe (gulp.dest '.')

gulp.task 'compress:css', ->
  gulp.src 'dist/**/*.css', {base: "."}
    .pipe cssmin()
    .pipe (gulp.dest '.')

gulp.task 'bower', ->
  bower()

gulp.task 'default', ->
  runSequence 'clean', 'bower', 'build', 'webpack', 'serve'

gulp.task 'deploy', ->
  runSequence 'clean', 'bower', 'build', 'compress', 'webpack:prod'

_webpack = (config, callback) ->
  webpack(config, (err, stats) ->
    if(err)
      throw new gutil.PluginError("webpack:build", err)
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }))
    callback()
  )

gulp.task 'webpack', (callback) ->
  myConfig = Object.create(webpackConfig)
  _webpack myConfig, callback

gulp.task 'webpack:prod', (callback) ->
  myConfig = Object.create(webpackProd)
  _webpack myConfig, callback

gulp.task 'build', ['build:misc',  'build:index']

gulp.task 'build:index', ->
  defaultLayout =
    layout: "templates/index.jade"

  gulp.src "./templates/index.jade"
    .pipe jade()
    .pipe (gulp.dest './dist')

gulp.task 'serve', ->
  gulp.watch ['./templates/**/*.jade', './articles/**/*.md'], ->
    runSequence 'build', 'compress'
  gulp.watch ['./app/**/*',  './sass/**/*.sass'], ->
    runSequence 'webpack'
  gulp.src 'dist'
    .pipe webserver
      livereload: true,
      proxies:[
        source: '/api/',
        target: 'http://localhost:5000/api/'
      ]
