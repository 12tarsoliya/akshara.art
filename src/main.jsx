import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

console.log("%c🎨 Akshara Art Gallery", "color: #c4a47c; font-size: 24px; font-weight: bold; font-family: sans-serif;");
console.log("%cCustom built exclusively for Akshara Tarsoliya.", "color: #22c55e; font-size: 12px; margin-top: 5px;");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
