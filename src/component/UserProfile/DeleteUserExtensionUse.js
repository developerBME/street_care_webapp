import React, { useState } from 'react';
import { auth } from '../firebase'; // Import the auth object from your Firebase configuration
import axios from 'axios'; // Import axios for making HTTP requests

const DeleteUserExtensionUse = () => {
    const [userId, setUserId] = useState("WPsfSZedThWj5IWecYbNq2USTGD3");
    const [deleteResult, setDeleteResult] = useState('');
    const [error, setError] = useState('');

    const handleDeleteUser = async () => {
        if (!userId) {
            setError('Please enter a valid User ID.');
            return;
        }

        try {
            // Call a Cloud Function that triggers the delete-user-data extension
            await axios.post('https://us-central1-ext-delete-user-data-handleSearch/deleteUser', { userId });
            console.log('User deletion initiated. Firebase extension will handle data cleanup.');
            setDeleteResult('User deletion initiated. Data will be cleaned up by the extension.');
            setError('');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user. Please try again.');
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
            <button onClick={handleDeleteUser}>Delete User Extension</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {deleteResult && <p>{deleteResult}</p>}
        </div>
    );
};

export default DeleteUserExtensionUse;
