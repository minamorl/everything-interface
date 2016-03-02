'use strict'

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')

export default class MessageLabel extends React.Component {
    render() {
        if (!this.props.isSignUp) {
            return <div className="message-label">
        {this.props.status}
        &nbsp;<a href="/#/logout">logout</a>.
      </div>
        } else {
            return <div className="message-label">
        <a href="/#/signup">新規登録</a> or <a href="/#/login">ログイン</a>
      </div>
        }
    }
}
