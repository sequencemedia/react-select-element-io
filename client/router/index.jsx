import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Routes from '#client/routes'

export default () => (
  <Router>
    {Routes}
  </Router>
)
