import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminVerification } from "./DecodeService";

export const ProtectedAdminRoute = ({ user, loading }) => {

  const [isUserVerified, setIsUserVerified] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false); // to check if the AdminVerification call is complete

  const fetchUserVerification = async () => {
      if (user && user.accessToken) {
        try {
          const verificationDetails = await fetchAdminVerification(user.accessToken);
          console.log(verificationDetails)
          setIsUserVerified(verificationDetails?.flag);
          setFetchComplete(true);
        } catch (error) {
          setFetchComplete(true);
        }
      }
  };

  useEffect(() => {
    fetchUserVerification();
  });
  
  if (loading || !fetchComplete) return null; 

  if (!user || !Object.keys(user).length) return <Navigate to="/login" />;

  return isUserVerified ? <Outlet /> : <Navigate to="/login" />;
};
