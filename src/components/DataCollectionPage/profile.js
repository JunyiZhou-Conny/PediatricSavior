// Phase1Form.js
import React from 'react';
import TextareaInput from './TextAreaInput';


const Profile = ({ formData, handleChange, handleSubmit }) => {
  return (
    
      
    <div className = "phase-container">
    <form onSubmit={handleSubmit} className="objectivesContainer">
      <TextareaInput
        size="medium"
        label="Objective 1*"
        name="ScenarioOutline.objectives.objective1"
        value={formData.ScenarioOutline.objectives.objective1}
        onChange={handleChange}
        className="textAreaInput medium"
      />
    
      <TextareaInput
        size = "medium"
        label="Objective 2"
        name="ScenarioOutline.objectives.objective2"
        value={formData.ScenarioOutline.objectives.objective2}
        onChange={handleChange}
        className="textAreaInput medium"
      />
    
      <TextareaInput
        size="medium"
        label="Objective 3"
        name="ScenarioOutline.objectives.objective3"
        value={formData.ScenarioOutline.objectives.objective3}
        onChange={handleChange}
        className="textAreaInput medium"
      />
    
      <TextareaInput
        size="medium"
        label="Objective 4"
        name="ScenarioOutline.objectives.objective4"
        value={formData.ScenarioOutline.objectives.objective4}
        onChange={handleChange}
        className="textAreaInput medium"
      />
    
      <TextareaInput
        size="medium"
        label="Objective 5"
        name="ScenarioOutline.objectives.objective5"
        value={formData.ScenarioOutline.objectives.objective5}
        onChange={handleChange}
        className="textAreaInput medium"
      />
    </form>
    
        <form onSubmit={handleSubmit} className="scenarioContainer">
          <TextareaInput
            label="Scenario Outline*"
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
              label="Name*"
              name="ScenarioOutline.patientReport.basicInformation.name"
              value={formData.ScenarioOutline.patientReport.basicInformation.name}
              onChange={handleChange}
              size="small"
              className="textAreaInput small"
            />
            <TextareaInput
              label="Age*"
              type="number"
              name="ScenarioOutline.patientReport.basicInformation.age"
              value={formData.ScenarioOutline.patientReport.basicInformation.age}
              onChange={handleChange}
              size="small"
              className="textAreaInput small"
            />
            <TextareaInput
              label="Sex*"
              type="text"
              name="ScenarioOutline.patientReport.basicInformation.sex"
              value={formData.ScenarioOutline.patientReport.basicInformation.sex}
              onChange={handleChange}
              size="small"
              className="textAreaInput small"
            />
            <TextareaInput
              label="Weight*"
              type="text"
              name="ScenarioOutline.patientReport.basicInformation.weight"
              value={formData.ScenarioOutline.patientReport.basicInformation.weight}
              onChange={handleChange}
              size="small"
              className="textAreaInput small"
            />
            <TextareaInput
              label="Diagnosis*"
              type="text"
              name="ScenarioOutline.patientReport.basicInformation.diagnosis"
              value={formData.ScenarioOutline.patientReport.basicInformation.diagnosis}
              onChange={handleChange}
              size="small"
              className="textAreaInput small"
            />

            <TextareaInput
                    label="Last Meal"
                    type = "text"
                    name="ScenarioOutline.patientReport.history.lastMeal"
                    value={formData.ScenarioOutline.patientReport.history.lastMeal}
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
    </div>
    
    
  );
};

export default Profile;