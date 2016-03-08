import React from 'react'
import ReactDOM from 'react-dom'
import Thread from './thread.jsx'
import LoginForm from './loginform.jsx'
import LogoutForm from './logout.jsx'
import SignupForm from './signupform.jsx'

const init = () => {
    const app = document.getElementById('app')
    document.querySelector(".logo").onclick = () => {
        window.location.href = "#/thread/"
    }
    router(app)
}

window.onhashchange = () => {
  init()
}

const startswith = (str, target) => {
    return str.substring(0, target.length) === target
}

const router = app => {
    if (window.location.hash === "#/login")
        ReactDOM.render(
            <LoginForm />, app
        )
    else if (window.location.hash === "#/logout")
        ReactDOM.render(
            <LogoutForm />, app
        )
    else if (window.location.hash === "#/signup")
        ReactDOM.render(
            <SignupForm />, app
        )
    else if (startswith(window.location.hash, "#/thread/")) {
        ReactDOM.unmountComponentAtNode(app)
        ReactDOM.render(
            <Thread query={window.decodeURI(window.location.hash.slice(9))}/>, app).forceUpdate()
    } else if (window.location.hash === "#/recent") {
        ReactDOM.unmountComponentAtNode(app)
        ReactDOM.render(
            <Thread recent={true} query="" />, app
        )
    } else {
        window.history.pushState(null, null, "#/thread/")
        ReactDOM.unmountComponentAtNode(app)
        ReactDOM.render(
            <Thread query="" />, app
        )
    }
}

document.addEventListener('DOMContentLoaded', init, false);
