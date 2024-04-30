import React, { useState, useEffect } from 'react';
import { getAuth, deleteUser, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DeleteUserData = ({ loggedIn }) => {
  const [userId, setUserId] = useState('');
  const [deleteResult, setDeleteResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the current user's UID
      } else {
        setUserId(''); // No user logged in, reset userId
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [auth]);

  const handleDeleteUser = async () => {
    try {
      // Validate user ID
      if (!userId) {
        setError('Please log in to delete your account.');
        return;
      }
  
      const user = auth.currentUser;
      const userMetadata = await user.getIdTokenResult();
      const lastSignInTime = userMetadata?.authTime * 1000;
  
      const timeSinceLastSignIn = Date.now() - lastSignInTime;
      const timeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
  
      if (timeSinceLastSignIn > timeWindow) {
        setError('Please log in again to delete your account.');
        return;
      }
  
      // Delete user
      await deleteUser(auth.currentUser);
      setDeleteResult('User account deleted successfully.');
  
      // Sign out
      signOut(auth).then(() => {
        // Reload the home page
        // navigate('/');
        window.location.reload();
      });
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setError('Please log in again to delete your account.');
      } else {
        console.error('Error deleting user data:', error);
        setError('Error deleting user data. Please try again.');
      }
    }
  };   

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {deleteResult && <p>{deleteResult}</p>}
      <button onClick={handleDeleteUser} disabled={!userId}>
        Delete User
      </button>
    </div>
  );
};
export default DeleteUserData;
