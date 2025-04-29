import React, { useEffect, useState, useMemo } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { debounce } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RxCaretSort } from "react-icons/rx";
import { FormControl, MenuItem, Select, useMediaQuery } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import {
  fetchUsers,
  // fetchBannedUsers,
  // fetchUnbannedUsers,
} from "../UserService.js";

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
  const isMobile = useMediaQuery("(max-width:767px)");

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bannedUsers, setBannedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const [sorted, setSorted] = useState(initialSorted);

  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState({});

  const [chapterLeaders, setChapterLeaders] = useState({});

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cursorFields, setCursorFields] = useState({
    pageSize: usersPerPage,
    lastVisible: null,
    direction: "next",
    pageHistory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        let data;
        // if (filter === "all") {
        data = await fetchUsers(
          cursorFields.pageSize,
          cursorFields.lastVisible,
          cursorFields.direction,
          cursorFields.pageHistory
        );
        // } else if (filter === true) {
        //   data = await fetchBannedUsers(cursorFields.pageSize);
        // } else {
        //   data = await fetchUnbannedUsers(cursorFields.pageSize);
        // }

        const { users, lastVisible, pageHistory, totalRecords } = data;
        setUsers(users);
        setTotalUsers(totalRecords);
        setTotalPages(Math.ceil(totalRecords / usersPerPage));
        setCursorFields((prev) => ({
          ...prev,
          lastVisible: lastVisible,
          pageHistory: pageHistory,
        }));
      } catch (error) {
        setErrorMessage(error.message);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cursorFields.direction, filter]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

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
        setAdminUsers((prev) => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} was made admin.`);
      } else {
        await deleteDoc(doc(db, "adminUsers", isAdmin));
        setAdminUsers((prev) => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} was removed from being an admin.`);
      }
    } catch (error) {
      console.error(
        `Error ${isAdmin ? "removing user as admin" : "making user admin"}`,
        error
      );
      alert(
        `Failed ${isAdmin ? "removing user as admin" : "making user admin"}`
      );
    }
  };

  const updateChapterRole = async (email, docId, newRole) => {
    try {
      const userDocRef = doc(db, "users", docId);
      await updateDoc(userDocRef, { Type: newRole }); // Update the role in Firestore

      // Update the local state for roles
      setChapterLeaders((prev) => ({
        ...prev,
        [email]: newRole,
      }));

      alert(`User with email ${email} is now assigned the role: ${newRole}.`);
    } catch (error) {
      console.error(`Error updating role for user ${email}:`, error);
      alert(`Failed to update role for user.`);
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

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const sortTable = (key) => {
    let sortType = (sorted[key] + 1) % 3;
    setSorted({
      ...initialSorted,
      [key]: sortType,
    });
  };

  const handleClickPrev = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0);
  };

  const handleClickNext = () => {
    if (currentPage >= totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
    setCursorFields((prev) => ({ ...prev, direction: "" }));
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "next" }));
    }, 0);
  };

  const getTotalToDisplay = () => {
    return totalUsers;
  };

  const getDisplayCount = () => {
    return Math.min((currentPage + 1) * usersPerPage, totalUsers);
  };

  const displayCount = getDisplayCount();
  const totalToDisplay = getTotalToDisplay();

  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPage > 0) {
      buttons.push(
        <button
          key="prev"
          onClick={handleClickPrev}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack />
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button
          key="next"
          onClick={handleClickNext}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward />
        </button>
      );
    }
    return buttons;
  };

  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
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
          <div
            className={`flex justify-between mb-5 ${
              isMobile ? "flex-col" : "items-center"
            }`}
          >
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
                  <th className="rounded-tr-2xl py-3 px-4">User Type</th>
                </tr>
              </thead>
              <tbody className="text-sm bg-white">
                {users.length > 0 ? (
                  users.map((user, index) => (
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
                      <td className="border-l border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4">
                        <select
                          className="p-2 border rounded bg-white"
                          onChange={(e) => {
                            e.stopPropagation();
                            updateChapterRole(
                              user.email,
                              user.docId,
                              e.target.value
                            );
                          }}
                          value={chapterLeaders[user.email] || "Account Holder"} // Default to "Account Holder"
                        >
                          <option value="Chapter Leader">Chapter Leader</option>
                          <option value="Chapter Member">Chapter Member</option>
                          <option value="Street Care Hub Leader">
                            Street Care Hub Leader
                          </option>
                          <option value="Account Holder">Account Holder</option>
                        </select>
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
            <div className="flex justify-between items-center mt-8 w-full">
              <p className="text-gray-600">
                Showing {displayCount} of {totalToDisplay} users
              </p>
              <div className="flex justify-end">
                {renderPaginationButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
