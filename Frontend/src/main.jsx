import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Userprovider } from './contextapi/authuser.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Userserverprovider } from './contextapi/getuserserver.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <Userprovider>
    <Userserverprovider>
    <App />
    </Userserverprovider>

 </Userprovider>
  </BrowserRouter>
 
)
