// Phase1Form.js
import React from 'react';
import TextareaInput from './TextAreaInput';


const Phase2 = ({ formData, handleChange, handleSubmit }) => {
  return (
    
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
  );
};

export default Phase2;