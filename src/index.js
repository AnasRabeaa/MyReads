import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './index.css'

ReactDOM.render(
    /* wrap the app in a BrowserRouter */
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"))