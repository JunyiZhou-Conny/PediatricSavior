import React from 'react';
import './SideButton.css';

function SideButton({ value, onClick }) {
    return (
      <button className='sideButton' onClick={onClick}>
        {value}
      </button>
    );
  }

    export default SideButton;