React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'

LogoutForm = React.createClass

  componentDidMount: ->
    $.getJSON "/api/logout.json"

  render: ->
    <div className="logout">
      <div>Logged out.</div>
      <a href="#/">back to the top</a>
    </div>

module.exports = LogoutForm
