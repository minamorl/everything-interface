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
      page: 1,
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
          results: data.results,
          textvalue: this.props.query,
        })
      })
    } else {
      this.updateList(this.props.query)
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

    $(window).scroll(() => {
       if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
         this.pagination()
       }
    })
  }

  eventChange (e) {
    this.setState({
      textvalue: e.target.value,
      page: 1,
    })
    this.updateList(e.target.value)
  }

  updateList (query){
    $.getJSON("/api/thread.json", {q: query}, (data) => {
      this.setState({
        results: data.results,
      })
    })
  }
    
  pagination () {
    $.getJSON("/api/thread.json", {q: this.state.textvalue, page: this.state.page + 1}, (data) => {
      this.setState({
        results: this.state.results.concat(data.results),
        page: this.state.page + 1,
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
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList.bind(undefined, this.state.textvalue)} disabled={!this.state.logged_in || this.state.textvalue===""}/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      {index}
      {listui}
    </div>
  }
}

module.exports = Thread
