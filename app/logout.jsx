'use strict'

let React    = require('react')
let $        = require('jquery')
let _        = require('lodash')

class LogoutForm extends React.Component {

  componentDidMount() {
    $.getJSON("/api/logout.json")
  }

  render() {
    return <div className="logout">
      <div>Logged out.</div>
      <a href="#/">back to the top</a>
    </div>
  }
}

module.exports = LogoutForm
