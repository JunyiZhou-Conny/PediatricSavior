import React, { useState, useEffect } from 'react';
import './InstructionUi.css';

const InstructionUi = () => {
    const [instructionText, setInstructionText] = useState('');
    const [editText, setEditText] = useState('');

    useEffect(() => {
        fetch('/api/instruction-text')
            .then(response => response.text())
            .then(text => {
                setInstructionText(text);
                setEditText(text);  // Initialize edit text with fetched text
            })
            .catch(error => console.error('Failed to load instruction text:', error));
    }, []);

    const handleSave = () => {
        fetch('/api/save-instruction-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: editText })
        })
        .then(response => response.json())
        .then(data => alert('File saved successfully! Please click "Reset Conversation" in the chatbot interface to activate the new instruction.'))
        .catch(error => console.error('Error saving file:', error));
    };

    return (
        <div className="instruction-container">
            <textarea className="text-area" value={editText} onChange={(e) => setEditText(e.target.value)} />
            <button className="save-button" onClick={handleSave}>Save</button>
        </div>
    );
};

export default InstructionUi;
