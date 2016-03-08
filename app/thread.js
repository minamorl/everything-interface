'use strict'

import React from 'react'
import Index from './components/index'
import ListUI from './components/listui'
import MessageLabel from './components/message-label'
import {get_auth, get_thread, get_recent} from './lib/service'

let _ = require('lodash')
let $ = require('jquery')

export default class Thread extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textvalue: "",
            messagelabel: "",
            results: [],
            logged_in: false,
            page: 1,
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
        this.updateList(this.props.query)
        get_auth((data) => {
            if (_.isNull(data.results.auth.name)) {
                this.setState({
                    messagelabel: "",
                    logged_in: false,
                })
            } else {
                this.setState({
                    messagelabel: "You are logged in as @" + data.results.auth.name,
                    logged_in: true,
                })
            }
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
        get_thread(query, 1, (data) => {
            this.setState({
                results: data.results,
            })
        })
    }

    pagination() {
        this.setState({
            page: this.state.page + 1,
        })
        get_thread(this.state.textvalue, this.state.page, (data) => {
            this.setState({
                results: this.state.results.concat(data.results),
            })
        })
    }

    search(keyword) {
        get_thread(keyword, (data) => {
            this.setState({
                results: data.results,
                textvalue: keyword,
            })
        })
    }

    render() {

        let listui = <ListUI filterWord={this.state.textvalue} results={this.state.results} search={this.search} updateList={this.updateList} logged_in={this.state.logged_in}/>
        let index = <Index hidden={this.state.textvalue!=""}/>;

        return <div>
      <input type="text" value={this.state.textvalue} onChange={this.eventChange} placeholder="スレタイ"/>
      <MessageLabel status={this.state.messagelabel} isSignUp={!this.state.logged_in}/>
      {index}
      {listui}
    </div>
    }
}
