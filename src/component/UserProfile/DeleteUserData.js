import React, { useState, useEffect } from 'react';
import { getAuth, deleteUser, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import NavBar from '../Navbar';

const DeleteUserData = (props) => {
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
      // Delete user
      await deleteUser(auth.currentUser);
      setDeleteResult('User account deleted successfully.');
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
      navigate('/');
    } catch (error) {
      console.error('Error deleting user data:', error);
      setError('Error deleting user data. Please try again.');
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
