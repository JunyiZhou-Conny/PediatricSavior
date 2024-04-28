import React, { useState, useEffect, useRef } from 'react';
//import './ChatbotUi.css'; // Assuming this is your styling
import './ChatHistoryStyle.css'; // Additional styling if needed

export default function GetChatHistory() {
    const [participantID, setParticipantID] = useState('');
    const [conversations, setConversations] = useState([]);
    const [conv_list, setConv_list] = useState([]);
    const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatWindowRef = useRef(null);

    const handleInputChange = (e) => {
        setParticipantID(e.target.value);
        setError(''); // Reset error message on new input
    };

    const fetchHistory = () => {
        setIsLoading(true);
        if (!participantID) {
            setError('Please enter a valid participant ID.');
            return;
        }
        fetch(`http://localhost:4999/get-conversation-history/${participantID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No history found for this ID');
                }
                return response.json();
            })
            .then(data => {
                if (!data.conversationHistory || data.conversationHistory.length === 0) {
                    throw new Error('No conversation history available');
                }
                console.log(data)
                setConv_list(data.conversationHistory)
                setCurrentConversationIndex(0); // Reset to the first conversation
                setConversations(data.conversationHistory[currentConversationIndex]);
                setIsLoading(false);
                console.log(conversations)
            })
            .catch(error => {
                console.error('Error fetching conversation history:', error);
                setError(error.message);
                setConversations([]);
                setCurrentConversationIndex(0);
                setIsLoading(false);
            });
    };

    const handlePrev = () => {
        setCurrentConversationIndex(prev => Math.max(0, prev - 1));
        setConversations(conv_list[currentConversationIndex])
    };

    const handleNext = () => {
      setIsLoading(true)
      console.log("# of conversations: " + conv_list.length)
      console.log("Index before change: " + currentConversationIndex)
      setCurrentConversationIndex(prev => {
          const newIndex = Math.min(conv_list.length, prev + 1); // Assuming you want to stay within the bounds
          console.log("Index after change: " + newIndex); // Now newIndex holds the updated value
  
          // Perform operations that depend on the updated index
          setConversations(conv_list[newIndex]); // Now using the correct, updated index value
  
          return newIndex; // Return the new index to update the state
      });
      setIsLoading(false); // This might need to move or be handled differently based on when loading is truly complete
  };

    useEffect(() => {
        const chatWindow = chatWindowRef.current;
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }, [conversations, currentConversationIndex]);

    return (
        <div>
            <div className="input-area">
                <input
                    className='id-search-box'
                    type="text"
                    value={participantID}
                    onChange={handleInputChange}
                    placeholder="Enter Participant ID"
                />
                <button onClick={fetchHistory}>Fetch History</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {/* {conv_list.length > 0 && (
                <div className="navigation">
                    <button onClick={handlePrev} disabled={currentConversationIndex === 0}>Prev</button>
                    <button onClick={handleNext} disabled={currentConversationIndex === conv_list.length}>Next</button>
                </div>
            )} */}
            <div className="chat-window" ref={chatWindowRef}>
                {isLoading ? (
                    <div>Loading conversation history...</div>
                ) : conv_list.length > 0 ? (
                    conversations.history.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.type === 'text' ? <div className="formatted-text">{msg.text}</div> : <img src={msg.text} alt="Chatbot response" className="chat-image" />}
                        </div>
                    ))
                ) : (
                    <div>No history available</div>
                )}
            </div>
        </div>
    );
}
