React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
Modal    = require 'react-modal'

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
      "borderRadius": "4px"
      width: "600px"
      height: "260px"
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
    messagelabel:"messages"
    results: []
    logged_in: false
  componentDidMount: ->
    $.getJSON "/api/thread.json", {q: this.state.textvalue}, (data) =>
      this.setState
        results: data.results


      if _.isNull(data.results[0].auth.name)
        this.setState
          messagelabel: ""
          logged_in: false

      else
        this.setState
          messagelabel: "You are logged in as @" + data.results[0].auth.name
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
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList}/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} />
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
  closeModal: ->
    this.setState
      modalIsOpen: false
  addPost: ->
    $.getJSON "/api/comment.json", {q: this.props.queryvalue, body: this.state.bodyvalue}, (data) =>
      if "error" in data
        console.log data.error
      this.props.onPost()
        
    this.closeModal()
  eventChange: (e) ->
    this.setState
      bodyvalue: e.target.value

  render: ->
    <div className="createButton">
      <button onClick={this.openModal}>new</button>
      <Modal 
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >
        <h2> Create a New Post </h2>
        <form action="#" >
          <textarea id="user-textbox" value={this.state.bodyvalue} onChange={this.eventChange} ></textarea>
          <button onClick={this.addPost}>create</button>
        </form>
      </Modal>
    </div>

ListUI = React.createClass
  
  render: ->
    <ul>
      {
        for r, index in this.props.results
          <ListElement key={index} data={r} search={this.props.search}/>
      }
    </ul>

ListElement = React.createClass
  linkClick: ->
    this.props.search(this.props.data.thread.name)

  render:->
    <li>
      <div>{this.props.data.body}</div>
      <div className="detail">
        <div className="commit-author"><a href="#" onClick={this.linkClick}>{this.props.data.thread.name}</a></div>
        <div className="project">{this.props.data.author.name}</div>
      </div>
    </li>

module.exports = SearchBox
