import React, { createContext, useState } from 'react';

// Create the context
export const UserDataContext = createContext();

// Create a provider for components to consume and update the user data
export const UserDataProvider = ({ children }) => {
  // Define your user state and setter
  const [userData, setUserData] = useState({
    name: '', // User's name
    email: '', // User's email
    isLoggedIn: false, // Flag for user login status
    userType:'admin'
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
