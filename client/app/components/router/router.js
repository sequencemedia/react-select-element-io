import React from 'react'
import {
  Router,
  browserHistory
} from 'react-router'

import Routes from 'react-select-element-io/client/app/components/routes/routes'

export default () => (
  <Router history={browserHistory}>
    {Routes}
  </Router>
)
