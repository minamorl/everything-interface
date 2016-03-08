import BaseForm from "./baseform"
const $ = require('jquery')
const endpoints = require('./lib/endpoints.js')

export default class SignupForm extends BaseForm {

    constructor(props) {
        super(props)
        this.label = "sign up"
    }

    send(e) {
        $.post(endpoints.API_SIGNUP, {
            username: this.state.username,
            password: this.state.password
        }, data => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay")
                window.location.hash = "#"
        })
    }

}
