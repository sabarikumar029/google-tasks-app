// /components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';

const CLIENT_ID = '576946412844-uvd1heouvqe545juvcv5aq5dagca567r.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly https://www.googleapis.com/auth/tasks';

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken,setAuthToken]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    gapi.load('client:auth2', initClient);
    }, []);

  const initClient = () => {
    gapi.client.init({
      clientId: CLIENT_ID,
      scope: SCOPES,
    }).then(() => {
      const authInstance = gapi.auth2.getAuthInstance();
      authInstance.isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(authInstance.isSignedIn.get(),gapi.client.getToken());
    });
  };

  const updateSigninStatus = (isSignedIn,token) => {
    if (isSignedIn) {
      setIsAuthenticated(true);
      setAuthToken(`${token?.type} ${token?.access_token}`)
      navigate('/tasks');
    } else {
      setIsAuthenticated(false);
    }
  };

  
  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
    setIsAuthenticated(false);
  };

  return (
    <div class="login">
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Continue with Google</button>
      )}
    </div>
  );
}

export default Login;
