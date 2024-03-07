
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/LogIn/LogIn';
import LogoutButton from './components/Auth/LogOut/LogOut';
import SideButton from './components/SideButton/SideButton';
import DataCollectionPage from './components/DataCollectionPage/DataCollectionPage';
import ChatbotUi from './components/ChatbotUi/ChatbotUi';
import LogAuthToken from './components/Auth/LogAuthToken/LogAuthToken';
import Profile from './components/Auth/Profile/Profile';
import { Puff } from 'react-loader-spinner';
import './styles.css';

const App = () => {
  const [activeInterface, setActiveInterface] = useState('ChatbotUi');
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();

  // Log the Authentication token to the console
  LogAuthToken();

  // If the user is not authenticated, redirect to the login page
  // The issue is that we want to design a loading page
  // which aside from showing simply "Loading..." also shows a loading animation

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) { 
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="App">
      <header className="App-header">
        <h2>Pediatric Airway Management Assistant</h2>
        <Profile />
        <div style={{ marginLeft: 'auto' }}>
          <LogoutButton />
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
  ) : (
    <div>Redirecting to login...</div>
  );
};

export default App;