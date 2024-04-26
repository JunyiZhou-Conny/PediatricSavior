import React, { useState, useEffect, useRef  } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './ChatbotUi.css';

export default function ChatbotUi(){

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading for text generation
    const [loading, setLoading] = useState(false); //Loading for initalization



    const handleResetConversation = () => {
        // Call backend to reset the conversation
        fetch('http://localhost:4999/reset-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Conversation reset successfully');
                setMessages([]); // Clear the messages array in frontend
                setUserInput(""); // Clear the input field if needed
                initializeChat(); // Initialize the conversation after reset
            } else {
                console.error('Failed to reset the conversation');
            }
        })
        .catch(error => console.error('Error resetting the conversation:', error));
    };
    

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
            //const formattedText = `<pre>${messageText}</pre>`;
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
    setLoading(true);
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
    })
    .then(
        setTimeout(() => {
            setLoading(false); // Stop showing the loading bar after 5 seconds
        }, 5000))
    .then(data => {
        const botMessage = { id: Date.now(), text: 'Please type "Begin Simulation" to begin', sender: 'bot', type: 'text' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
    })
    .catch(error => {
        console.error('Error initializing chat:', error);
    });
};

    // // Initialize chat on component mount
    // useEffect(() => {
    //     initializeChat();
    // }, []);
  
    const chatWindowRef = useRef(null);
    useEffect(() => {
      const chatWindow = chatWindowRef.current;
      chatWindow.scrollTop = chatWindow.scrollHeight;
      sessionStorage.setItem('abc', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {

        console.log(savedMessages)
        if (savedMessages) {
            console.log('Not first visit')
            setMessages(JSON.parse(savedMessages));
        }else{
            console.log('first visit')
            handleResetConversation();
        }
    }, []);
    const savedMessages = sessionStorage.getItem('abc')

    return (
        <div>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        {msg.type === 'text' ? <div className="formatted-text">{msg.text}</div> : <img src={msg.text} alt="Chatbot response" className="chat-image"/>}
                    </div>
                ))}
                {isLoading && <div className="loading-message">Generating response </div>}
            </div>
            <form className="chat-bot-form" onSubmit={handleSubmit}>
                {loading ? (
                    <div className="loading-bar">Chatbot Initializing ... </div>
                ) : (
                    <>
                        <input type="text" className='user-input'value={userInput} onChange={handleUserInput} placeholder="Say something..." />
                        <button type="submit" >Send</button>
                        <button type="button" className='reset-buttom'onClick={handleResetConversation}>Reset Conversation</button>
                    </>
                )}
            </form>
        </div>
      );
      
}
