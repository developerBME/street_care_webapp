import React, { useEffect, useState, useMemo } from "react";
import {
  collection,
  getDocs,
  query,
  addDoc,
  deleteDoc, where,
  doc,
  orderBy, limit,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { debounce } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RxCaretSort } from "react-icons/rx";
import { FormControl, MenuItem, Select, useMediaQuery } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { IoChevronBackCircle, IoChevronBackCircleOutline, IoChevronForwardCircle, IoChevronForwardCircleOutline } from "react-icons/io5";

const initialSorted = {
  username: 0,
  deviceType: 0,
};

const filterValues = {
  Blocked: true,
  Unblocked: false,
};

export default function UserListNew() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bannedUsers, setBannedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sorted, setSorted] = useState(initialSorted);

  const isMobile = useMediaQuery("(max-width:767px)");

  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState({});

  const [chapterLeaders, setChapterLeaders] = useState({});

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const fetchUsersAndBannedStatus = async () => {
      setLoading(true);
      setError("");

      try {
        const usersQuery = query(collection(db, "users"));
        const bannedQuery = query(collection(db, "bannedUser"));
        const adminQuery = query(collection(db, "adminUsers"));

        const [userSnapshot, bannedSnapshot, adminUserSnapshot] = await Promise.all([
          getDocs(usersQuery),
          getDocs(bannedQuery),
          getDocs(adminQuery)
        ]);

        const userList = userSnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        const bannedUserMap = {};
        bannedSnapshot.docs.forEach((doc) => {
          bannedUserMap[doc.data().email] = doc.id; // Store the document ID as the value for quick access
        });

        const adminUserMap = {};
        adminUserSnapshot.docs.forEach(doc => {
          adminUserMap[doc.data().email] = doc.id; 
        });

        const chapterLeaderMap = {};
        userList.forEach(user => {
          if (user.Type === "Chapter Leader") {
            chapterLeaderMap[user.email] = true;
          }
        });
        
        setUsers(userList);
        setBannedUsers(bannedUserMap); 
        setAdminUsers(adminUserMap);
        setChapterLeaders(chapterLeaderMap);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchOutreachData = async () => {
      // Fetch users who have deviceType "Web"
      const usersQuery = query(collection(db, "users"));//, where("deviceType", "==", "Android"));
      const userSnapshot = await getDocs(usersQuery);
      
      const userList = userSnapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
    
      const androidOutreachCollectionName = "outreachEventsAndroid";
      const outreachCollectionName = "outreachEvents";
    
      const androidOutreachQuery = query(collection(db, androidOutreachCollectionName));
      const outreachQuery = query(collection(db, outreachCollectionName));
    
      const [androidOutreachSnapshot, outreachSnapshot] = await Promise.all([
        getDocs(androidOutreachQuery),
        getDocs(outreachQuery)
      ]);
  
      // Map the documents into arrays
      const androidOutreachData = androidOutreachSnapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
    
      const allOutreachData = outreachSnapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
  
      const outreachDataList = [];
  
      userList.forEach(user => {
        if(user.deviceType=="Android"){
          const androidUserOutreachData = androidOutreachData
          .filter(outreach => outreach.uid === user.docId) 
          .sort((a, b) => b.createdAt - a.createdAt); 

          if (androidUserOutreachData.length > 0) {
            outreachDataList.push({
              userId: user.docId,
              userData: user,
              outreachData: androidUserOutreachData[0], // Get the latest outreach
              totalOutreaches: androidUserOutreachData.length // Total outreach count
            });
          }
        }
        else{
          const userOutreachData = allOutreachData
          .filter(outreach => outreach.uid === user.docId) // Filter by uid
          .sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt in descending order
    
          // Check if userOutreachData has values before pushing
          if (userOutreachData.length > 0) {
            outreachDataList.push({
              userId: user.docId,
              userData: user,
              outreachData: userOutreachData[0], // Get the latest outreach
              totalOutreaches: userOutreachData.length // Total outreach count
            });
          }
        }
      });
      console.log(outreachDataList);
    
      return outreachDataList;
    };

    fetchUsersAndBannedStatus();
    fetchOutreachData();
  }, []);

  const toggleBanUser = async (email) => {
    const isBanned = bannedUsers[email];
    try {
      if (!isBanned) {
        const docRef = await addDoc(collection(db, "bannedUser"), { email });
        setBannedUsers((prev) => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} has been blocked.`);
      } else {
        await deleteDoc(doc(db, "bannedUser", isBanned));
        setBannedUsers((prev) => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} has been unblocked.`);
      }
    } catch (error) {
      console.error(
        `Error ${isBanned ? "unblocking" : "blocking"} user:`,
        error
      );
      alert(`Failed to ${isBanned ? "unblock" : "block"} user.`);
    }
  };

  const toggleUserAsAdmin = async (email) => {
    const isAdmin = adminUsers[email];
    try {
      if (!isAdmin) {
        const docRef = await addDoc(collection(db, "adminUsers"), { email });
        setAdminUsers(prev => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} was made admin.`);
      } else {
        await deleteDoc(doc(db, "adminUsers", isAdmin));
        setAdminUsers(prev => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} was removed from being an admin.`);
      }
      
    } catch (error) {
      console.error(`Error ${isAdmin ? 'removing user as admin' : 'making user admin'}`, error);
      alert(`Failed ${isAdmin ? 'removing user as admin' : 'making user admin'}`);
    }
  };

  const toggleChapterLeader = async (email, docId) => {
    const isChapterLeader = chapterLeaders[email];
    try {
      const userDocRef = doc(db, "users", docId);
      if (!isChapterLeader) {
        await updateDoc(userDocRef, { Type: "Chapter Leader" });
        setChapterLeaders((prev) => ({ ...prev, [email]: true }));
        alert(`User with email ${email} is now a Chapter Leader.`);
      } else {
        await updateDoc(userDocRef, { Type: "" });
        setChapterLeaders((prev) => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} is no longer a Chapter Leader.`);
      }
    } catch (error) {
      console.error(`Error updating Chapter Leader status for user:`, error);
      alert(`Failed to update Chapter Leader status.`);
    }
  };
  const debouncedSearchChange = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value);
      }, 300),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSearchChange(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter !== "all") {
      filtered = filtered.filter((user) =>
        filter
          ? bannedUsers.hasOwnProperty(user.email)
          : !bannedUsers.hasOwnProperty(user.email)
      );
    }

    if (sorted.username !== 0) {
      filtered.sort((a, b) =>
        sorted.username === 1
          ? a.username?.localeCompare(b.username)
          : b.username?.localeCompare(a.username)
      );
    }

    if (sorted.deviceType !== 0) {
      filtered.sort((a, b) =>
        sorted.deviceType === 1
          ? a.deviceType?.localeCompare(b.deviceType)
          : b.deviceType?.localeCompare(a.deviceType)
      );
    }

    return filtered;
  }, [searchTerm, filter, users, sorted]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  let currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortTable = (key) => {
    let sortType = (sorted[key] + 1) % 3;
    setSorted({
      ...initialSorted,
      [key]: sortType,
    });
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 border rounded-full h-8 w-8 hover:bg-gray-200 flex items-center justify-center ${
              currentPage === i ? "border-[#1F0A58] bg-[#E8DFFD]" : "border-[#C8C8C8] bg-[#FFFFFF]"
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
  if (error)
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black mb-8">
        <div
          className="flex items-center cursor-pointer mb-4"
          onClick={() => {
            navigate("/admin");
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Admin Homepage
          </p>
        </div>
        <div className="px-4 py-8 lg:px-12 h-full w-full rounded-2xl bg-[#F7F7F7] overflow-x-scroll md:overflow-x-auto">
          <div className={`flex justify-between mb-5 ${isMobile ? "flex-col" : "items-center"}`}>
            <h2 className="font-dm-sans font-medium text-4xl text-gray-800 my-2">
              User Management
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search user..."
                onChange={handleSearchChange}
                className="p-2 rounded border border-gray-300 w-64"
              />
              <div className="flex items-center text-2xl font-bricolage font-medium">
                <label className="hidden md:inline">Filter:</label>
                <FormControl sx={{ m: 1 }}>
                  <Select
                    IconComponent={() =>
                      isMobile ? (
                        <CiFilter
                          className="w-8 h-8 m-1 stroke-1 cursor-pointer"
                          onClick={() => setOpen((prev) => !prev)}
                        />
                      ) : (
                        <IoIosArrowForward
                          className="w-4 h-4 mx-1 cursor-pointer"
                          onClick={() => setOpen((prev) => !prev)}
                        />
                      )
                    }
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    value={filter}
                    label=""
                    onChange={handleChange}
                    sx={{
                      "#demo-controlled-open-select": {
                        paddingRight: 0,
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        paddingLeft: "8px",
                        width: "auto",
                        display: isMobile ? "none" : "block",
                      },
                    }}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    {Object.keys(filterValues).map((name) => (
                      <MenuItem key={name} value={filterValues[name]}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="table-auto w-full text-center border-collapse">
              <thead className="bg-[#E4EEEA] py-4">
                <tr>
                  <th className="border-r rounded-tl-2xl py-3 px-2">Sr. No.</th>
                  <th className="border-r py-3 px-2">UID</th>
                  <th className="border-r py-3 px-2">
                    <div className="flex justify-center items-center whitespace-nowrap">
                      <p>Name</p>
                      <p className="ml-4">
                        <RxCaretSort
                          className={`w-6 h-6 cursor-pointer ${
                            sorted.username &&
                            "bg-[#565656] text-[#FFFFFF] border border-[#565656] rounded"
                          }`}
                          onClick={() => sortTable("username")}
                        />
                      </p>
                    </div>
                  </th>
                  <th className="border-r py-3 px-2">Email</th>
                  <th className="border-r py-3 px-2">
                    <div className="flex justify-center items-center whitespace-nowrap">
                      <p>Device Type</p>
                      <p className="ml-4">
                        <RxCaretSort
                          className={`w-6 h-6 cursor-pointer ${
                            sorted.deviceType &&
                            "bg-[#565656] text-[#FFFFFF] border border-[#565656] rounded"
                          }`}
                          onClick={() => sortTable("deviceType")}
                        />
                      </p>
                    </div>
                  </th>
                  <th className="border-r py-3 px-2">Blocked</th>
                  <th className="border-r py-3 px-2">Admin</th>
                  <th className="rounded-tr-2xl py-3 px-4">Chapter Leader</th>
                </tr>
              </thead>
              <tbody className="text-sm bg-white">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user.docId}
                      className={`hover:bg-gray-100 ${
                        bannedUsers[user.email] ? "text-red-600" : ""
                      }`}
                    >
                      <td className="border-r border-b border-[#C8C8C8] whitespace-nowrap py-2">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="border-x border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4">
                        {user.uid}
                      </td>
                      <td className="border-x border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4">
                        {user.username || "No name available"}
                      </td>
                      <td className="border-x border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4">
                        {user.email}
                      </td>
                      <td className="border-x border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4">
                        {user.deviceType}
                      </td>
                      <td className="border-l border-b border-[#C8C8C8] whitespace-nowrap py-2">
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
                            <div
                              className={`block w-12 h-6 rounded-full ${
                                bannedUsers[user.email]
                                  ? "bg-red-600"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                                bannedUsers[user.email]
                                  ? "translate-x-6 bg-white"
                                  : "bg-white"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </td>
                      <td className="border-l border-b border-[#C8C8C8] whitespace-nowrap py-2">
                        <label className="flex items-center justify-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={adminUsers[user.email]}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleUserAsAdmin(user.email);
                              }}
                            />
                            <div
                              className={`block w-12 h-6 rounded-full ${
                                adminUsers[user.email]
                                  ? "bg-red-600"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                                adminUsers[user.email]
                                  ? "translate-x-6 bg-white"
                                  : "bg-white"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </td>
                      <td className="border-l border-b border-[#C8C8C8] whitespace-nowrap py-2">
                        <label className="flex items-center justify-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={chapterLeaders[user.email]}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleChapterLeader(user.email, user.docId);
                              }}
                            />
                            <div
                              className={`block w-12 h-6 rounded-full ${
                                chapterLeaders[user.email] ? "bg-red-600" : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                                chapterLeaders[user.email] ? "translate-x-6 bg-white" : "bg-white"
                              }`}
                            ></div>
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={`flex justify-between p-4 ${isMobile ? "flex-col items-start" : "items-center"}`}>
              <div>Showing {usersPerPage} of {filteredUsers.length} users</div>
              <div className="flex justify-between md:justify-end mt-6 items-center">
                {currentPage === 1 ? (
                  <IoChevronBackCircle className="w-8 h-8 text-[#565656]" />
                ) : (
                  <IoChevronBackCircleOutline
                    className="w-8 h-8 text-[#565656]"
                    onClick={() => paginate(currentPage - 1)}
                  />
                )}
                {renderPageNumbers()}
                {currentPage ===
                Math.ceil(filteredUsers.length / usersPerPage) ? (
                  <IoChevronForwardCircle className="w-8 h-8 text-[#565656]" />
                ) : (
                  <IoChevronForwardCircleOutline
                    className="w-8 h-8 text-[#565656]"
                    onClick={() => paginate(currentPage + 1)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
