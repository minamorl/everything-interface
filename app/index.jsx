'use strict';

let React = require('react')
let $ = require('jquery')
let _ = require('lodash')

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        $.get("/api/index.json", (data) =>
            this.setState({
                results: data.results
            }))
    }

    render() {
        let list = [];
        this.state.results.forEach((r, index) => {
            list.push(<ListElement key={index} title={r.title} />)
        })
        if (!this.props.hidden) {
            return <div>
        <h1>最近投稿されたスレッド</h1>
        <a href="#/recent">全部読む</a>
        <ul className="index">
          {list}
        </ul>
      </div>
        } else {
            return <div className="hidden"></div>
        }
    }
}

class ListElement extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <li>
      <a href={"#/thread/" + window.encodeURI(this.props.title)}>{this.props.title}</a>
    </li>
    }
}

module.exports = Index
