'use strict'

let React    = require('react')
let $        = require('jquery')
let _        = require('lodash')

class ListUI extends React.Component {
  render () {
    let lists = []
    this.props.results.forEach((r, i) => {
      lists.push(<ListElement key={i} data={r} search={this.props.search}/>)
    })
    return <ul className="thread">
      {lists }
    </ul>
  }
}

class ListElement extends React.Component {
  render () { 
    return <li>
      <div>{this.props.data.body}</div>
      <div className="detail">
        <div className="commit-author">
          <a href={"#/thread/" + window.encodeURI(this.props.data.thread.name)}>{this.props.data.thread.name}</a>
        </div>
        <div className="project">{this.props.data.author.name}</div>
      </div>
    </li>
  }
}

module.exports = ListUI
