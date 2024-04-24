import React, { useState, useEffect } from 'react';
import { getAuth, deleteUser, onAuthStateChanged } from 'firebase/auth';

const DeleteUserData = () => {
  const [userId, setUserId] = useState('');
  const [deleteResult, setDeleteResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the current user's UID
      } else {
        setUserId(''); // No user logged in, reset userId
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const handleDeleteUser = async () => {
    try {
      // Validate user ID
      if (!userId) {
        setError('Please log in to delete your account.');
        return;
      }

      // Get auth instance
      const auth = getAuth();

      // Delete user
      await deleteUser(auth.currentUser);

      setDeleteResult('User account deleted successfully.');
      setError('');
    } catch (error) {
      console.error('Error deleting user data:', error);
      setError('Error deleting user data. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        disabled // Disable input if user is authenticated
      />
      <button onClick={handleDeleteUser} disabled={!userId}>
        Delete User
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {deleteResult && <p>{deleteResult}</p>}
    </div>
  );
};

export default DeleteUserData;
