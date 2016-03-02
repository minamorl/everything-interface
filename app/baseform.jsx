'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let endpoints = require('./lib/endpoints.js')

export default class BaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
        };
        this.eventChange = this.eventChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
    }

    eventChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return <form onSubmit={this.login} autoComplete="on">
      <input value={this.state.username} onChange={this.eventChange} type="text" placeholder="username"/>
      <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="password"/>
      <button>{this.label}</button>
      <div>{this.state.message}</div>
    </form>
    }

}
