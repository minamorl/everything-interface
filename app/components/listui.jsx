'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')

let autolinker = require("autolinker")
let sanitizer = require('sanitizer')

let CreateMessage= require('./create-message.jsx')

class ListUI extends React.Component {
    render() {
        let lists = []
        this.props.results.forEach((r, i) => {
            lists.push(<ListElement key={i} data={r} search={this.props.search}/>)
        })
        let createmessage
        if(this.props.filterWord !== "")
          createmessage = <CreateMessage search={this.props.filterWord} updateList={this.props.updateList}/>
        return <ul className="thread">
        {createmessage}
          
      {lists }
    </ul>
    }
}

class ListElement extends React.Component {
    render() {
        let marked = require("marked")
        let linked = () => {

            return {
              __html: marked(autolinker.link(marked(this.props.data.body, {sanitize: true})))
            }
        }
        return <li>
      <div dangerouslySetInnerHTML={linked()} />
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
