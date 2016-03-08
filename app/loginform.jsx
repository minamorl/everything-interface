import BaseForm from "./baseform.jsx"
const $ = require('jquery')
const endpoints = require('./lib/endpoints.js')

export default class LoginForm extends BaseForm {
 
    constructor(props) {
        super(props);
        this.label = "login"
    }

    send(e) {
        $.post(endpoints.API_LOGIN, {
            username: this.state.username,
            password: this.state.password
        }, data => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay") {
                window.location.hash = "#/thread/"
            }
        })
        e.preventDefault()
    }

}
