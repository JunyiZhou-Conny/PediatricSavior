// Phase1Form.js
import React from 'react';
import TextareaInput from './TextAreaInput';


const Phase1 = ({ formData, handleChange, handleSubmit }) => {
  return (
    
      <div className="phase-container">
          <p className = "phase-label">Phase 1</p>

          <form onSubmit={handleSubmit} className="scenarioContainer">

            
      <TextareaInput
        label="Initial State*"
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
          label="HR*"
          name="phase1.vitalSigns.hr"
          value={formData.phase1.vitalSigns.hr}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="RR*"
          type="number"
          name="phase1.vitalSigns.rr"
          value={formData.phase1.vitalSigns.rr}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="Temp*"
          type="number"
          name="phase1.vitalSigns.temp"
          value={formData.phase1.vitalSigns.temp}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="NIBP*"
          type="text"
          name="phase1.vitalSigns.nibp"
          value={formData.phase1.vitalSigns.nibp}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="O2*"
          type="number"
          name="phase1.vitalSigns.o2"
          value={formData.phase1.vitalSigns.o2}
          onChange={handleChange}
          size="small"
          className="textAreaInput small"
        />
        <TextareaInput
          label="CO2"
          type="number"
          name="phase1.vitalSigns.co2"
          value={formData.phase1.vitalSigns.co2}
          onChange={handleChange}
          className="textAreaInput small"
        />
      </div>
    </form>
    <p className = "Hardstop-label">Hard Stops*</p>
    <form onSubmit={handleSubmit} className="objectivesContainer">
    <TextareaInput
size="medium"
label="Ventilation Equipment"
name="phase1.hardStop.ventilationEquipment"
value={formData.phase1.hardStop.ventilationEquipment}
onChange={handleChange}
placeholder = "Enter HardStops"
className="textAreaInput medium"
/>

<TextareaInput
size="medium"
label="Ventilation Technique"
name="phase1.hardStop.ventilationTechnique"
value={formData.phase1.hardStop.ventilationTechnique}
onChange={handleChange}
className="textAreaInput medium"
placeholder = "Enter HardStops"
/>

<TextareaInput
size="medium"
label="Airway Management"
name="phase1.hardStop.airwayManagement"
value={formData.phase1.hardStop.airwayManagement}
onChange={handleChange}
className="textAreaInput medium"
placeholder = "Enter HardStops"
/>

<TextareaInput
size="medium"
label="Mask Positioning"
name="phase1.hardStop.maskPositioning"
value={formData.phase1.hardStop.maskPositioning}
onChange={handleChange}
className="textAreaInput medium"
placeholder = "Enter HardStops"
/>

</form>
     
        
    </div>
  );
};

export default Phase1;