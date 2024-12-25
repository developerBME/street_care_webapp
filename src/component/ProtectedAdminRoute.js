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

  // While the verification is loading, show a loading spinner or placeholder
  if (loading || !fetchComplete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p> {/* Replace with a spinner if desired */}
      </div>
    );
  }

  // If the user is not logged in, redirect to the login page
  if (!user || !Object.keys(user).length) {
    return <Navigate to="/login" />;
  }

  // If the user is not an admin, show the restricted access error
  if (!isUserVerified) {
    return <AdminOnlyError />;
  }

  // If all checks pass, render the protected admin route
  return <Outlet />;
};
