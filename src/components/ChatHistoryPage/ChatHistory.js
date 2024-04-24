import React, { useState } from 'react';
import './ChatHistoryStyle.css';

const ChatHistory = () => {
  const [participantID, setParticipantID] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');

  const handleParticipantIDChange = (event) => {
    setParticipantID(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const fetchChatHistory = async () => {
    setError('');
    if (!participantID) {
      setError('Please enter a participant ID.');
      return;
    }
    try {
      const response = await fetch(`/chat-history/${participantID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Raw data:", data);
  
      // Flatten the conversation groups into a single array
      const conversations = data.flatMap(group => group.conversations);
      console.log("Conversations:", conversations);
  
      // Transform data to group messages by their date
      const conversationsByDate = conversations.reduce((acc, entry) => {
        const timestamp = entry.timestamp?.$date;
        const date = timestamp ? new Date(timestamp).toDateString() : 'Invalid date';
  
        if (!acc[date]) {
          acc[date] = {
            date: date,
            messages: [],
          };
        }
  
        // Add the messages in reverse order: bot_response followed by user_input
  if (entry.bot_response) {
    acc[date].messages.unshift({ speaker: 'Bot', message: entry.bot_response });
  }
  if (entry.user_input) {
    acc[date].messages.unshift({ speaker: 'User', message: entry.user_input });
  }
  
        return acc;
      }, {});
  
      // Convert the object into an array and sort by date
      let sortedConversations = Object.values(conversationsByDate)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Filter the conversations by the selected date if dateFilter is set
      if (dateFilter) {
        sortedConversations = sortedConversations.filter((entry) =>
          new Date(entry.date).toDateString() === new Date(dateFilter).toDateString()
        );
      }
  
      setChatHistory(sortedConversations);
    } catch (e) {
      console.error('Failed to fetch chat history:', e);
      setError('Failed to fetch chat history. Please try again.');
    }
  };

  return (
    <div className="chat-history">
      <div className="filter">
        <input
          type="text"
          placeholder="Participant ID"
          value={participantID}
          onChange={handleParticipantIDChange}
        />
        <input
          type="date"
          placeholder="Filter by date"
          value={dateFilter}
          onChange={handleDateChange}
        />
        <button onClick={fetchChatHistory}>Fetch History</button>
        {/* The download button implementation remains unchanged */}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="logs-header">
        <strong>History Logs</strong>
      </div>
      <div className="logs">
        {chatHistory.length > 0 ? chatHistory.map((day, index) => (
          <div key={index} className="daily-conversation" style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
            <div className="date-header">{day.date}</div>
            {day.messages.map((msg, msgIndex) => (
              <div key={msgIndex} className="message">{msg.speaker}: {msg.message}</div>
            ))}
          </div>
        )) : (
          <p>No chat history available for this participant ID.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
