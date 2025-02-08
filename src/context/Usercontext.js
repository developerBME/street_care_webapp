import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../component/firebase";

const UserContext = createContext();

// UserProvider wraps the app and provides user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes to the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } else {
        setUser(null); // User logged out
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};