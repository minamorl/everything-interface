import BaseForm from "./baseform"
import { signup_user } from './lib/service'

const $ = require('jquery')
export default class SignupForm extends BaseForm {

    constructor(props) {
        super(props)
        this.label = "sign up"
    }

    send(e) {
        signup_user(this.state.username, this.state.password, data => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay")
                window.location.hash = "#"
        })
    }

}
