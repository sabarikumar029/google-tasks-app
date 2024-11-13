export const gauthLoader = async () => {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            clientId: process.env.REACT_APP_CLIENT_ID, // Your OAuth client ID from environment variables
            scope: process.env.REACT_APP_SCOPES, // Your scopes
          });
          resolve(window.gapi); // Resolve when the client is successfully initialized
        } catch (error) {
          reject(error); // Reject if initialization fails
        }
      });
    });
  };