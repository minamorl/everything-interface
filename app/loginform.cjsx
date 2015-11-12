React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
Modal    = require 'react-modal'

LoginForm = React.createClass

  getInitialState: ->
    username: ""
    password: ""
    message: ""

  login: ->
    $.getJSON "/api/login.json", {username: this.state.username, password: this.state.password}, (data) =>
      this.setState
        message: data.results.message

      if data.results.message == "okay"
        window.location.hash = "#"
        
  eventChange: (e) ->
    this.setState
      username: e.target.value
   
  passwordChange: (e) ->
    this.setState
      password: e.target.value

  render: ->
    <form action="javascript:void(0);">
      <input value={this.state.username} onChange={this.eventChange} type="text" placeholder="username"/>
      <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="password"/>
      <div>
        <button onClick={this.login}>login</button>
      </div>
      <div>message: {this.state.message}</div>
    </form>

module.exports = LoginForm
