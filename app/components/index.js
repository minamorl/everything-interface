import React, {Component} from 'react'
import { get_thread_index } from '../lib/service'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        get_thread_index((data) => {
            this.setState({
                results: data.results
            })
        })
    }

    render() {
        let list = [];
        this.state.results.forEach((r, index) => {
            list.push(<ListElement key={index} title={r.title} />)
        })
        if (!this.props.hidden) {
            return <div>
        <h1>最近投稿されたスレッド</h1>
        <ul className="index">
          {list}
        </ul>
      </div>
        } else {
            return <div className="hidden"></div>
        }
    }
}

class ListElement extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <li>
      <a href={"#/thread/" + window.encodeURI(this.props.title)}>{this.props.title}</a>
    </li>
    }
}
