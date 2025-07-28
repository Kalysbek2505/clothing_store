import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/js/bootstrap.bundle' // Popper + Bootstrap JS
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'

AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
