import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminVerification } from "./DecodeService";
import AdminOnlyError from "./AdminOnlyError";

export const ProtectedAdminRoute = ({ user, loading }) => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false); // Track if the admin verification check is complete

  const fetchUserVerification = async () => {
    if (user && user.accessToken) {
      try {
        const verificationDetails = await fetchAdminVerification(
          user.accessToken
        );
        setIsUserVerified(verificationDetails?.flag);
      } catch (error) {
        console.error("Error verifying admin status:", error);
      } finally {
        setFetchComplete(true); // Mark the fetch as complete
      }
    } else {
      setFetchComplete(true); // Mark as complete if user or accessToken is missing
    }
  };

  useEffect(() => {
    fetchUserVerification();
  }, [user]); // Only refetch when `user` changes

  // 1. If loading user data or still verifying admin status, show a loading state or null
  if (loading || !fetchComplete) return null;

  // 2. Redirect to login if user is not authenticated
  if (!user || !Object.keys(user).length) return <Navigate to="/login" />;

  // 3. If the user is authenticated but not an admin, show the AdminOnlyError
  if (!isUserVerified) return <AdminOnlyError />;

  // 4. If user is authenticated and verified as admin, render the child components
  return <Outlet />;
};
