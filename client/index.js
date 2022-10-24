import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'

const App = (
  <Router />
)

const app = document.getElementById('app')

ReactDOM.hydrate(
  App,
  app
)
