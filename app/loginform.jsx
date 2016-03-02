'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let endpoints = require('./lib/endpoints.js')

import BaseForm from "./baseform.jsx"

export default class LoginForm extends BaseForm {
 
    constructor(props) {
        super(props);
        this.label = "login"
        this.login = this.login.bind(this)
    }

    login(e) {
        $.post(endpoints.API_LOGIN, {
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

}
