import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'lib-flexible/flexible';
import { BrowserRouter as Router } from 'react-router-dom';
import VConsole from 'vconsole';
import './index.css'

const urlParams = new URLSearchParams(window.location.search);
const isDebugging = urlParams.get('debug') === '1';

if (isDebugging) {
  new VConsole();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
