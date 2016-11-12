import React from 'react'
import {Router, Route, Redirect, hashHistory} from 'react-router'
import Base from './components/base'
import Editor from './components/editor'
import Demo from './components/demo'

import 'bootstrap/dist/css/bootstrap.css'

export default (
  <Router history={hashHistory}>
    <Redirect from="/" to="editor" />
    <Route path="/" component={Base}>
      <Route path="editor" component={Editor}/>
      <Route path="demo" component={Demo}/>
    </Route>
  </Router>
)
