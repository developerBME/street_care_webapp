import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";  // Ensure this path is correct for your Firebase configuration
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");  // Reset error state on new fetch
      try {
        const querySnapshot = await getDocs(collection(db, process.env.REACT_APP_FIREBASE_USER_COLLECTION));
        const userList = [];
        querySnapshot.forEach((doc) => {
          const userData = { docId: doc.id, ...doc.data() }; // Access all fields from the document
          // Filter to include only 'Web' deviceType
          if (userData.deviceType === "Web") {
            userList.push(userData);
          }
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch users.");  // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleRowClick = (uid) => {
    navigate(`/user/${uid}`);  // Navigate to the user details page
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error if present
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <div style={{ marginTop: '50px', width: '100%', maxWidth: '600px' }}>
        <input 
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead>
          <tr style={{ backgroundColor: '#a9a9a9' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>UID</th> 
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Device Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.docId} onClick={() => handleRowClick(user.uid)} style={{ cursor: 'pointer' }}> 
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.uid}</td> 
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username || "No name available"}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.deviceType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
