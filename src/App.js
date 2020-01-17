import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import ChrList from './character/ChrList'
import ChrView from './character/view/ChrView'
import ChrEdit from './character/edit/ChrEdit'

export default function App() {
  return (
    <div>
      <header>
        <span><strong> Star Trek Adventures | </strong></span>
        <span><small> Character Generator </small></span>
      </header>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/character"/>
          <Route exact path="/character" component={ChrList} />
          <Redirect exact from="/character/:id" to="/character/view/:id"/>
          <Route path="/character/view/:id" component={ChrView} />
          <Route path="/character/edit/:id" component={ChrEdit} />
        </Switch>
      </Router>
      <footer>
        <div> © 2019 CoderSamurai </div>
      </footer>
    </div>
  )
}
