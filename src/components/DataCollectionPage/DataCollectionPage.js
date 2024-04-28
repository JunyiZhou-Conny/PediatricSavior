import React, { useState } from 'react';
import FormInput from './FormAreaInput';
import TextareaInput from './TextAreaInput';
import TextareaInputLong from './TextAreaInputLong';
import './DataCollectionPage.css'

// formData holds the data for the main form
// Notice how the data is not stored as an array
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
    }
  });






  // phases hold an array of phase data
  const [phases, setPhases] = useState([
    {
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

      softStop: {}
    }
  ]);
  // a function called handleChange is created to handle changes in the form inputs
  // It takes an event object e as an argument
  // e.target refers to the HTML element that triggered the event
  // e.taget contains the name and value of the input element

  // setFormData receives state prevState as its parameter
  // ... is the spread operator, it copies the properties of prevState into a new object
  // [name]: value is used to update the property with the name of the input element
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      // Create a deep copy of the state to avoid mutation
      const newState = JSON.parse(JSON.stringify(prevState));
  
      // Split the name to access deep properties
      const keys = name.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
  
      // Return the new state
      return newState;
    });
  };
  

  const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;
    setPhases(prevPhases => {
      // Create a deep copy of the phases array
      const newPhases = JSON.parse(JSON.stringify(prevPhases));
  
      // Split the name to access deep properties
      const keys = name.split('.');
      let current = newPhases[index];
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
  
      // Return the new phases array
      return newPhases;
    });
  };

  // addPhase function is created to add a new phase to the phases array/
  const addPhase = () => {
    setPhases([...phases, {
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

    softStop: {}
  }]);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const combinedData = {
      formData: formData,
      phases: phases
    };

    fetch('http://localhost:4999/submit-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    setIsSubmitting(false);
    alert("Submission Completed")
  };
  //1. The user types into the "Objectives" TextareaInput. 
  //This triggers the onChange event.

  //2. The onChange prop of the TextareaInput is set to the handleChange function, 
  // so handleChange is called. The event object e is automatically passed to 
  //handleChange by the browser.

  //3. Inside handleChange, e.target refers to the HTML element that triggered the 
  //event, which is the textarea input. e.target.name is the name attribute of 
  //the textarea input, which is set to "objective". e.target.value is the current 
  //value of the textarea input, which is whatever the user just typed.

  //4. The line const { name, value } = e.target; destructures e.target into name 
  //and value. So name is "objective" and value is whatever the user just typed.

  //5. setFormData is called with a function as its argument. 
  //This function receives the current state prevState as its parameter.

  //6. Inside this function, { ...prevState, [name]: value } creates a new object 
  //that has all the properties of prevState (the current formData), but 
  //with the property named name (which is "objective") set to value 
  //(whatever the user just typed). This is done using the spread operator ... 
  //and computed property names [name].

  //7. setFormData updates the formData state with this new object. 
  //So now formData.objective is whatever the user just typed.
  return (
    <div>
      <p className = "phase-label"> Scenario Patient Information</p>
      <form className="form-container scenarioContainer">
      <TextareaInputLong label="Scenerio Outline" name="ScenarioOutline.casePresentation" value={formData.ScenarioOutline.casePresentation} onChange={handleChange} />
      </form>

      <form className="form-container objectivesContainer">
      <TextareaInput label="Objective1" name="ScenarioOutline.objectives.objective1" value={formData.ScenarioOutline.objectives.objective1} onChange={handleChange} />
      <TextareaInput label="Objective2" name="ScenarioOutline.objectives.objective2" value={formData.ScenarioOutline.objectives.objective2} onChange={handleChange} />
      <TextareaInput label="Objective3" name="ScenarioOutline.objectives.objective3" value={formData.ScenarioOutline.objectives.objective3} onChange={handleChange} />
      <TextareaInput label="Objective4" name="ScenarioOutline.objectives.objective4" value={formData.ScenarioOutline.objectives.objective4} onChange={handleChange} />
      <TextareaInput label="Objective5" name="ScenarioOutline.objectives.objective5" value={formData.ScenarioOutline.objectives.objective5} onChange={handleChange} />
      </form>

      <form className="form-container patientInfoContainer">
        <FormInput label="Name" type="text" name="ScenarioOutline.patientReport.basicInformation.name" value={formData.ScenarioOutline.patientReport.basicInformation.name} onChange={handleChange} />
        <FormInput label="Age" type="number" name="ScenarioOutline.patientReport.basicInformation.age" value={formData.ScenarioOutline.patientReport.basicInformation.age} onChange={handleChange} />
        <FormInput label="Sex" type="text" name="ScenarioOutline.patientReport.basicInformation.sex" value={formData.ScenarioOutline.patientReport.basicInformation.sex} onChange={handleChange} />
        <FormInput label="Weight" type="number" name="ScenarioOutline.patientReport.basicInformation.weight" value={formData.ScenarioOutline.patientReport.basicInformation.weight} onChange={handleChange} />
        <FormInput label="Diagnosis" type="text" name="ScenarioOutline.patientReport.basicInformation.diagnosis" value={formData.ScenarioOutline.patientReport.basicInformation.diagnosis} onChange={handleChange} />
      </form>

      <form className="form-container historyContainer">
        <TextareaInput label="Symptoms" name="ScenarioOutline.patientReport.history.symptoms" value={formData.ScenarioOutline.patientReport.history.symptoms} onChange={handleChange} />
        <TextareaInput label="Allergies" name="ScenarioOutline.patientReport.history.allergies" value={formData.ScenarioOutline.patientReport.history.allergies} onChange={handleChange} />
        <TextareaInput label="Medications" name="ScenarioOutline.patientReport.history.medications" value={formData.ScenarioOutline.patientReport.history.medications} onChange={handleChange} />
        <TextareaInput label="PMH" name="ScenarioOutline.patientReport.history.pmh" value={formData.ScenarioOutline.patientReport.history.pmh} onChange={handleChange} />
        <TextareaInput label="Last Meal" name="ScenarioOutline.patientReport.history.lastMeal" value={formData.ScenarioOutline.patientReport.history.lastMeal} onChange={handleChange} />
        <TextareaInput label="Events" name="ScenarioOutline.patientReport.history.events" value={formData.ScenarioOutline.patientReport.history.events} onChange={handleChange} />
      </form>

      <form className="form-container initialExamContainer">
        <TextareaInput label="General Appearance" name="ScenarioOutline.patientReport.initialExam.generalAppearance" value={formData.ScenarioOutline.patientReport.initialExam.generalAppearance} onChange={handleChange} />
        <TextareaInput label="Breathing" name="ScenarioOutline.patientReport.initialExam.breathing" value={formData.ScenarioOutline.patientReport.initialExam.breathing} onChange={handleChange} />
        <TextareaInput label="Circulation" name="ScenarioOutline.patientReport.initialExam.circulation" value={formData.ScenarioOutline.patientReport.initialExam.circulation} onChange={handleChange} />
        <TextareaInput label="Abdomen" name="ScenarioOutline.patientReport.initialExam.abdomen" value={formData.ScenarioOutline.patientReport.initialExam.abdomen} onChange={handleChange} />
        <TextareaInput label="Neuro" name="ScenarioOutline.patientReport.initialExam.neuro" value={formData.ScenarioOutline.patientReport.initialExam.neuro} onChange={handleChange} />
        <TextareaInput label="Disability" name="ScenarioOutline.patientReport.initialExam.disability" value={formData.ScenarioOutline.patientReport.initialExam.disability} onChange={handleChange} />
      </form>

      

      {/*The map function is used to create a form for each phase in the phases array
      For each phase, it creates a set of FormInput and TextareaInput*/}
      {/*The index parameter is automatically provided by the map function to reflect
      the current index in the array*/}
      {/*The phase parameter, which is the first argument to the map is also automatically assigned according to the index*/}
      {phases.map((phase, index) => (
        <div key={index}>
          <p className = "phase-label"> Phase {index + 1}</p>

          {/* Render form inputs for phase data here, using index to track which phase is being edited */}
          <form className="form-container phaseContainer">
            <FormInput label="InitialState" type="text" name="initialState" value={phase.initialState} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="HR" type="number" name="vitalSigns.hr" value={phase.vitalSigns.hr} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="RR" type="number" name="vitalSigns.rr" value={phase.vitalSigns.rr} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="Temp" type="number" name="vitalSigns.temp" value={phase.vitalSigns.temp} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="NIBP" type="number" name="vitalSigns.nibp" value={phase.vitalSigns.nibp} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="O2" type="number" name="vitalSigns.o2" value={phase.vitalSigns.o2} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="CO2" type="number" name="vitalSigns.co2" value={phase.vitalSigns.co2} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="Airway" type="text" name="vitalSigns.airway" value={phase.vitalSigns.airway} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="Breathing" type="text" name="vitalSigns.breathing" value={phase.vitalSigns.breathing} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="Circulation" type="text" name="vitalSigns.circulation" value={phase.vitalSigns.circulation} onChange={(e) => handlePhaseChange(index, e)} />
            <FormInput label="Disability" type="text" name="vitalSigns.disability" value={phase.vitalSigns.disability} onChange={(e) => handlePhaseChange(index, e)} />
          </form>

          <form className="form-container stopContainer">
            <TextareaInput label="Ventilation Equipment" name="hardStop.ventilationEquipment" value={phase.hardStop.ventilationEquipment} onChange={(e) => handlePhaseChange(index, e)} />
            <TextareaInput label="Ventilation Technique" name="hardStop.ventilationTechnique" value={phase.hardStop.ventilationTechnique} onChange={(e) => handlePhaseChange(index, e)} />
            <TextareaInput label="Airway Management" name="hardStop.airwayManagement" value={phase.hardStop.airwayManagement} onChange={(e) => handlePhaseChange(index, e)} />
            <TextareaInput label="Mask Positioning" name="hardStop.maskPositioning" value={phase.hardStop.maskPositioning} onChange={(e) => handlePhaseChange(index, e)} />
            <TextareaInput label="Soft Stop" name="softStop" value={phase.softStop} onChange={(e) => handlePhaseChange(index, e)} />
          </form>
        </div>
      ))}
      <button type="button" onClick={addPhase}>Add Phase</button>
      <form onSubmit={handleSubmit}>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default App;
