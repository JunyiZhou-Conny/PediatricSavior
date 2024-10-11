import React, { useState, useEffect } from 'react';
import './CaseEditor.css';

const CaseEditor = () => {
    const [cases, setCases] = useState([]);
    const [activeCase, setActiveCase] = useState(null);  // Track the case being edited
    const [caseData, setCaseData] = useState(null);  // Holds data of the case being edited
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingCase, setIsAddingCase] = useState(false);
    const [newCaseData, setNewCaseData] = useState({
        'Scenario Outline': '',
        'Patient Report': {
            'Basic Information': '',
            'History': '',
            'Initial Exam': '',
            'Labs': '',
            'PMH': ''
        },
        'Phase 1': {
            'Expected Actions': '',
            'General Description': '',
            'Vitals and Conditions': '',
        },
        'Phase 2': {
            'Expected Actions': '',
            'General Description': '',
            'Vitals and Conditions': '',
        },
        'Phase 3': {
            'Expected Actions': '',
            'General Description': '',
            'Vitals and Conditions': '',
        },
        'Final Phase': {
            'Expected Actions': '',
            'General Description': '',
            'Vitals and Conditions': '',
        }
    });

    // Fetch the list of cases
    const fetchCases = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_cases`);
            const data = await response.json();
            setCases(data.cases);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching cases:', error);
        }
    };

    // Fetch cases when the component mounts (or when the tab is selected)
    useEffect(() => {
        fetchCases();  // Ensure fetchCases is called whenever the component is rendered
    }, []);  // Empty dependency array ensures it runs once when the component is mounted

    // Fetch a specific case when the user selects it
    const fetchCase = async (caseId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_case/${caseId}`);
            const data = await response.json();
            const list = data.data;

            // Convert the list back into a dictionary (includes all information)
            const caseDict = convertListToDict(list);
            setCaseData(caseDict);  // Store the case data as a dictionary
            setActiveCase(caseId);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching case:', error);
        }
    };

    // Convert the list of key-value pairs into a dictionary
    const convertListToDict = (list) => {
        const dict = {};
        list.forEach(item => {
            dict[item.key] = item.value;
        });
        return dict;
    };

    // Handle changes in input fields
    const handleInputChange = (e, key, parentKey = null) => {
        const newData = { ...caseData };
        if (parentKey) {
            newData[parentKey][key] = e.target.value;
        } else {
            newData[key] = e.target.value;
        }
        setCaseData(newData);
    };

    // Recursively render fields and titles for the case data
    const renderFields = (data, parentKey = null, depth = 0) => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            if (key === '_id') {
                return null;
            }
            // Render a text field for string values
            if (typeof value === 'string') {
                return (
                    <div className="field-container" key={key}>
                        <h4>{key}</h4>
                        <textarea
                            value={value}
                            onChange={(e) => handleInputChange(e, key, parentKey)}
                            rows="4"
                            className="text-box"
                        />
                    </div>
                );
            }

            // If the value is an object and we're at depth 0, render subsections
            if (typeof value === 'object' && value !== null && depth < 1) {
                return (
                    <div className="section-container" key={key}>
                        <h3>{key}</h3>
                        <div className="subsection">
                            {renderFields(value, key, depth + 1)}  {/* Recurse one more level */}
                        </div>
                    </div>
                );
            }

            // If we're at depth 1 (subsection), render a single textbox for further nested objects or string
            if (typeof value === 'object' && value !== null && depth === 1) {
                return (
                    <div className="field-container" key={key}>
                        <h4>{key}</h4>
                        <textarea
                            value={JSON.stringify(value, null, 2)}  // Convert the object to string for editing
                            onChange={(e) => handleInputChange(e, key, parentKey)}
                            rows="6"
                            className="text-box"
                        />
                    </div>
                );
            }

            return null;
        });
    };


    // Save the updated case data
    const handleSave = async () => {
        try {
            const { _id, ...updatedCaseData } = caseData;  // Exclude the _id field

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update_case/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCaseData),  // Send updated data without _id
            });

            const data = await response.json();
            if (data.success) {
                alert('Case updated successfully!');
                setActiveCase(null);  // Return to case list after saving
                fetchCases();  // Refresh the list of cases
            } else {
                console.error('Update failed:', data.error);
            }
        } catch (error) {
            console.error('Error updating case:', error);
        }
    };

    // Cancel editing and return to case list
    const handleCancel = () => {
        setActiveCase(null);
        setCaseData(null);
    };

    // Add this new function to handle case deletion
    const handleDeleteCase = async (caseId) => {
        if (window.confirm("Are you sure you want to delete this case? This action cannot be undone.")) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete_case/${caseId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (data.success) {
                    alert('Case deleted successfully!');
                    fetchCases();  // Refresh the list of cases
                } else {
                    console.error('Deletion failed:', data.error);
                    alert('Failed to delete the case. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting case:', error);
                alert('An error occurred while deleting the case. Please try again.');
            }
        }
    };

    const handleAddCase = () => {
        setIsAddingCase(true);
        setNewCaseData({
            'Scenario Outline': '',
            'Patient Report': {
                'Basic Information': '',
                'History': '',
                'Initial Exam': '',
                'Labs': '',
                'PMH': ''
            },
            'Phase 1': {
                'Expected Actions': '',
                'General Description': '',
                'Vitals and Conditions': '',
            },
            'Phase 2': {
                'Expected Actions': '',
                'General Description': '',
                'Vitals and Conditions': '',
            },
            'Phase 3': {
                'Expected Actions': '',
                'General Description': '',
                'Vitals and Conditions': '',
            },
            'Final Phase': {
                'Expected Actions': '',
                'General Description': '',
                'Vitals and Conditions': '',
            }
        });
    };

    const handleNewCaseInputChange = (e, key, nestedKey = null) => {
        const value = e.target.value;
        setNewCaseData(prevData => {
            if (nestedKey) {
                return {
                    ...prevData,
                    [key]: {
                        ...prevData[key],
                        [nestedKey]: value
                    }
                };
            }
            return { ...prevData, [key]: value };
        });
    };

    const handleSubmitNewCase = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add_case`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCaseData),
            });
            const data = await response.json();
            if (data.success) {
                alert('New case added successfully!');
                setIsAddingCase(false);
                fetchCases();  // Refresh the list of cases
            } else {
                console.error('Failed to add new case:', data.error);
                alert('Failed to add new case. Please try again.');
            }
        } catch (error) {
            console.error('Error adding new case:', error);
            alert('An error occurred while adding the new case. Please try again.');
        }
    };

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    // If a case is selected, show the edit form
    if (activeCase) {
        return (
            <div className="edit-case-container">
                <h3>Edit Case: {caseData?._id}</h3>
                <div className="content">
                    {renderFields(caseData)}
                </div>
                <button onClick={handleSave} className="save-button">Save Changes</button>
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
            </div>
        );
    }

    // Show the case list if no case is selected
    return (
        <div className="case-editor-container">
            <h3>Available Cases</h3>
            <button onClick={handleAddCase} className="add-case-button">Add New Case</button>
            {isAddingCase ? (
                <div className="add-case-form">
                    <h4>Add New Case</h4>
                    <input
                        type="text"
                        value={newCaseData['Scenario Outline']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Scenario Outline')}
                        placeholder="Scenario Outline"
                    />
                    <h5>Patient Report</h5>
                    <textarea
                        value={newCaseData['Patient Report']['Basic Information']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Patient Report', 'Basic Information')}
                        placeholder="Basic Information"
                    />
                    <textarea
                        value={newCaseData['Patient Report']['History']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Patient Report', 'History')}
                        placeholder="History"
                    />
                    <textarea
                        value={newCaseData['Patient Report']['Initial Exam']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Patient Report', 'Initial Exam')}
                        placeholder="Initial Exam"
                    />
                    <textarea
                        value={newCaseData['Patient Report']['Labs']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Patient Report', 'Labs')}
                        placeholder="Labs"
                    />
                    <textarea
                        value={newCaseData['Patient Report']['PMH']}
                        onChange={(e) => handleNewCaseInputChange(e, 'Patient Report', 'PMH')}
                        placeholder="PMH"
                    />
                    {['Phase 1', 'Phase 2', 'Phase 3', 'Final Phase'].map((phase) => (
                        <div key={phase}>
                            <h5>{phase}</h5>
                            <textarea
                                value={newCaseData[phase]['Expected Actions']}
                                onChange={(e) => handleNewCaseInputChange(e, phase, 'Expected Actions')}
                                placeholder="Expected Actions"
                            />
                            <textarea
                                value={newCaseData[phase]['General Description']}
                                onChange={(e) => handleNewCaseInputChange(e, phase, 'General Description')}
                                placeholder="General Description"
                            />
                            <textarea
                                value={newCaseData[phase]['Vitals and Conditions']}
                                onChange={(e) => handleNewCaseInputChange(e, phase, 'Vitals and Conditions')}
                                placeholder="Vitals and Conditions"
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmitNewCase}>Submit New Case</button>
                    <button onClick={() => setIsAddingCase(false)}>Cancel</button>
                </div>
            ) : (
                <div className="case-list">
                    {cases.map((caseItem, index) => (
                        <div key={index} className="case-item">
                            <div onClick={() => fetchCase(caseItem._id)}>
                                <p>Case ID: {caseItem._id}</p>
                                <p>{caseItem['Scenario Outline'].substring(0, 100) + " ..."}</p>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCase(caseItem._id);
                                }}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaseEditor;
