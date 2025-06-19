import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";
import { fetchUsers } from "../UserService.js";

const bannedUser_collection = "bannedUser";
const adminUser_collection = "adminUsers";
const users_collection = "users";

const initialSorted = {
  username: 0,
  deviceType: 0,
};

export default function UserManagementTable({ debouncedSearchTerm, filter }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [bannedUsers, setBannedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const [sorted, setSorted] = useState(initialSorted);

  const [adminUsers, setAdminUsers] = useState({});

  const [userTypes, setUserTypes] = useState({});

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cursorFields, setCursorFields] = useState({
    pageSize: usersPerPage,
    lastVisible: null,
    direction: "next",
    pageHistory: [],
  });

  const resetPagination = () => {
    setCurrentPage(0);
    setCursorFields({
      pageSize: usersPerPage,
      lastVisible: null,
      direction: "next",
      pageHistory: [],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        let result;
        result = await fetchUsers(
          cursorFields.pageSize,
          cursorFields.lastVisible,
          cursorFields.direction,
          cursorFields.pageHistory,
          filter,
          debouncedSearchTerm
        );

        const { users, lastVisible, pageHistory, totalRecords } = result;

        setUsers(users);
        setTotalUsers(totalRecords);
        setTotalPages(Math.ceil(totalRecords / usersPerPage));

        setCursorFields((prev) => ({
          ...prev,
          lastVisible,
          pageHistory,
        }));
      } catch (error) {
        setError(error.message);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      setUsers([]);
      setIsLoading(false);
      setError("");
      resetPagination();
    };
  }, [cursorFields.direction, currentPage, filter, debouncedSearchTerm]);

  const toggleBanUser = async (email) => {
    const isBanned = bannedUsers[email];
    try {
      const user = users.find((u) => u.email === email);
      if (!user || !user.docId) {
        throw new Error("Unknown User or document ID.");
      }

      const userRef = doc(db, users_collection, user.docId);

      if (!isBanned) {
        const docRef = await addDoc(collection(db, bannedUser_collection), {
          email,
        });
        await updateDoc(userRef, { isBlocked: true });

        //update local ui
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.email === email ? { ...u, isBlocked: true } : u
          )
        );
        //Refresh filtered users when toggle blocked
        if (filter !== "all") {
          console.log("Here");
          const { users, lastVisible, pageHistory, totalRecords } =
            await fetchUsers(cursorFields.pageSize, null, "next", [], filter);

          setUsers(users);
          setTotalUsers(totalRecords);
          setTotalPages(Math.ceil(totalRecords / usersPerPage));
          setCursorFields((prev) => ({
            ...prev,
            lastVisible,
            pageHistory,
          }));
        }

        setBannedUsers((prev) => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} has been blocked.`);
      } else {
        await deleteDoc(doc(db, bannedUser_collection, isBanned));
        await updateDoc(userRef, { isBlocked: false });

        //update local UI
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.email === email ? { ...u, isBlocked: false } : u
          )
        );

        setBannedUsers((prev) => {
          const newState = { ...prev };
          delete newState[email];
          return newState;
        });
        alert(`User with email ${email} has been unblocked.`);

        //Refresh filtered users when toggle unblocked
        if (filter !== "all") {
          const { users, lastVisible, pageHistory, totalRecords } =
            await fetchUsers(cursorFields.pageSize, null, "next", [], filter);

          setUsers(users);
          setTotalUsers(totalRecords);
          setTotalPages(Math.ceil(totalRecords / usersPerPage));
          setCursorFields((prev) => ({
            ...prev,
            lastVisible,
            pageHistory,
          }));
        }
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
        const docRef = await addDoc(collection(db, adminUser_collection), {
          email,
        });
        setAdminUsers((prev) => ({ ...prev, [email]: docRef.id }));
        alert(`User with email ${email} was made admin.`);
      } else {
        await deleteDoc(doc(db, adminUser_collection, isAdmin));
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

  const changeUserType = async (email, docId, newRole) => {
    try {
      const userDocRef = doc(db, users_collection, docId);
      await updateDoc(userDocRef, { Type: newRole }); // Update the role in Firestore

      // Update the local state for roles
      setUserTypes((prev) => ({
        ...prev,
        [email]: newRole,
      }));

      alert(`User with email ${email} is now assigned the role: ${newRole}.`);
    } catch (error) {
      console.error(`Error updating role for user ${email}:`, error);
      alert(`Failed to update role for user.`);
    }
  };

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
    setCursorFields((prev) => ({
      ...prev,
      direction: "prev",
    }));
  };

  const handleClickNext = () => {
    if (currentPage >= totalPages - 1) return;

    setCurrentPage((prev) => prev + 1);
    setCursorFields((prev) => ({
      ...prev,
      direction: "next",
    }));
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
                          bannedUsers[user.email] ? "bg-red-600" : "bg-gray-300"
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
                          adminUsers[user.email] ? "bg-red-600" : "bg-gray-300"
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
                      changeUserType(user.email, user.docId, e.target.value);
                    }}
                    value={userTypes[user.email] || "Account Holder"} // Default to "Account Holder"
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
        <div className="flex justify-end">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
}
