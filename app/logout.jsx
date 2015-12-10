'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let endpoints = require('./lib/endpoints.js')

class LogoutForm extends React.Component {

    componentDidMount() {
        $.getJSON(endpoints.API_LOGOUT)
    }

    render() {
        return <div className="logout">
      <div>Logged out.</div>
      <a href="#/">back to the top</a>
    </div>
    }
}

module.exports = LogoutForm
