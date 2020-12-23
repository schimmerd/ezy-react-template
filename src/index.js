import React from 'react';
import ReactDOM from 'react-dom'

import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// core component
import Sample from "layouts/Sample"
// css
import 'assets/css/index.css'


const hist = createBrowserHistory()

ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/sample" component={Sample} />
        <Redirect from="/" to="/sample/home" />
      </Switch>
    </Router>,
    document.getElementById('root')
)