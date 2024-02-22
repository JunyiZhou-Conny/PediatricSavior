import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { id: Date.now(), text: userInput, sender: 'user' };
    setMessages([...messages, newMessage]);
    
    // Simple chatbot response
    const botResponse = { id: Date.now() + 1, text: `${userInput} likes to eat shit`, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newMessage, botResponse]);
    setUserInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Chatbottt</h2>
      </header>
      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
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
};

export default App;
