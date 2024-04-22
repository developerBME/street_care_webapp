import { useState } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';

const DeleteUserData = () => {
  const [userId, setUserId] = useState('');
  const [deleteResult, setDeleteResult] = useState('');
  const [error, setError] = useState('');

  const handleDeleteUser = async () => {
    try {
      // Validate user ID
      if (!userId) {
        setError('Please enter a valid User ID.');
        return;
      }

      // Get auth instance
      const auth = getAuth();

      // Delete user
      await deleteUser(auth, userId);

      setDeleteResult('User data deleted successfully.');
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
      />
      <button onClick={handleDeleteUser}>Delete User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {deleteResult && <p>{deleteResult}</p>}
    </div>
  );
};

export default DeleteUserData;
