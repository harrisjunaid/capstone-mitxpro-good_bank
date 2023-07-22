// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS
import './index.css';
// Components
import App from './App';
//  Web Vitals
import reportWebVitals from './reportWebVitals';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// NavBar Tooltip
import './components/tooltip'
// Context (app wide state)
import { BankProvider } from './assets/context/BankProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BankProvider>
       <App />
    </BankProvider>
  </React.StrictMode>
);

reportWebVitals();