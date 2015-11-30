React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'

ListUI = React.createClass

  
  render: ->
    <ul className="thread">
      {
        for r, index in this.props.results
          <ListElement key={index} data={r} search={this.props.search}/>
      }
    </ul>

ListElement = React.createClass
  render:->
    <li>
      <div>{this.props.data.body}</div>
      <div className="detail">
        <div className="commit-author">
          <a href={"#/thread/" + window.encodeURI(this.props.data.thread.name)}>{this.props.data.thread.name}</a>
        </div>
        <div className="project">{this.props.data.author.name}</div>
      </div>
    </li>

module.exports = ListUI
