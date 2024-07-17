import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminVerification } from "./DecodeService";

export const ProtectedAdminRoute = ({ user, loading }) => {

  const [isUserVerified, setIsUserVerified] = useState(true);

  useEffect(() => {
    const fetchUserVerification = async () => {
      if (user && user.accessToken) {
        try {
          const verificationDetails = await fetchAdminVerification(user.accessToken);
          console.log(verificationDetails)
          setIsUserVerified(verificationDetails?.flag);
        } catch (error) {
          console.error('Error fetching verification details:', error);
        }
      }
    };
    fetchUserVerification();
  });

  if (loading) return null;

  if (!user || !Object.keys(user).length) return <Navigate to="/login" />;

  return isUserVerified ? <Outlet /> : <Navigate to="/login" />;
};
