'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')

class SignupForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            message: "",
        }
        this.signup = this.signup.bind(this)
        this.eventChange = this.eventChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
    }

    signup() {
        $.post("/api/signup.json", {
            username: this.state.username,
            password: this.state.password
        }, (data) => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay")
                window.location.hash = "#"
        })
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
        return <form action="javascript:void(0);">
      <input value={this.state.username} onChange={this.eventChange} type="text" placeholder="username"/>
      <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="password"/>
      <div>
        <button onClick={this.signup}>signup</button>
      </div>
      <div>{this.state.message}</div>
    </form>
    }
}
module.exports = SignupForm