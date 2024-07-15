import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function UserDetails() {
  const { uid } = useParams();  // Get uid from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, process.env.REACT_APP_FIREBASE_USER_COLLECTION, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No User Found</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{marginTop: '100px'}}> </div>
      <h1 style={{ fontSize: '24px', color: '#333' }}>User Details</h1>
      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }}>
        <p><strong>UID:</strong> {uid}</p>
        <p><strong>Name:</strong> {user.username || "No Name"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Device Type:</strong> {user.deviceType}</p>
        {/* Add more fields if needed */}
      </div>
    </div>

  );
}

export default UserDetails;
