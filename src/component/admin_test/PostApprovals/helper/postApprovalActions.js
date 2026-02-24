import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function approveSelectedPosts({
  collectionMap,
  activeTab,
  selectedItems,
}) {
  const collectionName = collectionMap[activeTab];

  for (const id of selectedItems) {
    try {
      await updateDoc(doc(db, collectionName, id), {
        approved: true,
        status: "approved",
      });
    } catch (error) {
      console.error(`Approval failed for item: ${id}`, error);
    }
  }
}

export async function rejectSelectedPosts({
  collectionMap,
  activeTab,
  selectedItems,
}) {
  const collectionName = collectionMap[activeTab];

  for (const id of selectedItems) {
    try {
      await updateDoc(doc(db, collectionName, id), {
        approved: false,
        status: "rejected",
      });
    } catch (error) {
      console.error(`Rejection failed for item: ${id}`, error);
    }
  }
}

export async function approveSinglePost({ collectionMap, activeTab, postId }) {
  const collectionName = collectionMap[activeTab];

  try {
    await updateDoc(doc(db, collectionName, postId), {
      approved: true,
      status: "approved",
    });
  } catch (error) {
    console.error(`Approval failed for item: ${postId}`, error);
    throw error;
  }
}

export async function rejectSinglePost({ collectionMap, activeTab, postId }) {
  const collectionName = collectionMap[activeTab];

  try {
    await updateDoc(doc(db, collectionName, postId), {
      approved: false,
      status: "rejected",
    });
  } catch (error) {
    console.error(`Rejection failed for item: ${postId}`, error);
    throw error;
  }
}
