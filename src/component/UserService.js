import {
  collection,
  query,
  where,
  startAfter,
  limit,
  and,
  getDocs,
  getCountFromServer,
  orderBy,
  documentId,
} from "firebase/firestore";
import { db } from "./firebase";

const USERS_COLLECTION = "users";

export const fetchUsers = async (
  pageSize,
  lastVisible,
  direction = "next",
  pageHistory = [],
  filter = "all",
  searchTerm = ""
) => {
  try {
    let baseQueryForCount;
    let usersQuery;

    const baseConditions = [];

    // Apply isBlocked filter if not "all"
    if (filter === true) {
      baseConditions.push(where("isBlocked", "==", true));
    } else if (filter === false) {
      baseConditions.push(where("isBlocked", "==", false));
    }

    // Apply username search if provided
    if (searchTerm.trim() !== "") {
      baseConditions.push(
        and(
          where("username", ">=", searchTerm.trim()),
          where("username", "<=", searchTerm.trim() + "\uf8ff")
        )
      );
    }

    baseQueryForCount = query(
      collection(db, USERS_COLLECTION),
      ...baseConditions
    );

    usersQuery = query(
      collection(db, USERS_COLLECTION),
      ...baseConditions,
      limit(pageSize)
    );

    // Get total records count
    const totalRecordsSnapshot = await getCountFromServer(baseQueryForCount);
    const totalRecords = totalRecordsSnapshot.data().count;

    // Apply pagination
    if (lastVisible && direction === "next") {
      usersQuery = query(usersQuery, startAfter(lastVisible));
    } else if (direction === "prev" && pageHistory.length > 2) {
      // For 'prev', we need to go back in pageHistory to get the correct startAfter document
      usersQuery = query(
        usersQuery,
        startAfter(pageHistory[pageHistory.length - 3])
      );
    }
    const userSnapshot = await getDocs(usersQuery);
    const users = userSnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    const lastDoc = userSnapshot.docs[userSnapshot.docs.length - 1] || null;

    let newPageHistory = [...pageHistory];
    if (direction === "next") {
      newPageHistory.push(lastDoc);
    } else if (direction === "prev") {
      newPageHistory.pop();
    }

    return {
      users,
      lastVisible: lastDoc,
      pageHistory: newPageHistory,
      totalRecords,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

fetchUsers(10, null, "next", []);
