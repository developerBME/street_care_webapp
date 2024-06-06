import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";  // Ensure this path is correct for your Firebase configuration

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = [];
        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };
          if (userData.deviceType && userData.deviceType.trim() === "Web") {
            userList.push(userData);
          }
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Device Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
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
