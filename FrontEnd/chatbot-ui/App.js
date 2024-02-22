import React, { useState, useEffect, useRef  } from 'react';
import './styles.css';

function SideButton({ value }) {
  return (
    <button className='sideButton'>
      {value}
    </button>
  );
}

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { id: Date.now(), text: userInput, sender: 'user' };
    //setMessages([...messages, newMessage]);
    
    const botResponse = { id: Date.now() + 1, text: `You said: "${userInput}"`, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newMessage, botResponse]);
    setUserInput('');
  };

  const chatWindowRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat window
    const chatWindow = chatWindowRef.current;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pideatric Airway Management Assistant</h2>
      </header>
      <div className="app-body">
        <div className="sidebar">
          <SideButton value={'Pideatric Airway Management Assistant'} />
          <SideButton value={'Data Collection Assistant'} />
        </div>
        <div className="chat-container">
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
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
      </div>
    </div>
  );
};

export default App;