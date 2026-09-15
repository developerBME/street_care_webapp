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
  sortDirection = "desc",
}) {
  const base = [
    collection(db, collectionName),
    where("status", "==", "pending"), // TODO: change
    orderBy(orderField, sortDirection),

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

const valueAtPath = (value, path) =>
  path.split(".").reduce((current, key) => current?.[key], value);

const searchableText = (value) => {
  if (Array.isArray(value)) return value.join(" ");
  return value == null ? "" : String(value);
};

// Firestore has no native case-insensitive contains-across-fields query. For an
// active search we still constrain/order on the backend, enrich the documents,
// then apply the configurable multi-field match before slicing the requested page.
export async function fetchPendingSearchPage({
  collectionName,
  orderField,
  sortField = orderField,
  sortDirection = "desc",
  searchTerm,
  searchFields,
  pageSize,
  page,
}) {
  const q = query(
    collection(db, collectionName),
    where("status", "==", "pending"),
    orderBy(orderField, sortDirection),
  );
  const snap = await getDocs(q);
  const needle = searchTerm.trim().toLocaleLowerCase();
  const enriched = await Promise.all(
    snap.docs.map(async (d) => {
      const post = { id: d.id, ...d.data() };
      const userDetails = post.uid || post.userId
        ? await fetchUserTypeDetails(post.uid || post.userId)
        : null;
      return {
        ...post,
        userName: userDetails?.username || "Unknown User",
        userType: userDetails?.type || "",
        photoUrl: userDetails?.photoUrl || "",
      };
    }),
  );
  const matches = enriched.filter((post) =>
    searchFields.some((field) =>
      searchableText(valueAtPath(post, field)).toLocaleLowerCase().includes(needle),
    ),
  );
  matches.sort((left, right) => {
    const leftValue = valueAtPath(left, sortField);
    const rightValue = valueAtPath(right, sortField);
    const normalize = (value) => {
      if (typeof value?.toMillis === "function") return value.toMillis();
      if (value?.seconds != null) return value.seconds;
      return searchableText(value).toLocaleLowerCase();
    };
    const comparison = normalize(leftValue) > normalize(rightValue) ? 1
      : normalize(leftValue) < normalize(rightValue) ? -1 : 0;
    return sortDirection === "asc" ? comparison : -comparison;
  });
  const start = (page - 1) * pageSize;
  return { posts: matches.slice(start, start + pageSize), total: matches.length };
}
