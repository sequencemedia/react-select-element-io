import React from 'react'
import {
  hydrateRoot
} from 'react-dom/client'

import IndexPage from '#client/components/index-page'

const app = document.getElementById('app')

hydrateRoot(
  app,
  <IndexPage />
)
