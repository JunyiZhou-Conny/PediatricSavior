// NavigationBar.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';  // Import Link
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';
import AboutPage from '../AboutPage/AboutPage';


const NavigationBar = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect();
  };

  const navigate = useNavigate();

  const handleAboutUs = () => {
    navigate('/about');  // //AboutPage.js
  };

  const handleProduct = () => {
    navigate('/product') //ProductPage.js
  }

  const handleHome = () => {
    navigate('/') //LandingPage.js
  }

  return (
    <nav>
      <div className="navigation-links">
        <button className="logo">ZeroToHero</button>
        <button onClick={handleHome} className="home-button">Home</button>
        <button onClick={handleProduct} className="product-button">Product</button>
        <button onClick={handleAboutUs} className="about-us-button">About Us</button>
        <button onClick={handleSignIn} className="sign-in-button">SIGN IN</button>
      </div>
    </nav>
  );
};

export default NavigationBar;