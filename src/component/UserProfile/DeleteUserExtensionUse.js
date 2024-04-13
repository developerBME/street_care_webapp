import React, { useState } from 'react';
import firebase from "firebase";

const DeleteUserData = () => {
    const [userId, setUserId] = useState("");

    const handleDelete = async () => {
        const extension = firebase.extensions().get("delete-user-data");
        await extension.call({
            uid: userId,
        });
    
    };
    /*return (

    );*/
};

const testDelete = async () => {
    const testUid = 'bR8WnHpGzYPllfHclQ6Az55ZkXv2';
    await handleDelete(testUid);
};

export default DeleteUserData;
