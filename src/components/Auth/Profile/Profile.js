
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    isAuthenticated && (
      <div>
        {/* Profile avatar acting as a button */}
        <img src={user.picture} alt="User" className="profile-avatar" onClick={toggleProfile} />

        {/* Conditionally rendered mini profile window */}
        {showProfile && (
          <div className="profile-window">
            {/* Mini profile content goes here */}
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            {/* More user details can be added here */}
          </div>
        )}
      </div>
    )
  );
};

export default Profile;