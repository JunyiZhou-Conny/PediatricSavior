import React from 'react';
import './DataCollectionPage.css'

const TextAreaInputLong = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        className="case-input-long"
        rows="3"
      ></textarea>
    </div>
  );
};

export default TextAreaInputLong;
