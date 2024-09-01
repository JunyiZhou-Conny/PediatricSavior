import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-og4xau6hi3ojdb13.us.auth0.com"
      clientId="VueIKtPmGrBKV70G43fFS65wRdJpsSNy"
      redirectUri={'https://d1zgn9xjpa6cni.cloudfront.net'}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

