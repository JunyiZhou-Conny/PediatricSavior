const TextAreaInput = ({ size, label, name, value, onChange }) => {
  let className = 'case-input';

  // Determine the class based on the size prop
  if (size === 'small') {
    className += ' small';
  } else if (size === 'medium') {
    className += ' medium';
  } else if (size === 'large') {
    className += ' large';
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        rows="3"
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
