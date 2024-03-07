import React, { useState } from 'react';

import Phase1 from './phase1';
import Phase2 from './phase2';
import Phase3 from './phase3';
import Phase4 from './phase4';
import Profile from './profile'
import './DataCollectionPage.css';


const App = () => {
  const [formData, setFormData] = useState({

    ScenarioOutline:{
      casePresentation: '',

      objectives: {
        objective1: '',
        objective2: '',
        objective3: '',
        objective4: '',
        objective5: '',
        },

      patientReport: {
        basicInformation: {
          name: '',
          age: '',
          sex: '',
          weight: '',
          diagnosis: '',
        },

        history: {
          symptoms: '',
          allergies: '',
          medications: '',
          pmh: '',
          lastMeal: '',
          events: '',
        },

        PMH:{
          medicalConditions: '',
          hospitalizations: '',
          surgeries: '',
          allergies: '',
          medications: '',
          socialHistory: '',
          familyHistory: '',
        },
        initialExam: {
          generalAppearance: '',
          breathing: '',
          circulation: '',
          abdomen: '',
          neuro: '',
          disability: '',
        },

        labs:{
          rvp: '',
        }
      }
    },

    phase1:{
      initialState: '',
      vitalSigns: {
        hr: '',
        rr: '',
        temp: '',
        nibp: '',
        o2: '',
        co2: '',
        airway: '',
        breathing: '',
        circulation: '',
        disability: '',
      },

      hardStop: {
        ventilationEquipment: '',
        ventilationTechnique: '',
        airwayManagement: '',
        maskPositioning: '',
      },

      softStop: {

      }
    },

    phase2:{
      
      vitalSigns: {
        hr: '',
        rr: '',
        temp: '',
        nibp: '',
        o2: '',
        co2: '',

        airway: '',
        breathing: '',
        circulation: '',
        disability: '',
      },

      hardStop: {
        ventilationEquipment: '',
        ventilationTechnique: '',
        airwayManagement: '',
        maskPositioning: '',
      },

      softStop: {

      }
    },

    phase3:{
      
      vitalSigns: {
        hr: '',
        rr: '',
        temp: '',
        nibp: '',
        o2: '',
        co2: '',

        airway: '',
        breathing: '',
        circulation: '',
        disability: '',
      },

      hardStop: {
        ventilationEquipment: '',
        ventilationTechnique: '',
        airwayManagement: '',
        maskPositioning: '',
      },

      softStop: {

      }
    },

    phase4:{
      
      vitalSigns: {
        hr: '',
        rr: '',
        temp: '',
        nibp: '',
        o2: '',
        co2: '',

        airway: '',
        breathing: '',
        circulation: '',
        disability: '',
      },

      hardStop: {
        ventilationEquipment: '',
        ventilationTechnique: '',
        airwayManagement: '',
        maskPositioning: '',
      },

      softStop: {

      }
    }

  });

  const [showPhase1, setShowPhase1] = useState(false);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showPhase3, setShowPhase3] = useState(false);
  const [showPhase4, setShowPhase4] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const propertyNames = name.split('.');
    let formDataCopy = { ...formData };
    let currentObj = formDataCopy;
    for (let i = 0; i < propertyNames.length; i++) {
      const propertyName = propertyNames[i];

      if (i === propertyNames.length - 1) {
        currentObj[propertyName] = value;
      } else {
        currentObj[propertyName] = currentObj[propertyName] || {};
        currentObj = currentObj[propertyName];
      }
    }
    setFormData(formDataCopy);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showPhase1) {
      setShowPhase1(true);
    } else if (!showPhase2) {
      setShowPhase2(true);
    } else if (!showPhase3) {
      setShowPhase3(true);
      
    } else if (!showPhase4) {
      setShowPhase4(true);
    } else {
      const formDataJSON = JSON.stringify(formData);
      console.log('Form Data:', formDataJSON);
    }
  };

  return (
    <div>
    <Profile formData={formData} handleChange={handleChange} handleSubmit = {handleSubmit} />

      {showPhase1 ? (
        <Phase1 formData={formData} handleChange={handleChange} handleSubmit = {handleSubmit} />
      ) : null}

      {showPhase2 ? (
        <Phase2 formData={formData} handleChange={handleChange} handleSubmit = {handleSubmit} />
      ) : null}

      {showPhase3 ? (
        <Phase3 formData={formData} handleChange={handleChange} handleSubmit = {handleSubmit} />
      ) : null}

      {showPhase4 ? (
        <Phase4 formData={formData} handleChange={handleChange} handleSubmit = {handleSubmit} />
        
      ) : null}

      <div className="btn-container">
        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          Submit 
          {showPhase1 && !showPhase2 && !showPhase3 && !showPhase4 ? ' Phase 1' : null}
          {showPhase2 && !showPhase3 && !showPhase4 ? ' Phase 2' : null}
          {showPhase3 && !showPhase4 ? ' Phase 3' : null}
          {showPhase4 ? ' Phase 4' : null}
        </button>
      </div>
    </div>
  );
};

export default App;
