import React from "react";
import "./LogOut.css";
import { useAuth0 } from "@auth0/auth0-react";

// Define a LogoutButton component that calls the logout method when clicked
const LogoutButton = () => {
    const { logout } = useAuth0();
  
    // Specify the URL to redirect to after logging out
    const logoutUrl = `${window.location.origin}/`; // change this route for aws integration

    return (
      <button onClick={() => logout({ returnTo: logoutUrl })}>
        Log Out
      </button>
    );
};

export default LogoutButton;
