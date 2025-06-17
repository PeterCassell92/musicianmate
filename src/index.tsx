import React from 'react'
import { createRoot } from 'react-dom/client'

import './styles/main.scss'
import App from './App'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const rootHtmlElem = document.getElementById('root')
// Safely get the root element


if (rootHtmlElem instanceof Element) {
  const root = createRoot(rootHtmlElem)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Root element not found!')
}
