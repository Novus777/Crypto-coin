import './index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import VaultCoinHome from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VaultCoinHome />
  </React.StrictMode>
)
