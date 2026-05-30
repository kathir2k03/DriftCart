import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import {Provider} from 'react-redux'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
    <App />
    </Provider>
  </>,
)
