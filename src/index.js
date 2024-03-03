import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider


// domain and clientId are stored in the .env file, 
// and are accessed using process.env.REACT_APP_AUTH0_DOMAIN and process.env.REACT_APP_AUTH0_CLIENT_ID
const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <React.StrictMode>
    <Auth0Provider
    // Wrap the constant into curly brackets {domain}
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
reportWebVitals();
