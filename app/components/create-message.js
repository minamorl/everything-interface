'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')
let endpoints = require('../lib/endpoints.js')

export default class CreateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bodyvalue: "",
        }
        this.addPost = this.addPost.bind(this)
        this.onChange = this.onChange.bind(this)
    }
        
    addPost(e) {
        console.log(this.props.search)
        $.post(endpoints.API_COMMENT, {
            q: this.props.search,
            body: this.state.bodyvalue
        }, (data) => {
            window.history.pushState(null, null, "#/thread/" + this.props.queryvalue)
            this.props.updateList(this.props.search)
            this.state.bodyvalue = ""
        })
        e.preventDefault()
    }

    onChange(e) {
        this.setState({
            bodyvalue: e.target.value
        })
    }

    render() {
        return <li className="createMessage">
          <form onSubmit={this.addPost}>
            <textarea onChange={this.onChange} value={this.state.bodyvalue}/>
            <input type="submit" value="投稿" />
          </form>
        </li>
    }
}
