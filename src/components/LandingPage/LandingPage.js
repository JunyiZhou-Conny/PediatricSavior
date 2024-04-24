// LandingPage.js

import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      {/* Footer if you have one */}
    </div>
  );
};

export default LandingPage;
