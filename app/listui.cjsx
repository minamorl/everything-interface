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
  linkClick: (e)->
    window.history.pushState(null, null, "#/thread/"+this.props.data.thread.name)
    this.props.search(this.props.data.thread.name)
    
    e.preventDefault()
    e.stopPropagation()

  render:->
    <li>
      <div>{this.props.data.body}</div>
      <div className="detail">
        <div className="commit-author">
          <a href="javascript:void(0)" onClick={this.linkClick}>{this.props.data.thread.name}</a>
        </div>
        <div className="project">{this.props.data.author.name}</div>
      </div>
    </li>

module.exports = ListUI
