import React from 'react';
import { useState } from 'react';
import './AboutPage.css';


const AboutPage = () => {
  return (
    <div className="about-page-container">
      <h1 className="main-heading">Airway Management Assistant</h1>
      <h2 className="team-name">Team Zero to Hero</h2>
      
      <section className="guiding-questions">
        <div className="box-container">
          {/* 4 boxes on top */}
          <div className="box">
            <img src="/path-to-person1.jpg" alt="Person 1" className="box-image" />
            <p className="image-description">Person 1 Description</p>
          </div>
          <div className="box">
            <img src="/path-to-person2.jpg" alt="Person 2" className="box-image" />
            <p className="image-description">Person 2 Description</p>
          </div>
          <div className="box">
            <img src="/path-to-person3.jpg" alt="Person 3" className="box-image" />
            <p className="image-description">Person 3 Description</p>
          </div>
          <div className="box">
            <img src="/path-to-person4.jpg" alt="Person 4" className="box-image" />
            <p className="image-description">Person 4 Description</p>
          </div>
          
          {/* 3 boxes below, centered */}
          <div className="box center-box">
            <img src="/path-to-person5.jpg" alt="Person 5" className="box-image" />
            <p className="image-description">Person 5 Description</p>
          </div>
          <div className="box center-box">
            <img src="/path-to-person6.jpg" alt="Person 6" className="box-image" />
            <p className="image-description">Person 6 Description</p>
          </div>
          <div className="box center-box">
            <img src="/path-to-person7.jpg" alt="Person 7" className="box-image" />
            <p className="image-description">Person 7 Description</p>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        .about-page-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: white;
        }
        .box-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* Creates 4 columns */
          grid-gap: 10px;
        }
        .box {
          background-color: white;
          padding: 10px;
          border: 1px solid #ccc;
          height: 200px; /* Adjust height for better image fit */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .box-image {
          width: 100%; /* Full width of the box */
          height: auto; /* Maintain aspect ratio */
          max-height: 150px; /* Limit image height */
        }
        .image-description {
          text-align: center; /* Center align the text below the image */
          margin-top: 10px; /* Space between image and text */
        }
      `}</style>
    </div>
    
  );
};

export default AboutPage;