import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContextProvider, { AppContext } from './context/AppContext.jsx'

import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContextProvider>

      <App />
    </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
