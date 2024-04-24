import React from "react";
import "./LogIn.css";
import { useAuth0 } from "@auth0/auth0-react";

// Define a LoginButton component that calls the loginWithRedirect method when clicked
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>log in</button>;
  };

  export default LoginButton;