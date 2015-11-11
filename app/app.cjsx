React    = require 'react'
$        = require 'jquery'
_        = require 'lodash'
ReactDOM = require 'react-dom'
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
      "border-radius": "4px"
      width: "600px"
      left: "50%"
      position: "absolute"
      "margin-right": "-50%"
      transform: "translate(-50%, -50%)"
      top: "50%"
  }
}

SearchBox = React.createClass
  getInitialState: ->
    textvalue: ""
    results: []
  componentDidMount: ->
    $.getJSON "/api/thread.json", {q: this.state.textvalue}, (data) =>
      this.setState
        results: data.results
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
  render: ->
    <div>
      <input type="text" value={this.state.textvalue} onChange={this.eventChange}/>
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList}/>
      <ListUI filterWord={this.state.textvalue} results={this.state.results} />
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
          <ListElement key={index} data={r}/>
      }
    </ul>

ListElement = React.createClass
  render:->
    <li>
      <div>{this.props.data.body}</div>
      <div className="detail">
        <div className="commit-author">{this.props.data.author.screen_name}</div>
        <div className="project">{this.props.data.author.name}</div>
      </div>
    </li>

init = ->
  app = document.getElementById 'searchbox'
  Modal.setAppElement(app)
  ReactDOM.render(
    <SearchBox />,
    app
  )

$(document).ready ->
  init()
