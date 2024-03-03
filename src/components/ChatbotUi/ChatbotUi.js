import React, { useState, useEffect, useRef  } from 'react';
import './ChatbotUi.css';

export default function ChatbotUi(){

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
  
    const handleUserInput = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(userInput === ""){
        return;
      }
      const newMessage = { id: Date.now(), text: userInput, sender: 'user' };
      //setMessages([...messages, newMessage]);
      
      const botResponse = { id: Date.now() + 1, text: `Bot's response`, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, newMessage, botResponse]);
      setUserInput('');
    };
  
    const chatWindowRef = useRef(null);
    useEffect(() => {
      const chatWindow = chatWindowRef.current;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    return(
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
