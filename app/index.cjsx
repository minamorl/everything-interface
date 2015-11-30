React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
Modal    = require 'react-modal'

Index = React.createClass
  getInitialState: ->
    results: []

  componentDidMount: ->
    $.get "/api/index.json", (data) =>
      this.setState
        results: data.results

  render: ->
    if !this.props.hidden
      return <div>
        <h1>最近投稿されたスレッド</h1>
        <a href="#/recent">全部読む</a>
        <ul className="index">
        {
          for r, index in this.state.results
            <ListElement key={index} title={r.title} />
        }
        </ul>
      </div>
    else
      return <div className="hidden"></div>


ListElement = React.createClass

  render: ->
    <li>
      <a href={"#/thread/" + window.encodeURI(this.props.title)}>{this.props.title}</a>
    </li>




module.exports = Index
