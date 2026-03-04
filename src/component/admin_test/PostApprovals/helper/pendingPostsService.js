import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
  startAfter,
} from "firebase/firestore";
import { db } from "../../../firebase";

import { fetchUserTypeDetails } from "../../../EventCardService";

export async function fetchPendingCount({ collectionName }) {
  const q = query(
    collection(db, collectionName),
    where("status", "==", "pending"),
  );
  const snap = await getCountFromServer(q);
  return snap.data().count;
}

export async function fetchPendingPage({
  collectionName,
  orderField,
  pageSize,
  cursor, // anchor object: null OR { orderValue: any }
}) {
  const base = [
    collection(db, collectionName),
    where("status", "==", "pending"), // TODO: change
    orderBy(orderField, "desc"),

    limit(pageSize),
  ];
  const q = cursor
    ? query(...base, startAfter(cursor.docSnapshot))
    : query(...base);

  const snap = await getDocs(q);
  const posts = await Promise.all(
    snap.docs.map(async (d) => {
      const post = { id: d.id, ...d.data() };
      const userDetails =
        post.uid || post.userId
          ? await fetchUserTypeDetails(post.uid || post.userId)
          : null;
      // console.log("UserDetails:", userDetails);
      return {
        ...post,
        userName: userDetails?.username || "Unknown User",
        userType: userDetails?.type || "",
        photoUrl: userDetails?.photoUrl || "",
      };
    }),
  );

  const lastDoc = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;

  const nextCursor = lastDoc
    ? {
        id: lastDoc.id,
        docSnapshot: lastDoc,
        orderValue: lastDoc.get(orderField),
      }
    : null;

  return { posts, nextCursor };
}
