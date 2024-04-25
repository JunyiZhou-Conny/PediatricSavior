import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthApp from './components/UnauthApp';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import './styles.css';

const App = () => {
  const [activeInterface, setActiveInterface] = useState(null);
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const [showParticipantIDPopup, setShowParticipantIDPopup] = useState(false);
  const [participantID, setParticipantID] = useState(''); // New state for participantID

  useEffect(() => {
    const roles = user?.['https://your_domain/roles'] || [];
    setIsUserAdmin(roles.includes('admin'));
  }, [user]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <Router>
      {!isAuthenticated && <NavigationBar />}
      {isAuthenticated ? (
        <AuthenticatedApp
          user={user}
          isUserAdmin={isUserAdmin}
          chatbotLoaded={chatbotLoaded}
          activeInterface={activeInterface}
          setActiveInterface={setActiveInterface}
          showParticipantIDPopup={showParticipantIDPopup}
          setShowParticipantIDPopup={setShowParticipantIDPopup}
          isProfileModalVisible={isProfileModalVisible}
          setIsProfileModalVisible={setIsProfileModalVisible}
          setParticipantID = {setParticipantID}
          setChatbotLoaded = {setChatbotLoaded}
          participantID = {participantID}

        />
      ) : (
        <UnauthApp />
      )}
    </Router>
  );
};

export default App;