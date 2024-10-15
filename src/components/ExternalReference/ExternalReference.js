import React, { useState, useEffect } from 'react';
import './ExternalReference.css';

const KnowledgeManagement = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ overview: '', detail: '' });
    const [isEditing, setIsEditing] = useState(null);

    // Fetch all entries from the backend
    const fetchEntries = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_entries`);
            const data = await response.json();
            setEntries(data.entries);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    // Handle input change for adding/editing entries
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'overview' ? value.toUpperCase() : value;
        setNewEntry((prevEntry) => ({ ...prevEntry, [name]: updatedValue }));
    };

    // Create or Update Entry
    const handleSaveEntry = async () => {
        const method = isEditing !== null ? 'PUT' : 'POST';
        const endpoint = isEditing !== null 
            ? `${process.env.REACT_APP_BACKEND_URL}/update_entry/${isEditing}`
            : `${process.env.REACT_APP_BACKEND_URL}/add_entry`;

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });

            const data = await response.json();
            if (response.ok) {
                if (isEditing !== null) {
                    setEntries(entries.map(entry => entry._id === isEditing ? data.entry : entry));
                } else {
                    setEntries([...entries, data.entry]);
                }
                setNewEntry({ overview: '', detail: '' });
                setIsEditing(null);
            } else {
                console.error('Save failed:', data.error);
            }
        } catch (error) {
            console.error('Error saving entry:', error);
        }
    };

    // Delete an Entry
    const handleDeleteEntry = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete_entry/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEntries(entries.filter(entry => entry._id !== id));
            } else {
                const data = await response.json();
                console.error('Delete failed:', data.error);
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    // Edit an Entry
    const handleEditEntry = (entry) => {
        setNewEntry({ overview: entry.overview, detail: entry.detail });
        setIsEditing(entry._id);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="knowledge-management-container">
            <h3>Knowledge Management Interface</h3>
            <div className="entry-form">
                <input
                    type="text"
                    name="overview"
                    value={newEntry.overview}
                    onChange={handleInputChange}
                    placeholder="Overview"
                    className="input-field"
                />
                <textarea
                    name="detail"
                    value={newEntry.detail}
                    onChange={handleInputChange}
                    placeholder="Detail"
                    className="input-field"
                />
                <button onClick={handleSaveEntry}>
                    {isEditing !== null ? 'Update Entry' : 'Add Entry'}
                </button>
            </div>

            <h3>Existing Entries</h3>
            <div className="entry-list">
                {entries.map((entry) => (
                    <div key={entry._id} className="entry-item">
                        <h4>Overview: {entry.overview}</h4>
                        <p>Detail: {entry.detail}</p>
                        <div className="entry-controls">
                            <button onClick={() => handleEditEntry(entry)}>Edit</button>
                            <button onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeManagement;
