//Imports node modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Imports custom modules
import App from './App.jsx'
import './Main.css'

//Renders the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)