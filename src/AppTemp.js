// React immports
import React, { useState } from 'react';
import './styles.css';

// Component imports
import SideButton from './components/SideButton/SideButton';
import DataCollectionPage from './components/DataCollectionPage/DataCollectionPage';
import ChatbotUi from './components/ChatbotUi/ChatbotUi';

// Authentication/LogIn imports
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/LogIn/LogIn';
import LogoutButton from './components/Auth/LogOut/LogOut';

const App = () => {
  const [activeInterface, setActiveInterface] = useState('ChatbotUi');
  return (
    <div className="App">
      <header className="App-header">
        <h2>Pediatric Airway Management Assistant</h2>
        <div style={{ marginLeft: 'auto' }} align="right">
          <LoginButton />
        </div>
      </header>
      <div className="app-body">
        <div className="sidebar">
          <SideButton value={'Airway Management Assistant'} onClick={() => setActiveInterface('ChatbotUi')} />
          <SideButton value={'Data Collection Assistant'} onClick={() => setActiveInterface('DataCollectUi')} />
        </div>
        <div className="chat-container">
          {activeInterface === 'ChatbotUi' ? <ChatbotUi /> : <DataCollectionPage />}
        </div>
      </div>
    </div>
  );
};

export default App;
