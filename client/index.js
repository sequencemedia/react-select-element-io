import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router
} from './app/components'

const App = (
  <Router />
)

const app = document.getElementById('app')

ReactDOM.hydrate(
  App,
  app
)
