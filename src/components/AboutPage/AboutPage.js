import React from 'react';
import { useState } from 'react';
import './AboutPage.css';
import haruImage from './haru-cs370.png';
import ryanImage from './ryan-cs370.JPG';
import connyImage from './conny-cs370.JPG';
import davidImage from './david-cs370.JPG';
import simonImage from './simon-cs370.JPG'


const teamMembers = [
  { id: 1, name: 'Conny Zhou', description: 'Class of 2025 \nMajor: AMS \nBest Team Lead, responsible for authentication, FrontEnd, BackEnd and Graphic Designs', imgSrc: connyImage },
  { id: 2, name: 'Simon Liu', description: 'Person 2 Description', imgSrc: simonImage },
  { id: 3, name: 'Chloe Liu', description: 'Person 3 Description', imgSrc: '/path-to-person3.jpg' },
  { id: 4, name: 'David', description: 'Person 4 Description', imgSrc: davidImage },
  { id: 5, name: 'Ryan Meng', description: 'Person 5 Description', imgSrc: ryanImage },
  { id: 6, name: 'Harutoshi Okumura', description: 'Person 6 Description', imgSrc: haruImage },
  { id: 7, name: 'Blake', description: 'Person 7 Description', imgSrc: '/path-to-person7.jpg' },
];


const AboutPage = () => {

  {/* const functions */}
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [zoomed, setZoomed] = useState(null);

  const handleBoxClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const toggleZoom = (id) => {
    if (zoomed === id) {
      setZoomed(null); // Unzoom if the same image is clicked again
    } else {
      setZoomed(id); // Zoom the clicked image
    }
  };

  return (
    <div className="about-page-container">
      <h1 className="main-heading">Airway Management Assistant</h1>
      <h2 className="team-name">Team Zero to Hero</h2>

      <h3 className="team-introduction">Our Team Members:</h3>
      <section className="guiding-questions">
        <div className="box-container">
          {teamMembers.map(person => (
            <div key={person.id} className="box" onClick={() => handleBoxClick(person)}>
              <img src={person.imgSrc} alt={person.name} className="box-image" />
              <p className="image-description">{person.name}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedPerson && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedPerson.name}</h2>
            <p>{selectedPerson.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;