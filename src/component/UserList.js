import React, { useEffect, useState, useMemo, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch only 'Web' device type users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const usersQuery = query(collection(db, "users"), where("deviceType", "==", "Web"));
        const querySnapshot = await getDocs(usersQuery);
        const userList = querySnapshot.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = useCallback((uid) => {
    navigate(`/user/${uid}`); // Navigate to user details page on row click
  }, [navigate]);

  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 300), []);

  const handleSearchChange = event => {
    debouncedSetSearchTerm(event.target.value);
  };

  // Memoize the filtered users to avoid unnecessary recalculations
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <div style={{ marginTop: '50px', width: '100%', maxWidth: '600px' }}>
        <input 
          type="text"
          placeholder="Search users..."
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
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.docId} onClick={() => handleRowClick(user.uid)} style={{ cursor: 'pointer' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.uid}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username || "No name available"}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.deviceType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
