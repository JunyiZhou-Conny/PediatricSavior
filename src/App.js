import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthApp from './components/UnauthApp';
import { BrowserRouter as Router } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import './styles.css';

const App = () => {
  const [activeInterface, setActiveInterface] = useState(null);
  const { isAuthenticated, user, isLoading, loginWithRedirect, logout } = useAuth0();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const [showParticipantIDPopup, setShowParticipantIDPopup] = useState(false);
  const [participantID, setParticipantID] = useState('');

  useEffect(() => {
    const roles = user?.[`https://your_domain/roles`] || [];
    setIsUserAdmin(roles.includes('admin'));
  }, [user]);

  useEffect(() => {
    const loggedInFlag = sessionStorage.getItem('loggedIn');
    if (!loggedInFlag && isAuthenticated) {
      sessionStorage.setItem('loggedIn', 'true');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // You can do something here before the window unloads
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('refreshing', 'true');
    const lastTime = sessionStorage.getItem('lastUnloadTime');
    if (lastTime) {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;
      if (timeDiff < 2000) {
        console.log('Page was refreshed');
      } else {
        console.log('Page was closed and reopened');
      }
    }
  }, []); // Added missing closing bracket here

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <Router>
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
          setParticipantID={setParticipantID}
          setChatbotLoaded={setChatbotLoaded}
          participantID={participantID}
        />
      ) : (
        <UnauthApp />
      )}
    </Router>
  );
};

export default App;
