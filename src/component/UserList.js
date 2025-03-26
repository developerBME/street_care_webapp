import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { debounce } from 'lodash';
import collectionMapping from "../utils/firestoreCollections";

const users_collection = collectionMapping.users;
const bannedUser_collection = collectionMapping.bannedUser;

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bannedUsers, setBannedUsers] = useState({});

  useEffect(() => {
    const fetchUsersAndBannedStatus = async () => {
      setLoading(true);
      setError("");

      try {
        const usersQuery = query(collection(db, users_collection), where("deviceType", "==", "Web"));
        const bannedQuery = query(collection(db, bannedUser_collection));

        const [userSnapshot, bannedSnapshot] = await Promise.all([
          getDocs(usersQuery),
          getDocs(bannedQuery)
        ]);

        const userList = userSnapshot.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));

        const bannedUserMap = {};
        bannedSnapshot.docs.forEach(doc => {
          bannedUserMap[doc.data().email] = doc.id; // Store the document ID as the value for quick access
        });

        setUsers(userList);
        setBannedUsers(bannedUserMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndBannedStatus();
  }, []);

  const toggleBanUser = async (email) => {
    const isBanned = bannedUsers[email];
    try {
      if (!isBanned) {
        const docRef = await addDoc(collection(db, bannedUser_collection), { email });
        setBannedUsers(prev => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} has been banned.`);
      } else {
        await deleteDoc(doc(db, bannedUser_collection, isBanned));
        setBannedUsers(prev => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} has been unbanned.`);
      }
    } catch (error) {
      console.error(`Error ${isBanned ? 'unbanning' : 'banning'} user:`, error);
      alert(`Failed to ${isBanned ? 'unban' : 'ban'} user.`);
    }
  };

  const debouncedSearchChange = useMemo(() => debounce((value) => {
    setSearchTerm(value);
  }, 300), []);

  const handleSearchChange = event => {
    debouncedSearchChange(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User List</h2>
      <input 
        type="text"
        placeholder="Search users..."
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>UID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Action</th>
            <th style={styles.th}>Device Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.docId} style={styles.tr}>
                <td style={styles.td}>{user.uid}</td>
                <td style={styles.td}>{user.username || "No name available"}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBanUser(user.email); }} 
                    style={bannedUsers[user.email] ? styles.bannedButton : styles.button}
                  >
                    {bannedUsers[user.email] ? 'Unban' : 'Ban'}
                  </button>
                </td>
                <td style={styles.td}>{user.deviceType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noUsers}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    margin: '10px 0'
  },
  searchInput: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4'
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
  },
  tr: {
    ':hover': {
      backgroundColor: '#f9f9f9'
    }
  },
  button: {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  bannedButton: {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#6c757d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px'
  },
  noUsers: {
    textAlign: 'center',
    padding: '10px'
  }
};

export default UserList;
