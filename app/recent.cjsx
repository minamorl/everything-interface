React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
Modal    = require 'react-modal'
Index    = require './index.cjsx'
ListUI   = require './listui.cjsx'

customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
      border: "1px solid #CCC"
      background: "#FFF none repeat scroll 0% 0%"
      overflow: "auto"
      outline: "medium none"
      padding: "20px"
      overflowY: "hidden"
      "borderRadius": "4px"
      maxWidth: "600px"
      width: "80%"
      height: "160px"
      left: "50%"
      position: "absolute"
      "marginRight": "-50%"
      transform: "translate(-50%, -50%)"
      top: "50%"
  }
}

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

CreateButton = React.createClass
  getInitialState: ->
    modalIsOpen: false
    bodyvalue: ""
  openModal: ->
    this.setState
      modalIsOpen: true
    $("#user-textbox").focus()
    window.history.pushState(null, null, "#/thread/"+this.props.queryvalue)
  closeModal: ->
    this.setState
      modalIsOpen: false
  addPost: (e) ->
    $.post "/api/comment.json", {q: this.props.queryvalue, body: this.state.bodyvalue}, (data) =>
      if "error" in data
        console.log data.error
      this.props.onPost()
      this.closeModal()
    this.preventDefault()

  eventChange: (e) ->
    this.setState
      bodyvalue: e.target.value

  render: ->
    <div className="createButton">
      <button onClick={this.openModal} disabled={this.props.disabled}><span className="octicon octicon-comment"></span></button>
      <Modal 
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >
        <form action="javascript:void(0)" onSubmit={this.addPost}>
          <textarea id="user-textbox" value={this.state.bodyvalue} onChange={this.eventChange} ></textarea>
          <button>create</button>
        </form>
      </Modal>
    </div>

module.exports = SearchBox
