import React, { createContext, useState } from 'react';

// Create a UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  return (
    <UserContext.Provider value={{ userId, setUserId, userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  );
};