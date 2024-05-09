import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './routes/Login.tsx'
/* import Profile from './routes/Profile.tsx' */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
