'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let Modal = require('react-modal')
let Index = require('./index.jsx')
let ListUI = require('./components/listui.jsx')
let MessageLabel = require('./components/message-label.jsx')
let CreateButton = require('./components/create-button.jsx')
let endpoints = require('./lib/endpoints.js')


class Thread extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textvalue: "",
            messagelabel: "",
            results: [],
            logged_in: false,
            page: 1,
            endpoint: endpoints.API_THREAD,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.eventChange = this.eventChange.bind(this)
        this.updateList = this.updateList.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.setState({
            textvalue: this.props.query
        })
        if (this.props.recent) {
            this.setState({
                endpoint: endpoints.API_RECENT,
            })
            $.getJSON(endpoints.API_RECENT, {
                q: this.props.query
            }, (data) => {
                this.setState({
                    results: data.results,
                    textvalue: this.props.query,
                })
            })
        } else {
            this.updateList(this.props.query)
        }
        $.getJSON(endpoints.API_AUTH, (data) => {
            if (_.isNull(data.results.auth.name))
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

        $(window).unbind("scroll")
        $(window).scroll(() => {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 20) {
                this.pagination()
            }
        })
    }

    eventChange(e) {
        this.setState({
            textvalue: e.target.value,
            page: 1,
        })
        this.updateList(e.target.value)
    }

    updateList(query) {
        $.getJSON(endpoints.API_THREAD, {
            q: query
        }, (data) => {
            this.setState({
                results: data.results,
            })
        })
    }

    pagination() {
        this.setState({
            page: this.state.page + 1,
        })
        $.getJSON(this.state.endpoint, {
            q: this.state.textvalue,
            page: this.state.page
        }, (data) => {
            this.setState({
                results: this.state.results.concat(data.results),
            })
        })
    }

    search(keyword) {
        $.getJSON(endpoints.API_THREAD, {
            q: keyword
        }, (data) => {
            this.setState({
                results: data.results,
                textvalue: keyword,
            })
        })
    }

    render() {

        let listui = <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} />
        let index = this.props.recent ? null : <Index hidden={this.state.textvalue!=""}/>

        return <div>
      <input type="text" value={this.state.textvalue} onChange={this.eventChange} placeholder="スレタイ"/>
      <CreateButton queryvalue={this.state.textvalue} onPost={this.updateList.bind(undefined, this.state.textvalue)} disabled={!this.state.logged_in || this.state.textvalue===""}/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      {index}
      {listui}
    </div>
    }
}

module.exports = Thread
