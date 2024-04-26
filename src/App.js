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
<<<<<<< HEAD

=======
// obtain roles
>>>>>>> ad14e165d3a9280c4507776d6d203dcaca25e9ac
  useEffect(() => {
    const roles = user?.[`https://your_domain/roles`] || [];
    setIsUserAdmin(roles.includes('admin'));
  }, [user]);
// second attempt
  useEffect(() => {
    const loggedInFlag = sessionStorage.getItem('loggedIn');
    if (loggedInFlag) {
      // Do nothing, user session continues
    } else if (isAuthenticated) {
      sessionStorage.setItem('loggedIn', 'true');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Set refreshing flag to true at start of session
    sessionStorage.setItem('refreshing', 'true');

    // Calculate time difference to determine action
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

<<<<<<< HEAD
  useEffect(() => {
    const handleBeforeUnload = () => {

    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [logout]);

=======
    window.addEventListener('unload', handleUnload);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    sessionStorage.setItem('lastUnloadTime', Date.now().toString());
    if (!sessionStorage.getItem('refreshing')) {
      sessionStorage.removeItem('loggedIn');
      logout({ returnTo: window.location.origin });
    }
  };

  const handleUnload = () => {
    sessionStorage.removeItem('refreshing');
  };
// loading icon
>>>>>>> ad14e165d3a9280c4507776d6d203dcaca25e9ac
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
// the return function, pre and post login
// load auth if authenticated
// else return landing page
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
