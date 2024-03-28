import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import EmailVerificationModal from "./EmailVerificationModal";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

export const ProtectedRoute = ({ user }) => {
  useEffect(() => {}, [user]);

  if (!user || !Object.keys(user).length) return <Navigate to="/login" />;

  return user.emailVerified ? <Outlet /> : <Navigate to="/verifyemail" />;

  //test comment
};
