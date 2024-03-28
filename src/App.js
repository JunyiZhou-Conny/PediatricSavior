import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/LogIn/LogIn';
import LogoutButton from './components/Auth/LogOut/LogOut';
import SideButton from './components/SideButton/SideButton';
import DataCollectionPage from './components/DataCollectionPage/DataCollectionPage';
import ChatbotUi from './components/ChatbotUi/ChatbotUi';
import { Puff } from 'react-loader-spinner';
import Profile from './components/Auth/Profile/Profile';
import ProfileWindow from './components/Auth/Profile/ProfileWindow';
import './styles.css';

const App = () => {
  const [activeInterface, setActiveInterface] = useState('ChatbotUi');
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  useEffect(() => {
    const roles = user?.['https://your_domain/roles'] || [];
    setIsUserAdmin(roles.includes('admin'));
  }, [user]);

  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

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
        <h2 className="title">Pediatric Airway Management Assistant</h2>
        {/* Profile Picture acting as button */}
        <img src={user.picture} alt="User" className="profile-avatar" onClick={toggleProfileModal} />
      </header>
      {isProfileModalVisible && (
        
        <ProfileWindow user={user} isUserAdmin={isUserAdmin}/>
        
      )}
      <div className="app-body">
        <div className="sidebar">
          <div className="user-info">{isUserAdmin ? 'ADMIN' : 'RESIDENT'}</div>
          <SideButton value={'Airway Management Assistant'} onClick={() => setActiveInterface('ChatbotUi')} />
          {isUserAdmin && (
            <SideButton value={'Data Collection Assistant'} onClick={() => setActiveInterface('DataCollectUi')} />
          )}
          <LogoutButton />
        </div>

        <div className="chat-container">
          {activeInterface === 'ChatbotUi' ? <ChatbotUi></ChatbotUi> : isUserAdmin ? <DataCollectionPage /> : null}
        </div>
      </div>
    </div>
  ) : (
    <div>Redirecting to login...</div>
  );
};

export default App;




