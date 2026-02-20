import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import 'bootstrap/dist/js/bootstrap.bundle.js'
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './util/stripe.js'


createRoot(document.getElementById('root')).render(
    
  <BrowserRouter>
    <AppContextProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AppContextProvider>
  </BrowserRouter>
  
)
