import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { debounce } from 'lodash';

export default function UserListNew() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [bannedUsers, setBannedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsersAndBannedStatus = async () => {
      setLoading(true);
      setError("");

      try {
        const usersQuery = query(collection(db, "users"), where("deviceType", "==", "Web"));
        const bannedQuery = query(collection(db, "bannedUser"));

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
        const docRef = await addDoc(collection(db, "bannedUser"), { email });
        setBannedUsers(prev => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} has been blocked.`);
      } else {
        await deleteDoc(doc(db, "bannedUser", isBanned));
        setBannedUsers(prev => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} has been unblocked.`);
      }
    } catch (error) {
      console.error(`Error ${isBanned ? 'unblocking' : 'blocking'} user:`, error);
      alert(`Failed to ${isBanned ? 'unblock' : 'block'} user.`);
    }
  };

  const debouncedSearchChange = useMemo(() => debounce((value) => {
    setSearchTerm(value);
  }, 300), []);

  const handleSearchChange = event => {
    debouncedSearchChange(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter !== "all") {
      filtered = filtered.filter(user => user.deviceType === filter);
    }

    return filtered;
  }, [searchTerm, filter, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`w-10 h-10 border rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center ${
              currentPage === i ? 'bg-gray-300' : ''
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <span key={i} className="w-10 h-10 flex items-center justify-center">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  return (
    <div className="p-20 font-sans bg-gray-50" style={{ background: `linear-gradient(to top right, #E4EEEA 10%, #E4EEEA 60%, #EAEEB5 90%)` }}>
      <button>Go back to home page</button>
      <div className="p-20 bg-[#ffffff] mt-12 rounded-[1rem]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-dm-sans font-medium text-4xl text-gray-800 my-2">User List</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search user..."
              onChange={handleSearchChange}
              className="p-2 rounded border border-gray-300 w-64"
            />
            <div className="flex items-center">
              <label htmlFor="filter" className="mr-2 text-gray-600">Filter:</label>
              <select
                id="filter"
                onChange={handleFilterChange}
                className="p-2 rounded border border-gray-300"
              >
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#E4EEEA]">
              <tr>
                <th className="px-4 py-2 w-1/12">Sr. No.</th>
                <th className="px-4 py-2 w-1/6">UID</th>
                <th className="px-4 py-2 w-1/6">Name</th>
                <th className="px-4 py-2 w-1/6">Email</th>
                <th className="px-4 py-2 w-1/6">Device Type</th>
                <th className="px-4 py-2 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.docId} className={`hover:bg-gray-100 ${bannedUsers[user.email] ? 'text-red-600' : ''}`}>
                    <td className="px-4 py-2 border border-gray-300 w-1/12">{indexOfFirstUser + index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300 w-1/6">{user.uid}</td>
                    <td className="px-4 py-2 border border-gray-300 w-1/6">
                      {user.username || 'No name available'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 w-1/6">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-300 w-1/6">
                      {user.deviceType}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 w-1/6">
                      <label className="flex items-center justify-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={bannedUsers[user.email]}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleBanUser(user.email);
                            }}
                          />
                          <div className={`block w-12 h-6 rounded-full ${bannedUsers[user.email] ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                          <div
                            className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${bannedUsers[user.email] ? 'translate-x-6 bg-white' : 'bg-white'}`}
                          ></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4">
            <span>Showing {usersPerPage} results per page</span>
            <div className="flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 border rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                &lt;
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                }
                className="w-10 h-10 border rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

