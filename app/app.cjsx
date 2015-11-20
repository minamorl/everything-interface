React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
ReactDOM = require 'react-dom'
Modal    = require 'react-modal'
SearchBox = require './searchbox.cjsx'
LoginForm = require './loginform.cjsx'
LogoutForm = require './logout.cjsx'
SignupForm = require './signupform.cjsx'
Index = require './index.cjsx'

init = ->
  app = document.getElementById 'searchbox'
  $(".logo").click ->
    window.location.href = "#/thread/"

  Modal.setAppElement app
  router(app)

$(window).on 'hashchange', ->
  app = document.getElementById 'searchbox'
  router(app)

startswith = (str, target) ->
  str.substring(0,target.length) == target
router = (app) ->
  if window.location.hash == "#/login"
    ReactDOM.render(
      <LoginForm />, app
    )
  else if window.location.hash == "#/logout"
    ReactDOM.render(
      <LogoutForm />, app
    )
  else if window.location.hash == "#/signup"
    ReactDOM.render(
      <SignupForm />, app
    )
  else if startswith(location.hash, "#/thread/")
    ReactDOM.unmountComponentAtNode app
    ReactDOM.render(
      <SearchBox query={window.decodeURI(window.location.hash.slice(9))}/>, app
    )
  else
    window.history.pushState(null, null, "#/thread/")
    ReactDOM.unmountComponentAtNode app
    ReactDOM.render(
      <SearchBox query="" />, app
    )

$(document).ready ->
  init()
