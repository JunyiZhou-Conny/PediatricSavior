import React, { useState, useEffect } from 'react';
import './ChatHistoryStyle.css';

export default function ChatHistory() {
    const [participantID, setParticipantID] = useState('');
    const [conversations, setConversations] = useState([]);
    const [recentCases, setRecentCases] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecentCases();
    }, []);

    const fetchRecentCases = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-last-cases`);
            if (!response.ok) throw new Error('Failed to fetch recent cases');
            const data = await response.json();
            setRecentCases(data);
        } catch (error) {
            console.error('Error fetching recent cases:', error);
            setError('Failed to load recent cases');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setParticipantID(e.target.value);
        setError('');
    };

    const fetchHistory = async (id = participantID) => {
        setIsLoading(true);
        setError('');
        setIsSearching(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-conversation-history/${id}`);
            if (!response.ok) throw new Error('Error fetching conversation history');

            const data = await response.json();
            if (!data.conversationHistory || data.conversationHistory.length === 0) {
                setError('Invalid ID. Please enter a valid participant ID');
                setConversations([]);
            } else {
                setConversations(data.conversationHistory);
                setParticipantID(id);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Invalid ID. Please enter a valid participant ID');
            setConversations([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        setIsSearching(false);
        setParticipantID('');
        setConversations([]);
        setError('');
    };

    const handleCaseClick = (id) => {
        fetchHistory(id);
    };

    return (
        <div className="chat-history-container">
            {!isSearching ? (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            value={participantID}
                            onChange={handleInputChange}
                            placeholder="Enter Participant ID"
                        />
                        <button onClick={() => fetchHistory()}>Search</button>
                    </div>
                    <h2 className="recent-cases-title">Recent Cases</h2>
                    <table className="cases-table">
                        <thead>
                            <tr>
                                <th>Participant ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {recentCases.length > 0 ? (
                                recentCases.map((caseItem) => (
                                    <tr key={caseItem.participantID}>
                                        <td>{caseItem.participantID}</td>
                                        <td>{new Date(caseItem.timestamp).toLocaleDateString()}</td>
                                        <td>{new Date(caseItem.timestamp).toLocaleTimeString()}</td>
                                        <td>
                                            <button onClick={() => handleCaseClick(caseItem.participantID)}>
                                                View History
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{textAlign: 'center'}}>No past cases available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="conversation-view">
                    <div className="conversation-header">
                        <h2>Conversation ID: {participantID}</h2>
                        <button onClick={handleGoBack}>Go Back</button>
                    </div>
                    {error ? (
                        <div className="error-message">{error}</div>
                    ) : isLoading ? (
                        <div>Loading...</div>
                    ) : conversations.length > 0 ? (
                        <div className="chat-window">
                            {conversations.map((conv, index) => (
                                <div key={index} className="conversation-group">
                                    <h3>Time: {new Date(conv.timestamp).toLocaleString()}</h3>
                                    {conv.history.map((msg, msgIndex) => (
                                        <div key={msgIndex} className={`message ${msg.sender}`}>
                                            {msg.type === 'text' ? (
                                                <div className="formatted-text">{msg.text}</div>
                                            ) : (
                                                <img src={msg.text} alt="Chatbot response" className="chat-image" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
