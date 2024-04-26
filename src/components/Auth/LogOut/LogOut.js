import React from "react";
import "./LogOut.css";
import { useAuth0 } from "@auth0/auth0-react";

// Define a LogoutButton component that calls the logout method when clicked
const LogoutButton = () => {
    const { logout } = useAuth0();
  
    // Specify the URL to redirect to after logging out
    const logoutUrl = `${window.location.origin}/`; // change this route for aws integration

    return (
<<<<<<< HEAD
      <button className='log-out-button' onClick={() => logout({ returnTo: window.location.origin })}>
=======
      <button onClick={() => logout({ returnTo: logoutUrl })}>
>>>>>>> ad14e165d3a9280c4507776d6d203dcaca25e9ac
        Log Out
      </button>
    );
};

export default LogoutButton;
