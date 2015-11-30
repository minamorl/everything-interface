'use strict';

let React    = require('react')
let $        = require('jquery')
let _        = require('lodash')
let Modal    = require('react-modal')

class Index extends React.Component {
  constructor() {
    super()
    this.state = 
      {
        results: []
      }
  }

  componentDidMount() {
    $.get("/api/index.json", (data) =>
      this.setState({
        results: data.results
      }))
  }

  render() {
    if(!this.props.hidden) {
      return <div>
        <h1>最近投稿されたスレッド</h1>
        <a href="#/recent">全部読む</a>
        <ul className="index">
        {
          this.state.results.forEach((r, index) => {
            return <ListElement key={index} title={r.title} />
          })
        }
        </ul>
      </div>
    } else {
      return <div className="hidden"></div>
    }
  }
}

class ListElement extends React.Component {
  render() {
    return <li>
      <a href={"#/thread/" + window.encodeURI(this.props.title)}>{this.props.title}</a>
    </li>
  }
}

module.exports = Index
