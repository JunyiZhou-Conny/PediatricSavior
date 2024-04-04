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
          symptoms: 'None',
          allergies: 'None',
          medications: 'None',
          pmh: 'None',
          lastMeal: 'None',
          events: 'None',
        },

        PMH:{
          medicalConditions: 'None',
          hospitalizations: 'None',
          surgeries: 'None',
          allergies: 'None',
          medications: 'None',
          socialHistory: 'None',
          vaccinations: 'None',
          familyHistory: 'None',
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
      if(formData.ScenarioOutline.casePresentation.trim() === '' || 
      (formData.ScenarioOutline.objectives.objective1.trim() === '' &&
      formData.ScenarioOutline.objectives.objective2.trim() === '' &&
      formData.ScenarioOutline.objectives.objective3.trim() === '' &&
      formData.ScenarioOutline.objectives.objective4.trim() === '' &&
      formData.ScenarioOutline.objectives.objective5.trim() === '') ||
      formData.ScenarioOutline.patientReport.basicInformation.name.trim() === '' ||
      formData.ScenarioOutline.patientReport.basicInformation.age.trim() === '' ||
      formData.ScenarioOutline.patientReport.basicInformation.sex.trim() === '' ||
      formData.ScenarioOutline.patientReport.basicInformation.weight.trim() === '' ||
      formData.ScenarioOutline.patientReport.basicInformation.diagnosis.trim() === '')
      {
        alert('Please fill in all required fields.');
        return; // Exit the function if any required field is empty
      }
      
      setShowPhase1(true);

    } else if (!showPhase2) {
      if (
        (formData.phase1.initialState.trim() === '') ||
        (formData.phase1.vitalSigns.hr.trim() === '') ||
        (formData.phase1.vitalSigns.rr.trim() === '') ||
        (formData.phase1.vitalSigns.temp.trim() === '') ||
        (formData.phase1.vitalSigns.nibp.trim() === '') ||
        (formData.phase1.vitalSigns.o2.trim() === '') ||
        ((formData.phase1.hardStop.ventilationEquipment.trim() === '') &&
        (formData.phase1.hardStop.ventilationTechnique.trim() === '') &&
        (formData.phase1.hardStop.airwayManagement.trim() === '') &&
        (formData.phase1.hardStop.maskPositioning.trim() === '')) 
      ){
        alert('Please fill in all required fields.');
        return; // Exit the function if any required field is empty
      }
      
      setShowPhase2(true);
    } else if (!showPhase3) {
      if (
        (formData.phase2.vitalSigns.hr.trim() === '') ||
        (formData.phase2.vitalSigns.rr.trim() === '') ||
        (formData.phase2.vitalSigns.temp.trim() === '') ||
        (formData.phase2.vitalSigns.nibp.trim() === '') ||
        (formData.phase2.vitalSigns.o2.trim() === '') ||
        ((formData.phase2.hardStop.ventilationEquipment.trim() === '') &&
        (formData.phase2.hardStop.ventilationTechnique.trim() === '') &&
        (formData.phase2.hardStop.airwayManagement.trim() === '') &&
        (formData.phase2.hardStop.maskPositioning.trim() === '')) 
      ){
        alert('Please fill in all required fields.');
        return; // Exit the function if any required field is empty
      }
      
      setShowPhase3(true);
      
    } else if (!showPhase4) {
      if (
        (formData.phase3.vitalSigns.hr.trim() === '') ||
        (formData.phase3.vitalSigns.rr.trim() === '') ||
        (formData.phase3.vitalSigns.temp.trim() === '') ||
        (formData.phase3.vitalSigns.nibp.trim() === '') ||
        (formData.phase3.vitalSigns.o2.trim() === '') ||
        ((formData.phase3.hardStop.ventilationEquipment.trim() === '') &&
        (formData.phase3.hardStop.ventilationTechnique.trim() === '') &&
        (formData.phase3.hardStop.airwayManagement.trim() === '') &&
        (formData.phase3.hardStop.maskPositioning.trim() === '')) 
      ){
        alert('Please fill in all required fields.');
        return; // Exit the function if any required field is empty
      }
      setShowPhase4(true);

    } else {

      if (     
        (formData.phase4.vitalSigns.hr.trim() === '') ||
        (formData.phase4.vitalSigns.rr.trim() === '') ||
        (formData.phase4.vitalSigns.temp.trim() === '') ||
        (formData.phase4.vitalSigns.nibp.trim() === '') ||
        (formData.phase4.vitalSigns.o2.trim() === '') ||
        ((formData.phase4.hardStop.ventilationEquipment.trim() === '') &&
        (formData.phase4.hardStop.ventilationTechnique.trim() === '') &&
        (formData.phase4.hardStop.airwayManagement.trim() === '') &&
        (formData.phase4.hardStop.maskPositioning.trim() === '')) 
      ) {
        alert('Please fill in all required fields.');
        return; // Exit the function if any required field is empty
      }

      const formDataJSON = JSON.stringify(formData);
      console.log('Form Data:', formDataJSON);
    }
  };

  return (
    
    <div className = "data-container">
      <p className = "phase-label"> Profile Information</p>
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
