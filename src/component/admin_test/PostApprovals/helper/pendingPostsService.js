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

// Use the browser's local calendar date, just like the dates shown on the cards.
const searchableDate = (value) => {
  if (value == null || value === "") return "";
  let date;
  if (typeof value?.toDate === "function") date = value.toDate();
  else if (typeof value?.seconds === "number") date = new Date(value.seconds * 1000);
  else if (value instanceof Date) date = value;
  else if (typeof value === "string" || typeof value === "number") {
    date = new Date(typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? `${value}T00:00:00`
      : value);
  }
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [
    `${year}-${month}-${day}`,
    `${month}/${day}/${year}`,
    date.toLocaleDateString("en-US"),
    date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  ].join(" ");
};

const normalizeSearchText = (value) => value.toLocaleLowerCase().replace(/,/g, " ");

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
  searchDateFields = [],
  pageSize,
  page,
}) {
  const q = query(
    collection(db, collectionName),
    where("status", "==", "pending"),
    orderBy(orderField, sortDirection),
  );
  const snap = await getDocs(q);
  const terms = normalizeSearchText(searchTerm.trim()).split(/\s+/).filter(Boolean);
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
  const matches = enriched.filter((post) => {
    const text = normalizeSearchText([
      ...searchFields.map((field) => searchableText(valueAtPath(post, field))),
      ...searchDateFields.map((field) => searchableDate(valueAtPath(post, field))),
    ].join(" "));
    // Match every word so full names and city/state searches work across fields.
    return terms.every((term) => text.includes(term));
  });
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
