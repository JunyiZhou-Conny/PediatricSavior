// Phase1Form.js
import React from 'react';
import TextareaInput from './TextAreaInput';


const Phase3 = ({ formData, handleChange, handleSubmit }) => {
  return (
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
    
 
  );
};

export default Phase3;