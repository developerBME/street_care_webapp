// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { fetchAdminVerification } from "./DecodeService";
// import AdminOnlyError from "./AdminOnlyError";

// export const ProtectedAdminRoute = ({ user, loading }) => {
//   const [isUserVerified, setIsUserVerified] = useState(false);
//   const [fetchComplete, setFetchComplete] = useState(false); // Track if the admin verification check is complete

//   const fetchUserVerification = async () => {
//     if (user && user.accessToken) {
//       try {
//         const verificationDetails = await fetchAdminVerification(
//           user.accessToken
//         );
//         setIsUserVerified(verificationDetails?.flag);
//       } catch (error) {
//         console.error("Error verifying admin status:", error);
//       } finally {
//         setFetchComplete(true); // Mark the fetch as complete
//       }
//     } else {
//       setFetchComplete(true); // Mark as complete if user or accessToken is missing
//     }
//   };

//   useEffect(() => {
//     fetchUserVerification();
//   }, [user]); // Only refetch when `user` changes

//   // While the verification is loading, show a loading spinner or placeholder
//   if (loading || !fetchComplete) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading...</p> {/* Replace with a spinner if desired */}
//       </div>
//     );
//   }

//   // If the user is not logged in, redirect to the login page
//   if (!user || !Object.keys(user).length) {
//     return <Navigate to="/login" />;
//   }

//   // If the user is not an admin, show the restricted access error
//   if (!isUserVerified) {
//     return <AdminOnlyError />;
//   }

//   // If all checks pass, render the protected admin route
//   return <Outlet />;
// };



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
       const verificationDetails = await fetchAdminVerification(user.accessToken);
       setIsUserVerified(verificationDetails?.flag); // Set true/false based on admin status
     } catch (error) {
       console.error("Error verifying admin status:", error);
       setIsUserVerified(false); // Explicitly set to false on error
     } finally {
       setFetchComplete(true); // Mark fetch as complete
     }
   } else {
     setFetchComplete(true); // Mark as complete even if no user/accessToken
   }
 };


 useEffect(() => {
   fetchUserVerification();
 }, [user]);


 // Show loading state while fetching user verification
 if (loading || !fetchComplete || isUserVerified === null) {
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
 if (!isUserVerified) {
   return <AdminOnlyError />;
 }


 // Render the protected admin route if admin verification passes
 return <Outlet />;
};
