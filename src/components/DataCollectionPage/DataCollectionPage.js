import React, { useState } from 'react';
import FormInput from './FormAreaInput';
import TextareaInput from './TextAreaInput';
import './DataCollectionPage.css'

const App = () => {
  const [formData, setFormData] = useState({
    objective:'',
    name: '',
    age: '',
    sex: '',
    weight: '',
    diagnosis: '',
    scenerio: '',
    medicalHistory: '',
    scenarios: '',
  });

  const [phaseData, setphaseData] = useState({
    hr:'',
    rr: '',
    temp: '',
    nibp: '',
    o2: '',
    addional_info: '',
    hard_stop: '',
    soft_stop: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhaseChange = (e) => {
    const { name, value } = e.target;
    setphaseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here, you would typically send the formData to your server
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="scenerioContainer">
        <TextareaInput label="Objectives" name="objective" value={formData.objectice} onChange={handleChange} />
      </form>
      <form onSubmit={handleSubmit} className="profileContainer">
        <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <FormInput label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
        <FormInput label="Sex" type="text" name="sex" value={formData.sex} onChange={handleChange} />
        <FormInput label="Weight" type="text" name="weight" value={formData.weight} onChange={handleChange} />
        <FormInput label="Diagnosis" type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
      </form>

      <form onSubmit={handleSubmit} className="scenerioContainer">
      <TextareaInput label="Scenerio Outline" name="scenerio" value={formData.scenerio} onChange={handleChange} />
      </form>
      <p>Phase 1</p>
      <form onSubmit={handleSubmit} className="profileContainer">
        <FormInput label="HR" type="number" name="hr" value={phaseData.hr} onChange={handlePhaseChange} />
        <FormInput label="RR" type="number" name="rr" value={phaseData.rr} onChange={handlePhaseChange} />
        <FormInput label="Temp" type="number" name="temp" value={phaseData.temp} onChange={handlePhaseChange} />
        <FormInput label="NIBP" type="text" name="nibp" value={phaseData.nibp} onChange={handlePhaseChange} />
        <FormInput label="O2" type="number" name="o2" value={phaseData.o2} onChange={handlePhaseChange} />
      </form>
      <form onSubmit={handleSubmit} className="scenerioContainer">
          <TextareaInput label="Addional INFO" name="addional_info" value={phaseData.addional_info} onChange={handlePhaseChange} />
          <TextareaInput label="Hard Stop" name="hard_stop" value={phaseData.hard_stop} onChange={handlePhaseChange} />
          <TextareaInput label="Soft Stop" name="soft_stop" value={phaseData.soft_stop} onChange={handlePhaseChange} />
      </form>
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );
};

export default App;
