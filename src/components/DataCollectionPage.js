import React, { useState } from 'react';

import TextareaInput from './TextAreaInput';

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
    // Split the name string into an array of property names
    const propertyNames = name.split('.');
    // Initialize formDataCopy with a copy of the current formData
    let formDataCopy = { ...formData };
  
    // Iterate over each property name to access the nested property
    let currentObj = formDataCopy;
    for (let i = 0; i < propertyNames.length; i++) {
      const propertyName = propertyNames[i];
      // If it's the last property name, set its value
      if (i === propertyNames.length - 1) {
        currentObj[propertyName] = value;
      } else {
        // If the property doesn't exist or isn't an object, create an empty object
        currentObj[propertyName] = currentObj[propertyName] || {};
        // Move to the next level of the nested property
        currentObj = currentObj[propertyName];
      }
    }
  
    // Update the formData state with the modified copy
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
      console.log('Form Data:', formData);
      
    }
  };

  return (
    <div>
      

<form onSubmit={handleSubmit} className="objectivesContainer">
  <TextareaInput
    size="medium"
    label="Objective 1"
    name="ScenarioOutline.objectives.objective1"
    value={formData.ScenarioOutline.objectives.objective1}
    placeholder="Default: Recognize the need to start bag mask ventilation in an apneic patient"
    defaultValue="Recognize the need to start bag mask ventilation in an apneic patient"
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size = "medium"
    label="Objective 2"
    name="ScenarioOutline.objectives.objective2"
    value={formData.ScenarioOutline.objectives.objective2}
    placeholder="Default: Demonstrate the ability to clear and open the airway and use adjuncts such as the oropharyngeal airway"
    defaultValue="Demonstrate the ability to clear and open the airway and use adjuncts such as the oropharyngeal airway"
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Objective 3"
    name="ScenarioOutline.objectives.objective3"
    value={formData.ScenarioOutline.objectives.objective3}
    placeholder="Default: Choose and set up appropriate bag mask ventilation equipment"
    defaultValue="Choose and set up appropriate bag mask ventilation equipment"
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Objective 4"
    name="ScenarioOutline.objectives.objective4"
    value={formData.ScenarioOutline.objectives.objective4}
    placeholder="Default: Be able to position the mask correctly and achieve a good seal"
    defaultValue="Be able to position the mask correctly and achieve a good seal"
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Objective 5"
    name="ScenarioOutline.objectives.objective5"
    value={formData.ScenarioOutline.objectives.objective5}
    placeholder="Default: Demonstrate appropriate ventilation technique and maneuvers to effectively ventilate the patient"
    defaultValue="Demonstrate appropriate ventilation technique and maneuvers to effectively ventilate the patient"
    onChange={handleChange}
    className="textAreaInput medium"
  />
</form>

    <form onSubmit={handleSubmit} className="scenarioContainer">
      <TextareaInput
        label="Scenario Outline"
        size = "large"
        className = "textAreaInput large"
        name="ScenarioOutline.casePresentation"
        value={formData.ScenarioOutline.casePresentation}
        onChange={handleChange}
      />
      
    </form>

    


    <form onSubmit={handleSubmit} className="profileContainer">
      <div className="horizontal-input-container">
        <TextareaInput
          
          label="Name"
          name="ScenarioOutline.patientReport.basicInformation.name"
          value={formData.ScenarioOutline.patientReport.basicInformation.name}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Age"
          type="number"
          name="ScenarioOutline.patientReport.basicInformation.age"
          value={formData.ScenarioOutline.patientReport.basicInformation.age}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Sex"
          type="text"
          name="ScenarioOutline.patientReport.basicInformation.sex"
          value={formData.ScenarioOutline.patientReport.basicInformation.sex}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Weight"
          type="text"
          name="ScenarioOutline.patientReport.basicInformation.weight"
          value={formData.ScenarioOutline.patientReport.basicInformation.weight}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Diagnosis"
          type="text"
          name="ScenarioOutline.patientReport.basicInformation.diagnosis"
          value={formData.ScenarioOutline.patientReport.basicInformation.diagnosis}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
      </div>
    </form>

    <form onSubmit={handleSubmit} className="objectivesContainer">
    <TextareaInput
    size="medium"
    label="Symptoms"
    name="ScenarioOutline.patientReport.history.symptoms"
    value={formData.ScenarioOutline.patientReport.history.symptoms}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Allergies"
    name="ScenarioOutline.patientReport.history.allergies"
    value={formData.ScenarioOutline.patientReport.history.allergies}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Medications"
    name="ScenarioOutline.patientReport.history.medications"
    value={formData.ScenarioOutline.patientReport.history.medications}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="PMH"
    name="ScenarioOutline.patientReport.history.pmh"
    value={formData.ScenarioOutline.patientReport.history.pmh}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Last Meal"
    name="ScenarioOutline.patientReport.history.lastMeal"
    value={formData.ScenarioOutline.patientReport.history.lastMeal}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Events"
    name="ScenarioOutline.patientReport.history.events"
    value={formData.ScenarioOutline.patientReport.history.events}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  {/* PMH Section */}
  <TextareaInput
    size="medium"
    label="Medical Conditions"
    name="ScenarioOutline.patientReport.PMH.medicalConditions"
    value={formData.ScenarioOutline.patientReport.PMH.medicalConditions}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Surgeries"
    name="ScenarioOutline.patientReport.PMH.surgeries"
    value={formData.ScenarioOutline.patientReport.PMH.surgeries}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Social History"
    name="ScenarioOutline.patientReport.PMH.socialHistory"
    value={formData.ScenarioOutline.patientReport.PMH.socialHistory}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Vaccinations"
    name="ScenarioOutline.patientReport.PMH.vaccinations"
    value={formData.ScenarioOutline.patientReport.PMH.vaccinations}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Family History"
    name="ScenarioOutline.patientReport.PMH.familyHistory"
    value={formData.ScenarioOutline.patientReport.PMH.familyHistory}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />
</form>

<form onSubmit={handleSubmit} className="objectivesContainer">

<TextareaInput
    size="medium"
    label="General Appearance"
    name="ScenarioOutline.patientReport.initialExam.generalAppearance"
    value={formData.ScenarioOutline.patientReport.initialExam.generalAppearance}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Breathing"
    name="ScenarioOutline.patientReport.initialExam.breathing"
    value={formData.ScenarioOutline.patientReport.initialExam.breathing}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Circulation"
    name="ScenarioOutline.patientReport.initialExam.circulation"
    value={formData.ScenarioOutline.patientReport.initialExam.circulation}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Neuro"
    name="ScenarioOutline.patientReport.initialExam.neuro"
    value={formData.ScenarioOutline.patientReport.initialExam.neuro}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />

  <TextareaInput
    size="medium"
    label="Abdomen"
    name="ScenarioOutline.patientReport.initialExam.abdomen"
    value={formData.ScenarioOutline.patientReport.initialExam.abdomen}
    
    defaultValue=""
    onChange={handleChange}
    className="textAreaInput medium"
  />
</form>

    



      {showPhase1 ? (
        <div className="phase-container">
          <p>Phase 1</p>

          <form onSubmit={handleSubmit} className="scenarioContainer">
      <TextareaInput
        label="Initial State"
        size = "large"
        className = "textAreaInput large"
        name="phase1.initialState"
        value={formData.phase1.initialState}
        onChange={handleChange}
      />
      
    </form>

          <form onSubmit={handleSubmit} className="profileContainer">
          <div className="horizontal-input-container">
        <TextareaInput
          label="HR"
          type="number"
          name="phase1.hr"
          value={formData.phase1.vitalSigns.hr}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="RR"
          type="number"
          name="phase1.rr"
          value={formData.phase1.vitalSigns.rr}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Temp"
          type="number"
          name="phase1.temp"
          value={formData.phase1.vitalSigns.temp}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="NIBP"
          type="text"
          name="phase1.nibp"
          value={formData.phase1.vitalSigns.nibp}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="O2"
          type="number"
          name="phase1.o2"
          value={formData.phase1.vitalSigns.o2}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="CO2"
          type="number"
          name="phase1.co2"
          value={formData.phase1.vitalSigns.co2}
          onChange={handleChange}
          className="textAreaInput small"
        />
      </div>
    </form>
    <form onSubmit={handleSubmit} className="objectivesContainer">
  <TextareaInput
    size="medium"
    label="Ventilation Equipment"
    name="ScenarioOutline.hardStops.ventilationEquipment"
    value={formData.phase1.hardStop.ventilationEquipment}
    onChange={handleChange}
    className="textAreaInput medium"
    placeholder = "Enter HardStops"
  />

  <TextareaInput
    size="medium"
    label="Ventilation Technique"
    name="ScenarioOutline.hardStops.ventilationTechnique"
    value={formData.phase1.hardStop.ventilationTechnique}
    onChange={handleChange}
    className="textAreaInput medium"
    placeholder = "Enter HardStops"
  />

  <TextareaInput
    size="medium"
    label="Airway Management"
    name="ScenarioOutline.hardStops.airwayManagement"
    value={formData.phase1.hardStop.airwayManagement}
    onChange={handleChange}
    className="textAreaInput medium"
    placeholder = "Enter HardStops"
  />

  <TextareaInput
    size="medium"
    label="Mask Positioning"
    name="ScenarioOutline.hardStops.maskPositioning"
    value={formData.phase1.hardStop.maskPositioning}
    onChange={handleChange}
    className="textAreaInput medium"
    placeholder = "Enter HardStops"
  />
</form>
     
        </div>
      ) : null}

      {showPhase2 ? (
        <div className="phase-container">
        <p>Phase 2</p>

        

        <form onSubmit={handleSubmit} className="profileContainer">
        <div className="horizontal-input-container">
      <TextareaInput
        label="HR"
        type="number"
        name="phase1.hr"
        value={formData.phase1.vitalSigns.hr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="RR"
        type="number"
        name="phase1.rr"
        value={formData.phase1.vitalSigns.rr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="Temp"
        type="number"
        name="phase1.temp"
        value={formData.phase1.vitalSigns.temp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="NIBP"
        type="text"
        name="phase1.nibp"
        value={formData.phase1.vitalSigns.nibp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="O2"
        type="number"
        name="phase1.o2"
        value={formData.phase1.vitalSigns.o2}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="CO2"
        type="number"
        name="phase1.co2"
        value={formData.phase1.vitalSigns.co2}
        onChange={handleChange}
        className="textAreaInput small"
      />
    </div>
  </form>
  <form onSubmit={handleSubmit} className="objectivesContainer">
<TextareaInput
  size="medium"
  label="Ventilation Equipment"
  name="phase2.hardStop.ventilationEquipment"
  value={formData.phase2.hardStop.ventilationEquipment}
  onChange={handleChange}
  placeholder = "Enter HardStops"
  className="textAreaInput medium"
/>

<TextareaInput
  size="medium"
  label="Ventilation Technique"
  name="phase2.hardStop.ventilationTechnique"
  value={formData.phase2.hardStop.ventilationTechnique}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Airway Management"
  name="phase2.hardStop.airwayManagement"
  value={formData.phase2.hardStop.airwayManagement}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Mask Positioning"
  name="phase2.hardStop.maskPositioning"
  value={formData.phase2.hardStop.maskPositioning}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>
</form>
   
      </div>
      ) : null}

      {showPhase3 ? (
        <div className="phase3-container">
          <p>Phase 3</p>
          <form onSubmit={handleSubmit} className="profileContainer">
        <div className="horizontal-input-container">
      <TextareaInput
        label="HR"
        type="number"
        name="phase3.hr"
        value={formData.phase3.vitalSigns.hr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="RR"
        type="number"
        name="phase3.rr"
        value={formData.phase3.vitalSigns.rr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="Temp"
        type="number"
        name="phase3.temp"
        value={formData.phase3.vitalSigns.temp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="NIBP"
        type="text"
        name="phase3.nibp"
        value={formData.phase3.vitalSigns.nibp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="O2"
        type="number"
        name="phase3.o2"
        value={formData.phase3.vitalSigns.o2}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="CO2"
        type="number"
        name="phase3.co2"
        value={formData.phase3.vitalSigns.co2}
        onChange={handleChange}
        className="textAreaInput small"
      />
    </div>
  </form>
  <form onSubmit={handleSubmit} className="objectivesContainer">
<TextareaInput
  size="medium"
  label="Ventilation Equipment"
  name="phase3.hardStop.ventilationEquipment"
  value={formData.phase3.hardStop.ventilationEquipment}
  onChange={handleChange}
  placeholder = "Enter HardStops"
  className="textAreaInput medium"
/>

<TextareaInput
  size="medium"
  label="Ventilation Technique"
  name="phase3.hardStop.ventilationTechnique"
  value={formData.phase3.hardStop.ventilationTechnique}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Airway Management"
  name="phase3.hardStop.airwayManagement"
  value={formData.phase3.hardStop.airwayManagement}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Mask Positioning"
  name="phase3.hardStop.maskPositioning"
  value={formData.phase3.hardStop.maskPositioning}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>
</form>
   
      </div>
      ) : null}

      {showPhase4 ? (
        <div className="phase4-container">
          <p>Phase 4</p>
          <form onSubmit={handleSubmit} className="profileContainer">
        <div className="horizontal-input-container">
      <TextareaInput
        label="HR"
        type="number"
        name="phase4.hr"
        value={formData.phase4.vitalSigns.hr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="RR"
        type="number"
        name="phase4.rr"
        value={formData.phase4.vitalSigns.rr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="Temp"
        type="number"
        name="phase4.temp"
        value={formData.phase4.vitalSigns.temp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="NIBP"
        type="text"
        name="phase4.nibp"
        value={formData.phase4.vitalSigns.nibp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="O2"
        type="number"
        name="phase4.o2"
        value={formData.phase4.vitalSigns.o2}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="CO2"
        type="number"
        name="phase4.co2"
        value={formData.phase4.vitalSigns.co2}
        onChange={handleChange}
        className="textAreaInput small"
      />
    </div>
  </form>
  <form onSubmit={handleSubmit} className="objectivesContainer">
<TextareaInput
  size="medium"
  label="Ventilation Equipment"
  name="phase4.hardStop.ventilationEquipment"
  value={formData.phase4.hardStop.ventilationEquipment}
  onChange={handleChange}
  placeholder = "Enter HardStops"
  className="textAreaInput medium"
/>

<TextareaInput
  size="medium"
  label="Ventilation Technique"
  name="phase4.hardStop.ventilationTechnique"
  value={formData.phase4.hardStop.ventilationTechnique}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Airway Management"
  name="phase4.hardStop.airwayManagement"
  value={formData.phase4.hardStop.airwayManagement}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>

<TextareaInput
  size="medium"
  label="Mask Positioning"
  name="phase4.hardStop.maskPositioning"
  value={formData.phase4.hardStop.maskPositioning}
  onChange={handleChange}
  className="textAreaInput medium"
  placeholder = "Enter HardStops"
/>
</form>
   
      </div>
      ) : null}

      <div className="btn-container">
        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          {showPhase1 && !showPhase2 && !showPhase3 && !showPhase4 ? 'Submit Phase 1' : null}
          {showPhase2 && !showPhase3 && !showPhase4 ? 'Submit Phase 2' : null}
          {showPhase3 && !showPhase4 ? 'Submit Phase 3' : null}
          {showPhase4 ? 'Submit Phase 4' : null}
        </button>
      </div>
    </div>
  );
};

export default App;
