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
// Google OAuth
import {GoogleOAuthProvider} from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="417941312033-dpr8o0b92jsh73co8n4gph84phubooeq.apps.googleusercontent.com">
      <BankProvider>
         <App />
      </BankProvider>
    </GoogleOAuthProvider>;
  </React.StrictMode>
);

reportWebVitals();