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

module.exports = CreateButton
