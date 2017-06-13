import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import IndexPage from './index-page'

export default (
  <Route path='/'>
    <IndexRoute component={IndexPage} />
  </Route>
)
