import React, { useState } from 'react';
import { auth } from "../firebase";

const DeleteUserData = () => {
    const [userId, setUserId] = useState("");
    const [deleteResult, setDeleteResult] = useState("");

    const handleDelete = async () => {
        try {
            // getting the extension 
            const extension = auth.app.extensions.get("delete-user-data");
            // call the extension with the usere's UID
            const result = await extension.call({
                uid: userId
            });
            console.log("User data deleted successfully:", result);
            setDeleteResult("User data deleted successfully.");
        } catch (error) {
            console.error("Error deleting user data: ", error);
            setDeleteResult("Error deleting user data.");
        }
    };
    /*return (

    );*/
};

const testDelete = async () => {
    const testUid = 'bR8WnHpGzYPllfHclQ6Az55ZkXv2';
    await handleDelete(testUid);
};

export default DeleteUserData;
