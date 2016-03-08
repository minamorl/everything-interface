'use strict'

import React from 'react'
import logout_user from './lib/service'

export default class LogoutForm extends React.Component {

    componentDidMount() {
        logout_user()
    }

    render() {
        return <div className="logout">
      <div>Logged out.</div>
      <a href="#/">back to the top</a>
    </div>
    }

}
