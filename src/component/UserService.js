import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    getCountFromServer,
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  const USERS_COLLECTION = "users";
  const ADMIN_COLLECTION = "adminUsers";
  const BANNED_USER_COLLECTION = "bannedUser";

  export const fetchUsers = async (
    pageSize,
    lastVisible,
    direction="next",
    pageHistory=[]
  ) => {
    try{
        let usersQuery = query(collection(db, USERS_COLLECTION),
                                orderBy("username", "asc"),
                                limit(pageSize)
                                );
        
        if(lastVisible && direction === "next"){
            usersQuery = query(usersQuery, startAfter(lastVisible));
        } else if(direction === "prev" && pageHistory.length > 2){
            usersQuery = query(usersQuery, startAfter(pageHistory[pageHistory.length-3]));
        }
        
        const userSnapshot = await getDocs(usersQuery);
        const users = userSnapshot.docs.map((doc) => ({docId: doc.id, ...doc.data()}));

        const userEmails = users.map((user) => user.email);

        const adminQuery = query(collection(db, ADMIN_COLLECTION), where("email", "in", userEmails));
        const bannedQuery = query(collection(db, BANNED_USER_COLLECTION), where("email", "in", userEmails));

        const [adminSnapshot, bannedSnapshot, totalRecordsSnapshot] = await Promise.all([
            getDocs(adminQuery),
            getDocs(bannedQuery),
            getCountFromServer(collection(db, USERS_COLLECTION))
        ]);

        const totalRecords = totalRecordsSnapshot.data().count;

        const adminEmails = new Set(adminSnapshot.docs.map((doc) => doc.data().email));
        const bannedEmails = new Set(bannedSnapshot.docs.map((doc) => doc.data().email));

        users.forEach((user) =>{
            user.isAdmin = adminEmails.has(user.email);
            user.isbanned = bannedEmails.has(user.email);
        });

        const lastDoc = userSnapshot.docs.length > 0 ? userSnapshot.docs[userSnapshot.docs.length -1] : null;

        if(direction === "next"){
            pageHistory.push(lastVisible);
        }else{
            pageHistory.pop();
        }

        console.log("users from UserService.js", users);
        console.log("lastVisible from UserService.js", lastDoc);
        console.log("Page History from UserService.js", pageHistory);
        console.log("totalRecords from UserService.js", totalRecords);

        return {
            users,
            lastVisible: lastDoc,
            pageHistory,
            totalRecords
        };
    }catch(error){
        console.error("Error fetching users from fetchUsers in UserService.js", error);
        throw error;
    }
  };

  fetchUsers(10, null, 'next', []);