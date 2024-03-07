import React from 'react';

const TextareaInput = ({ size, label, name, value, onChange, className, placeholder }) => {
  const getSizeClassName = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'medium':
        return 'medium';
      case 'large':
        return 'large';
      default:
        return '';
    }
  };

  return (
    <div className={`form-group ${getSizeClassName()} ${className}`}>
      <label>{label}</label>
      <textarea
        name={name}
        value={value} // Use value prop for controlled input
        onChange={onChange}
        placeholder={placeholder}
        className="case-input"
        rows="3"
      ></textarea>
    </div>
  );
};

export default TextareaInput;
