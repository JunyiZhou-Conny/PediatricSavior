import React, { useState } from 'react';
import './styles.css';
import ChatbotUi from './components/ChatbotUi';
import DataCollectionPage from './components/DataCollectionPage';
import { useAuth0 } from "@auth0/auth0-react";



// Define a LoginButton component that calls the loginWithRedirect method when clicked
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

//Define a LogoutButton component that calls the logout method when clicked
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




const App = () => {
  const [activeInterface, setActiveInterface] = useState('ChatbotUi');
  return (
    <div className="App">
      <header className="App-header">
        <h2>Pediatric Airway Management Assistant</h2>
        <div style={{ marginLeft: 'auto' }}>
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
