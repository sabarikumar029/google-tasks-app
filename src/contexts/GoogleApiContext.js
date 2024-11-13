import React, { createContext, useContext, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Gapi from '../utils/gapiInstance'; // The Gapi class

// Create a context to hold the Gapi instance
const GapiContext = createContext();

export const useGapi = () => {
  return useContext(GapiContext);
};

export const GapiProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [gapiInstance, setGapiInstance] = useState(null);

  useEffect(() => {
    const initializeGapi = async () => {
      try {
        const instance = new Gapi(); // Create the Gapi instance
        await instance.initialize(); // Wait for the client to initialize
        setGapiInstance(instance); // Set the instance in state
        setIsInitialized(true); // Mark as initialized
      } catch (error) {
        console.error('Error initializing gapi:', error);
      }
    };

    initializeGapi();
  }, []);

  return (
    <GapiContext.Provider value={{ gapiInstance, isInitialized }}>
      {children}
    </GapiContext.Provider>
  );
};
