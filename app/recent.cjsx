React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
Modal    = require 'react-modal'
Index    = require './index.jsx'
ListUI   = require './components/listui.cjsx'
CreateButton = require './components/create-button.cjsx'


SearchBox = React.createClass
  getInitialState: ->
    textvalue: ""
    messagelabel:""
    results: []
    logged_in: false

  componentDidMount: ->
    this.setState
      textvalue: this.props.query
    $.getJSON "/api/recent.json", {q: this.props.query}, (data) =>
      this.setState
        results: data.results
    $.getJSON "/api/auth.json", (data) =>
      if _.isNull(data.results.auth.name)
        this.setState
          messagelabel: ""
          logged_in: false

      else
        this.setState
          messagelabel: "You are logged in as @" + data.results.auth.name
          logged_in: true

      

  eventChange: (e) ->
    this.setState
      textvalue: e.target.value
    $.getJSON "/api/thread.json", {q: e.target.value}, (data) =>
      this.setState
        results: data.results
  updateList: ->
    $.getJSON "/api/thread.json", {q: this.state.textvalue}, (data) =>
      this.setState
        results: data.results
  search: (keyword) ->
    $.getJSON "/api/thread.json", {q: keyword}, (data) =>
      this.setState
        results: data.results
        textvalue: keyword


  
  render: ->
    <div>
      <input type="text" value={this.state.textvalue} onChange={this.eventChange} placeholder="thread title"/>
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList} disabled={!this.state.logged_in or this.state.textvalue==""}/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      <Index hidden={this.state.textvalue!=""}/>
      {
        if this.state.textvalue != ""
          <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} />
        else
          <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} className="hidden"/>
      }
    </div>

MessageLabel = React.createClass
  render: ->
    if !this.props.isSignUp
      <div className="message-label">
        {this.props.status}
        &nbsp;<a href="/#/logout">logout</a>.
      </div>
    else
      <div className="message-label">
        Wanna join a chat? Sign up from <a href="/#/signup">here</a> or <a href="/#/login">login</a>.
      </div>


module.exports = SearchBox
