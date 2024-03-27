import React from 'react';
import './Profile.css'; // Ensure this CSS path is correct and the file exists

const ProfileWindow = ({ user, isUserAdmin }) => {
  if (!user) return null; // Guard against undefined user

  return (
    <div className="window">
      <div className="profile-window">
        <div className="profile-details">
          {/* Correct conditional rendering */}
          {isUserAdmin ? (
            <p className = "profile-type">Admin</p>
          ) : (
            <p className = "profile-type">Resident</p> // Assuming you want to display "User" for non-admins
          )}
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWindow;