import { useEffect, useState } from 'react';
import { auth, ExtensionToDeleteUserData } from '../firebase';

const DeleteProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the current user on component mount
        const currentUser = auth.currentUser;
        setUser(currentUser);
    }, []);

    const handleDeleteProfile = async (uid) => {
        try {
            // Trigger the extension to delete user data based on the UID
            await ExtensionToDeleteUserData(uid); 
            console.log("User data deleted successfully.");
            return true;
        } catch (error) {
            console.error("Error deleting user data:", error);
            return false;
        }
    };
};

const testDelete = async () => {
    const testUid = 'bR8WnHpGzYPllfHclQ6Az55ZkXv2';
    await handleDeleteProfile(testUid);
};

export { DeleteProfile, testDelete };
