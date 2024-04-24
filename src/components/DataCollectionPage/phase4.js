// Phase1Form.js
import React from 'react';
import TextareaInput from './TextAreaInput';


const Phase4 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="phase-container">
          <p className = "phase-label">Phase 4</p>
          <form onSubmit={handleSubmit} className="profileContainer">
        <div className="horizontal-input-container">
      <TextareaInput
        label="HR*"
        type="number"
        name="phase4.vitalSigns.hr"
        value={formData.phase4.vitalSigns.hr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="RR*"
        type="number"
        name="phase4.vitalSigns.rr"
        value={formData.phase4.vitalSigns.rr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="Temp*"
        type="number"
        name="phase4.vitalSigns.temp"
        value={formData.phase4.vitalSigns.temp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="NIBP*"
        type="text"
        name="phase4.vitalSigns.nibp"
        value={formData.phase4.vitalSigns.nibp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="O2*"
        type="number"
        name="phase4.vitalSigns.o2"
        value={formData.phase4.vitalSigns.o2}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="CO2"
        type="number"
        name="phase4.vitalSigns.co2"
        value={formData.phase4.vitalSigns.co2}
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
  
  );
};

export default Phase4;

/* OLDER VERSION COMMENTED OUT BY HARU FOR MERGE PURPOSES!!!
const Phase4 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="phase-container">
          <p className = "phase-label">Phase 4</p>
          <form onSubmit={handleSubmit} className="profileContainer">
        <div className="horizontal-input-container">
      <TextareaInput
        label="HR*"
        type="number"
        name="phase4.vitalSigns.hr"
        value={formData.phase4.vitalSigns.hr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="RR*"
        type="number"
        name="phase4.vitalSigns.rr"
        value={formData.phase4.vitalSigns.rr}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="Temp*"
        type="number"
        name="phase4.vitalSigns.temp"
        value={formData.phase4.vitalSigns.temp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="NIBP*"
        type="text"
        name="phase4.vitalSigns.nibp"
        value={formData.phase4.vitalSigns.nibp}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="O2*"
        type="number"
        name="phase4.vitalSigns.o2"
        value={formData.phase4.vitalSigns.o2}
        onChange={handleChange}
        size="small"
        className="textAreaInput small"
      />
      <TextareaInput
        label="CO2"
        type="number"
        name="phase4.vitalSigns.co2"
        value={formData.phase4.vitalSigns.co2}
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
  
  );
};

export default Phase4;
*/