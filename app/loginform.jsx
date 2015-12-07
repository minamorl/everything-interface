'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let Modal = require('react-modal')

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
        };
        this.login = this.login.bind(this)
        this.eventChange = this.eventChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
    }

    login(e) {
        $.post("/api/login.json", {
            username: this.state.username,
            password: this.state.password
        }, (data) => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay") {
                window.location.hash = "#/thread/"
            }
        })
        e.preventDefault()
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
      <button>login</button>
      <div>{this.state.message}</div>
    </form>
    }
}

module.exports = LoginForm