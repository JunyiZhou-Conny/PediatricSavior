import React from 'react';
import SideButton from './SideButton/SideButton';
import ChatbotUi from './ChatbotUi/ChatbotUi';
import DataCollectionPage from './DataCollectionPage/DataCollectionPage';
import ChatHistory from './ChatHistoryPage/ChatHistory';
import InstructionUi from './InstructionUi/InstructionUi';
import LogoutButton from './Auth/LogOut/LogOut';
import ProfileWindow from './Auth/Profile/ProfileWindow';
import ParticipantIDPopup from './ParticipantIDPopup/ParticipantIDPopup';
import ImageUpload from './ImageUpload/ImageUpload';
import CaseEditor from './CaseEditor/CaseEditor';
import ExternalReference from './ExternalReference/ExternalReference';

// post login functions
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
  setParticipantID, 
  setChatbotLoaded   
}) => {
  // funtionality will be listed here
  // differentiate between admin and non-admim
  // id popup for accessing chatbot interface
  // show different functions depending on user role
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
          {isUserAdmin && <SideButton value={'Image Upload'} 
                                      onClick={() => setActiveInterface('ImageUpload')} />}   
          {isUserAdmin && <SideButton value={'Case Editor'} 
                                      onClick={() => setActiveInterface('CaseEditor')} />} 
          {isUserAdmin && <SideButton value={'External Reference'}
                                      onClick={() => setActiveInterface('External Reference')} />}                     
          <LogoutButton className='LogoutButton'/>
        </div>
        <div className="chat-container">
          {activeInterface === 'ChatbotUi' && <ChatbotUi participantID={participantID} isUserAdmin={isUserAdmin} />}
          {isUserAdmin && activeInterface === 'DataCollectUi' && <DataCollectionPage />}
          {isUserAdmin && activeInterface === 'ChatHistory' && <ChatHistory />}
          {isUserAdmin && activeInterface === 'Instruction Editor' && <InstructionUi />}
          {isUserAdmin && activeInterface === 'ImageUpload' && <ImageUpload />}
          {isUserAdmin && activeInterface === 'CaseEditor' && <CaseEditor />}
          {isUserAdmin && activeInterface === 'External Reference' && <ExternalReference />}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
