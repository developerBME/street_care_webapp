import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase"; 
import collectionMapping from "../../utils/firestoreCollections"; 
import { fetchUserTypeDetails } from "../EventCardService"; 

const helpRequests_collection = collectionMapping.helpRequestsInteractionLog;

export const fetchPendingHelpRequests = async ({ sortOption = "Most Recent" } = {}) => {
   const map = {
    "Most Recent": ["lastModifiedTimestamp", "desc"],
    "Oldest First": ["lastModifiedTimestamp", "asc"],
    "Alphabetical": ["interactionLogFirstName", "asc"],
  };

  const [field, direction] = map[sortOption];
  
  const helpRequestQuery = query(
    collection(db, helpRequests_collection),
    where("status", "==", "pending"),
    orderBy(field, direction)
  );

  const snap = await getDocs(helpRequestQuery);

  const helpRequests = await Promise.all(
    snap.docs.map(async (d) => {
      const post = { id: d.id, ...d.data() };
      //const userDetails = await fetchUserTypeDetails(post.uid);
       let userDetails = null;
      if (typeof post.uid === "string" && post.uid.trim().length > 0) {
        try {
          userDetails = await fetchUserTypeDetails(post.uid);
        } catch (e) {
          userDetails = null;
          console.warn("fetchUserTypeDetails failed for uid:", post.uid, e);
        }
      } else {
        console.warn("Missing/invalid uid for helpRequest doc:", post.id, post.uid);
      }
      return {
        ...post,
        userName: userDetails?.username || "Unknown User",
        userType: userDetails?.type || "",
      };
    })
  );

  return helpRequests;
};
