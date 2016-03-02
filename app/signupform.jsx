'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let endpoints = require('./lib/endpoints.js')

import BaseForm from "./baseform.jsx"

export default class SignupForm extends BaseForm {

    constructor(props) {
        super(props)
        this.label = "sign up"
        this.signup = this.signup.bind(this)
    }

    signup() {
        $.post(endpoints.API_SIGNUP, {
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

}
