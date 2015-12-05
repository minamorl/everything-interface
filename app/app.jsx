'use strict'

let React    = require('react')
let $        = require('jquery')
let _        = require('lodash')
let ReactDOM = require('react-dom')
let Modal    = require('react-modal')
let Thread = require('./thread.jsx')
let LoginForm = require('./loginform.jsx')
let LogoutForm = require('./logout.jsx')
let SignupForm = require('./signupform.jsx')
let Recent = require('./recent.jsx')

let init = () => {
  let app = document.getElementById('app')
  $(".logo").click(() => {
    window.location.href = "#/thread/"
  })

  Modal.setAppElement(app)
  router(app)
}

$(window).on('hashchange', () => {
  let app = document.getElementById('app')
  router(app)
})

let startswith = (str, target) => {
  return str.substring(0,target.length) === target
}

let router = (app) => {
  if(window.location.hash === "#/login")
    ReactDOM.render(
      <LoginForm />, app
    )
  else if(window.location.hash === "#/logout")
    ReactDOM.render(
      <LogoutForm />, app
    )
  else if(window.location.hash === "#/signup")
    ReactDOM.render(
      <SignupForm />, app
    )
  else if(startswith(window.location.hash, "#/thread/")) {
    ReactDOM.unmountComponentAtNode(app)
    ReactDOM.render(
      <Thread query={window.decodeURI(window.location.hash.slice(9))}/>, app).forceUpdate()
  } else if(window.location.hash === "#/recent")
    ReactDOM.render(
      <Recent />, app
    )
  else {
    window.history.pushState(null, null, "#/thread/")
    ReactDOM.unmountComponentAtNode(app)
    ReactDOM.render(
      <Thread query="" />, app
    )
  }
};

$(document).ready(() => {
  init()
});
