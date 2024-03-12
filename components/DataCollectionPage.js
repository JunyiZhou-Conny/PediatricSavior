import React, { useState } from 'react';
import FormInput from './FormAreaInput';
import TextareaInput from './TextAreaInput';
import './DataCollectionPage.css';

const App = () => {
  const [formData, setFormData] = useState({
    objective: '',
    name: '',
    age: '',
    sex: '',
    weight: '',
    diagnosis: '',
    scenario: '',
    medicalHistory: '',
    scenarios: '',
  });

  const [phaseData, setPhaseData] = useState({
    hr: '',
    rr: '',
    temp: '',
    nibp: '',
    o2: '',
    additional_info: '',
    hard_stop: '',
    soft_stop: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhaseChange = (e) => {
    const { name, value } = e.target;
    setPhaseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const combinedData = {
      ...formData,
      phaseData: { ...phaseData }
    };    

    try {
      const response = await fetch('http://localhost:3000/api/patient-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="dataCollectionContainer">
        {/* All inputs go here */}
        <TextareaInput label="Objectives" name="objective" value={formData.objective} onChange={handleChange} />
        {/* Repeat for other inputs, combining what was previously in separate forms */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default App;
