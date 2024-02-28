import React, { useState  } from 'react';
import './styles.css';
import ChatbotUi from './components/ChatbotUi';
import DataCollectionPage from './components/DataCollectionPage';

function SideButton({ value , onClick}) {
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
        <h2>Pideatric Airway Management Assistant</h2>
      </header>
      <div className="app-body">
        <div className="sidebar">
          <SideButton value={'Airway Management Assistant'} onClick={() => setActiveInterface('ChatbotUi')}/>
          <SideButton value={'Data Collection Assistant'} onClick={() => setActiveInterface('DataCollectUi')}/>
        </div>
        <div className="chat-container">
          {activeInterface === 'ChatbotUi' ? <ChatbotUi /> : <DataCollectionPage />}
        </div>
      </div>
    </div>
  );
};

export default App;