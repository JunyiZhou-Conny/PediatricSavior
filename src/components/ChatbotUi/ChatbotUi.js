import React, { useState, useEffect, useRef } from 'react';
import './ChatbotUi.css';

export default function ChatbotUi() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Ref to scroll the chat window
  const chatWindowRef = useRef(null);

  // Scroll to the bottom every time messages update
  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  // Handle user input change
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") {
      return;
    }
    
    // Check if the user wants to end the conversation
    if (userInput.trim().toLowerCase() === "conversation done") {
      exportConversation();
      setUserInput('');
      return; // Stop further execution
    }

    // Normal message handling
    const newMessage = { id: Date.now(), text: userInput, sender: 'user' };
    const botResponse = { id: Date.now() + 1, text: `Bot's response to "${userInput}"`, sender: 'bot' };
    
    setMessages((prevMessages) => [...prevMessages, newMessage, botResponse]);
    setUserInput('');
  };

  // Function to export the conversation
  const exportConversation = () => {
    const conversationJSON = JSON.stringify(messages, null, 2);
    console.log("Exported Conversation:", conversationJSON);
    // Here, you can further handle the exported conversation
    // like saving to a file, sending to a server, etc.
  };

  return (
    <div>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-bot-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Say something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
