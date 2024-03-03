import React, { useState } from 'react';
import './styles.css';

import ChatbotUi from './components/ChatbotUi';
import DataCollectionPage from './components/DataCollectionPage';

import { useAuth0 } from "@auth0/auth0-react";




// Define a LoginButton component that calls the loginWithRedirect method when clicked
// Afer logging in, the user is redirected to the application's home page
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

//Define a LogoutButton component that calls the logout method when clicked
//The current logout directs the user to the application's home page after logging out
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

function SideButton({ value, onClick }) {
  return (
    <button className='sideButton' onClick={onClick}>
      {value}
    </button>
  );
}

// The Profile component displays the user's profile information
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};




const App = () => {
  const { isAuthenticated } = useAuth0();
  const [activeInterface, setActiveInterface] = useState('ChatbotUi');

  return (
    <div className="App">
      <header className="App-header">
        <h2>Pediatric Airway Management Assistant</h2>
        <div className="auth-buttons">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>

      <div className="app-body">
        <div className="sidebar">
          <SideButton value={'Airway Management Assistant'} onClick={() => setActiveInterface('ChatbotUi')} />
          <SideButton value={'Data Collection Assistant'} onClick={() => setActiveInterface('DataCollectUi')} />
          {isAuthenticated && <SideButton value={'Profile'} onClick={() => setActiveInterface('Profile')} />}
        </div>
        <div className="chat-container">
          {activeInterface === 'ChatbotUi' && <ChatbotUi />}
          {activeInterface === 'DataCollectUi' && <DataCollectionPage />}
          {activeInterface === 'Profile' && <Profile />}
        </div>
      </div>
    </div>
  );
};


export default App;
