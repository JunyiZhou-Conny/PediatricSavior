import React, { useState, useEffect, useRef  } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './ChatbotUi.css';

export default function ChatbotUi(){

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const fetchImage = (id) => {
      // Example fetch request to your backend endpoint that serves the image
      fetch(`http://localhost:4999/get-image/${id}`)
          .then(response => response.json())
          .then(data => {
              const botMessage = { id: Date.now(), text: data.image, sender: 'bot', type: 'image' };
              setMessages(prevMessages => [...prevMessages, botMessage]);
          })
          .catch(error => console.error('Error fetching the image:', error))
          .finally(() => setIsLoading(false));
  };

    const ExampleComponent = ({fetchMessage}) => {
      return (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            fetchMessage,
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '1em', display: 'inline-block' }}
          repeat={1}
        />
      );
    };
  
    const handleUserInput = (e) => {
      setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userInput.trim() === "") {
          return;
      }
      setIsLoading(true); // Start loading
      const userMessage = { id: Date.now(), text: userInput, sender: 'user', type: 'text' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      //Send user input to backend and wait for the response
      fetch('http://localhost:4999/submit-user-input', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: userInput })
      })
      .then(response => response.json())
      .then(data => {
          // After receiving the response from submit, fetch the message
          fetchMessage();
      })
      .catch(error => console.error('There was an error!', error))
      .finally(() => setIsLoading(false));
      setUserInput('');
  };
  
  const fetchMessage = () => {
    fetch('http://localhost:4999/get-message')
        .then(response => response.json())
        .then(data => {
            const messageText = data.message;
            const botMessage = { id: Date.now(), text: messageText, sender: 'bot', type: 'text' };

            const match = messageText.match(/Related image found, image id is (\d+)/);
            const instruction_match = messageText.match(/Instruction image found, image id is (\d+)/);
            if (match) {
                console.log("User image search requested")
                const imageId = match[1]; // Extract the ID from the message
                fetchImage(imageId); // Call fetchImage with the extracted ID
            } else if (instruction_match) {
                console.log("Bot instruction image search requested")
                setMessages(prevMessages => [...prevMessages, botMessage]);
                const imageId = instruction_match[1];
                fetchImage(imageId);
            } else {
                console.log("Normal Response")
                // If no specific pattern is detected, just add the message as usual
                setMessages(prevMessages => [...prevMessages, botMessage]);
            }
        })
        .catch(error => console.error('There was an error fetching the message!', error));
  };

  
  const initializeChat = () => {
    fetch('http://localhost:4999/init-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Chat initialized:", data);
        // Optionally update the UI with a welcome message or other initial state
        const botMessage = { id: Date.now(), text: 'Please type "Begin Simulation" to begin', sender: 'bot', type: 'text' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
    })
    .catch(error => {
        console.error('Error initializing chat:', error);
    });
};

    // Initialize chat on component mount
    useEffect(() => {
        initializeChat();
    }, []);
  
    const chatWindowRef = useRef(null);
    useEffect(() => {
      const chatWindow = chatWindowRef.current;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    return (
      <div>
          <div className="chat-window" ref={chatWindowRef}>
              {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                      {msg.type === 'text' ? msg.text : <img src={msg.text} alt="Chatbot response" className="chat-image"/>}
                  </div>
              ))}
              {isLoading && <div className="loading-message">Generating response...</div>}
          </div>
          <form className="chat-bot-form" onSubmit={handleSubmit}>
              <input type="text" value={userInput} onChange={handleUserInput} placeholder="Say something..." />
              <button type="submit">Send</button>
          </form>
      </div>
  );
}
