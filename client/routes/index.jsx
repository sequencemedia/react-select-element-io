import React from 'react'
import {
  Route
} from 'react-router'

import IndexPage from '#client/components/index-page'

export default (
  <Route exact path='/' component={IndexPage} />
)
