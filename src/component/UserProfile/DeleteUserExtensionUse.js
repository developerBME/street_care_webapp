import React, { useState } from 'react';
import { auth } from "../firebase";

const DeleteUserExtensionUse = () => {
    const [userId, setUserId] = useState("rcNfGNzxTJUevMN5rxr51CJYqKz1");
    const [deleteResult, setDeleteResult] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            // Validate user ID
            if (!userId) {
                setError("Please enter a valid User ID.");
                return;
            }

            // Getting the extension 
            const extension = auth.app.extensions.get("delete-user-data");
            // Call the extension with the user's UID
            const result = await extension.call({ uid: userId });
            console.log("User data deleted successfully:", result);
            setDeleteResult("User data deleted successfully.");
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error deleting user data:", error);
            setDeleteResult("");
            setError("Error deleting user data. Please try again.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={'userId'}
                onChange={(e) => setUserId(e.target.value)}
                disabled
                placeholder="userId"
            />
            <button onClick={handleDelete}>Delete User Data</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {deleteResult && <p>{deleteResult}</p>}
        </div>
    );
};

export default DeleteUserExtensionUse;
