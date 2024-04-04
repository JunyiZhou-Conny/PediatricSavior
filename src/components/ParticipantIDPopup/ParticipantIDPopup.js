import React, { useState } from 'react';

const ParticipantIDPopup = ({ onSubmit, onClose }) => {
  const [participantID, setParticipantID] = useState('');

  const handleSubmit = () => {
    onSubmit(participantID);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="popup-content">
          <h2>Enter Participant ID</h2>
          <input type="text" value={participantID} onChange={(e) => setParticipantID(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantIDPopup;