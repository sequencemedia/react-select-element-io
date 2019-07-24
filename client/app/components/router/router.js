import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Routes from 'react-select-element-io/client/app/components/routes/routes'

export default () => (
  <Router>
    {Routes}
  </Router>
)
