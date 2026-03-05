import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import collectionMapping from "../../utils/firestoreCollections";
import { fetchUserTypeDetails } from "../EventCardService";

const helpRequests_collection = collectionMapping.helpRequestsInteractionLog;

export const fetchPendingHelpRequests = async () => {
  const helpRequestQuery = query(
    collection(db, helpRequests_collection),
    where("status", "==", "pending"),
    orderBy("lastModifiedTimestamp", "desc"),
  );

  const snap = await getDocs(helpRequestQuery);

  const helpRequests = await Promise.all(
    snap.docs.map(async (d) => {
      const post = { id: d.id, ...d.data() };
      const userDetails = await fetchUserTypeDetails(post.uid);

      return {
        ...post,
        userName: userDetails?.username || "Unknown User",
        userType: userDetails?.type || "",
      };
    }),
  );

  return helpRequests;
};
