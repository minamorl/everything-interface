import BaseForm from "./baseform"
import { login_user } from './lib/service'

export default class LoginForm extends BaseForm {
 
    constructor(props) {
        super(props);
        this.label = "login"
    }

    send(e) {
        login_user(this.state.username, this.state.password, data => {
            this.setState({
                message: data.results.message
            })
            if (data.results.message === "okay") {
                window.location.hash = "#/thread/"
            }
        })
        e.preventDefault()
    }

}
