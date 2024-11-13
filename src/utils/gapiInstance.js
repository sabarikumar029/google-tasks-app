import { gapi } from "gapi-script";

class Gapi {
  constructor() {
    this.authToken = null;
    this.isSignedIn = false;
    this.isInitialized = false;  // Track if gapi is initialized
  }

  // Initialize the Google API client
  async initialize() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: process.env.CLIENT_ID,
          scope: process.env.SCOPES,
        }).then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          
          // Listen to the sign-in status change
          authInstance.isSignedIn.listen((signin) => {
            this.isSignedIn = signin;
          });

          // Set the initial sign-in status
          this.isSignedIn = authInstance.isSignedIn.get();

          // Resolve after initialization is complete
          this.isInitialized = true;
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

  // Method to sign in the user
  signIn() {
    const authInstance = gapi.auth2.getAuthInstance();
    return authInstance.signIn().then(() => {
      this.authToken = authInstance.currentUser.get().getAuthResponse().access_token;
      this.isSignedIn = true;
      return this.authToken;
    });
  }

  // Method to sign out the user
  signOut() {
    const authInstance = gapi.auth2.getAuthInstance();
    return authInstance.signOut().then(() => {
      this.authToken = null;
      this.isSignedIn = false;
    });
  }

  // Method to get the authentication token
  getAuthToken() {
    return this.authToken;
  }

  // Method to check if the user is signed in
  getSignInStatus() {
    return this.isSignedIn;
  }

  // Method to check if gapi is initialized
  isInitialized() {
    return this.isInitialized;
  }
}

// Create a singleton instance of Gapi
const gapiInstance = new Gapi();

export default gapiInstance;
