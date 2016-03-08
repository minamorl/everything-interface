import React, {Component} from 'react'

export default class BaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: "",
        };
        this.eventChange = this.eventChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.send = this.send.bind(this)
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
        return <form onSubmit={this.send} autoComplete="on">
      <input value={this.state.username} onChange={this.eventChange} type="text" placeholder="username"/>
      <input value={this.state.password} onChange={this.passwordChange} type="password" placeholder="password"/>
      <button>{this.label}</button>
      <div>{this.state.message}</div>
    </form>
    }

}
