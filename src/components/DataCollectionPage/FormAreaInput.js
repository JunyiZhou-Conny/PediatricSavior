import React from 'react';
import "./DataCollectionPage.css"

const FormInput = ({ size, label, type, name, value, onChange }) => {
  return (
    <div className="profile-group">
      <label>{label}</label>
      <input className='profile-input'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
