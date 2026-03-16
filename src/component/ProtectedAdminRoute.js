import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminVerification } from "./DecodeService";
import AdminOnlyError from "./AdminOnlyError";

export const ProtectedAdminRoute = ({ user, loading }) => {
  const [isUserVerified, setIsUserVerified] = useState(null); // null as the initial state
  const [fetchComplete, setFetchComplete] = useState(false);

  const fetchUserVerification = async () => {
    if (user && user.accessToken) {
      try {
        const verificationDetails = await fetchAdminVerification(
          user.accessToken,
        );
        setIsUserVerified(verificationDetails?.flag); // Set true/false based on admin status
      } catch (error) {
        console.error("Error verifying admin status:", error);
        setIsUserVerified(false); // Explicitly set to false on error
      } finally {
        setFetchComplete(true); // Mark fetch as complete
      }
    } else {
      console.log("user not logged in from protected Route.");
      setFetchComplete(true); // Mark as complete even if no user/accessToken
    }
  };

  useEffect(() => {
    fetchUserVerification();
  }, [user]);

  // Show loading state while fetching user verification
  if (loading || !fetchComplete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p> {/* Add a spinner here if needed */}
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user || !Object.keys(user).length) {
    return <Navigate to="/login" />;
  }

  // Render admin error page only after fetch completes and verification is negative
  if (fetchComplete && isUserVerified === false) {
    return <AdminOnlyError />;
  }

  // Render the protected admin route if admin verification passes
  return <Outlet />;
};
