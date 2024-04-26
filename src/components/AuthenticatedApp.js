import React from 'react';
import SideButton from './SideButton/SideButton';
import ChatbotUi from './ChatbotUi/ChatbotUi';
import DataCollectionPage from './DataCollectionPage/DataCollectionPage';
import ChatHistory from './ChatHistoryPage/ChatHistory';
import InstructionUi from './InstructionUi/InstructionUi';
import LogoutButton from './Auth/LogOut/LogOut';
import ProfileWindow from './Auth/Profile/ProfileWindow';
import ParticipantIDPopup from './ParticipantIDPopup/ParticipantIDPopup';

const AuthenticatedApp = ({
  user,
  isUserAdmin,
  chatbotLoaded,
  activeInterface,
  participantID,
  setActiveInterface,
  showParticipantIDPopup,
  setShowParticipantIDPopup,
  isProfileModalVisible,
  setIsProfileModalVisible,
  setParticipantID,  // Assuming this setter is also passed from App.js
  setChatbotLoaded   // Assuming this setter is also passed from App.js
}) => {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">Pediatric Airway Management Assistant</h2>
        <img src={user.picture} alt="User" className="profile-avatar"
             onClick={() => setIsProfileModalVisible(!isProfileModalVisible)} />
      </header>
      {isProfileModalVisible && <ProfileWindow user={user} isUserAdmin={isUserAdmin} />}
      {showParticipantIDPopup &&
        <ParticipantIDPopup 
          onSubmit={(id) => {
            setParticipantID(id);
            setActiveInterface('ChatbotUi');
            setShowParticipantIDPopup(false);
            setChatbotLoaded(true);
          }}
          onClose={() => setShowParticipantIDPopup(false)}
        />
      }
      <div className="app-body">
        <div className="sidebar">
          <div className="user-info">{isUserAdmin ? 'ADMIN' : 'RESIDENT'}</div>
          <SideButton value={'ChatBot'}
                      onClick={() => chatbotLoaded ? setActiveInterface('ChatbotUi') : setShowParticipantIDPopup(true)} />
          {isUserAdmin && <SideButton value={'Chat History'}
                                      onClick={() => setActiveInterface('ChatHistory')} />}
          {isUserAdmin && <SideButton value={'Data Collection'}
                                      onClick={() => setActiveInterface('DataCollectUi')} />}
          {isUserAdmin && <SideButton value={'Instruction Editor'}
                                      onClick={() => setActiveInterface('Instruction Editor')} />}                            
          <LogoutButton className='LogoutButton'/>
        </div>
        <div className="chat-container">
          {activeInterface === 'ChatbotUi' && <ChatbotUi participantID={participantID} />}
          {isUserAdmin && activeInterface === 'DataCollectUi' && <DataCollectionPage />}
          {isUserAdmin && activeInterface === 'ChatHistory' && <ChatHistory />}
          {isUserAdmin && activeInterface === 'Instruction Editor' && <InstructionUi />}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
