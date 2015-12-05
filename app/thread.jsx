'use strict'

let React    = require('react')
let $        = require('jquery')
let _        = require('lodash')
let Modal    = require('react-modal')
let Index    = require('./index.jsx')
let ListUI   = require('./components/listui.jsx')
let MessageLabel = require('./components/message-label.jsx')
let CreateButton = require('./components/create-button.jsx')


class Thread extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textvalue: "",
      messagelabel:"",
      results: [],
      logged_in: false,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.eventChange = this.eventChange.bind(this)
    this.updateList = this.updateList.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount (){
    this.setState({
      textvalue: this.props.query
    })
    if(this.props.recent) {
      $.getJSON("/api/recent.json", {q: this.props.query}, (data) => {
        this.setState({
          results: data.results
        })
      })
    } else {
      $.getJSON("/api/thread.json", {q: this.props.query}, (data) => {
        this.setState({
          results: data.results
        })
      })
    }
    $.getJSON("/api/auth.json", (data) => {
      if(_.isNull(data.results.auth.name))
        this.setState({
          messagelabel: "",
          logged_in: false,
        })

      else
        this.setState({
          messagelabel: "You are logged in as @" + data.results.auth.name,
          logged_in: true,
        })
    })
  }

  eventChange (e) {
    this.setState({
      textvalue: e.target.value
    })
    $.getJSON("/api/thread.json", {q: e.target.value}, (data) => {
      this.setState({
        results: data.results
      })
    })
  }

  updateList (){
    $.getJSON("/api/thread.json", {q: this.state.textvalue}, (data) => {
      this.setState({
        results: data.results
      })
    })
  }
    
  search (keyword) {
    $.getJSON("/api/thread.json", {q: keyword}, (data) => {
      this.setState({
        results: data.results,
        textvalue: keyword,
      })
    })
  }
  
  render () {

    let listui = <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} />
    let index  = this.props.recent ? null : <Index hidden={this.state.textvalue!=""}/>

    return <div>
      <input type="text" value={this.state.textvalue} onChange={this.eventChange} placeholder="thread title"/>
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList} disabled={!this.state.logged_in || this.state.textvalue===""}/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      {index}
      {listui}
    </div>
  }
}

module.exports = Thread
