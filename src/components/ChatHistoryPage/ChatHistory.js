import React from 'react';
import './ChatHistoryStyle.css'; // Make sure the CSS file path matches


const ChatHistory = () => {
  // Placeholder data to simulate filter inputs and log entries
  return (
    <div className="chat-history">
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by Case ID"
        />
        <input
          type="text"
          placeholder="Filter by Resident ID"
        />
      </div>
      <div className="logs">
        {/* Placeholder for log entries */}
        <div className="log-entry">
          <p><strong>Case ID:</strong> 12345</p>
          <p><strong>Resident ID:</strong> 67890</p>
          <p>Example chat log message goes here...</p>
        </div>
        {/* Repeat the div above for more placeholders */}
      </div>
    </div>
  );
};

export default ChatHistory;