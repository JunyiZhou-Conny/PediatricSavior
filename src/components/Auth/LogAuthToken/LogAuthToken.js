// useAuthToken.js
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const useAuthToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(`isAuthenticated: ${isAuthenticated}`);
  }, [isAuthenticated]);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          console.log(`Access Token: ${accessToken}`);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);
};

export default useAuthToken;