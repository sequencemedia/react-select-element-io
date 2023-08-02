import React from 'react'
import {
  createRoot
} from 'react-dom/client'

import IndexPage from '#client/components/index-page'

const app = document.getElementById('app')

createRoot(app)
  .render(
    <IndexPage />
  )
