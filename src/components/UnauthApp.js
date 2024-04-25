// UnauthApp.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import AboutPage from './AboutPage/AboutPage';
import ProductPage from './ProductPage/ProductPage';
import NavigationBar from './NavigationBar/NavigationBar';

const UnauthApp = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default UnauthApp;