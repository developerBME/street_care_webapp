import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        // Sorting users by name, placing 'No name available' at the end
        userList.sort((a, b) => {
          const nameA = a.username || "zzzzz"; // Using 'zzzzz' as a high-value string to ensure it sorts last
          const nameB = b.username || "zzzzz";
          return nameA.localeCompare(nameB);
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ background: 'linear-gradient(to tr, #E4EEEA 10%, #E4EEEA 60%, #EAEEB5 90%)', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>User List</h2>
      <table style={{ width: '80%', maxWidth: '600px', backgroundColor: 'white', borderCollapse: 'collapse', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#F5F5F5', color: '#333', padding: '8px', border: '1px solid #DDD', fontWeight: 'bold' }}>Name</th>
            <th style={{ backgroundColor: '#F5F5F5', color: '#333', padding: '8px', border: '1px solid #DDD', fontWeight: 'bold' }}>Email</th>
            <th style={{ backgroundColor: '#F5F5F5', color: '#333', padding: '8px', border: '1px solid #DDD', fontWeight: 'bold' }}>Device Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '8px', border: '1px solid #DDD' }}>{user.username || "No name available"}</td>
              <td style={{ padding: '8px', border: '1px solid #DDD' }}>{user.email}</td>
              <td style={{ padding: '8px', border: '1px solid #DDD' }}>{user.deviceType || "No device type"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
