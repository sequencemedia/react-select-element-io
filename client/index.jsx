import React from 'react'
import {
  createRoot
} from 'react-dom/client'
import Router from './router/index.jsx'

function App () {
  return <Router />
}

const app = document.getElementById('app')

createRoot(app)
  .render(<App />)
