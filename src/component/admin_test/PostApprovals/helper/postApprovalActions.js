import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
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
        status: "approved",
        lastModifiedTimestamp: serverTimestamp(),
        lastActionPerformed: "approved",
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
        status: "rejected",
        lastModifiedTimestamp: serverTimestamp(),
        lastActionPerformed: "rejected",
      });
    } catch (error) {
      console.error(`Rejection failed for item: ${id}`, error);
    }
  }
}
//Approve / Reject Single Post fnc not needed
//Instead pass the postId in agrs of approve/rejectSelectedPosts as [postId]
export async function approveSinglePost({ collectionMap, activeTab, postId }) {
  const collectionName = collectionMap[activeTab];

  try {
    await updateDoc(doc(db, collectionName, postId), {
      status: "approved",
      lastModifiedTimestamp: serverTimestamp(),
      lastActionPerformed: "approved",
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
      status: "rejected",
      lastModifiedTimestamp: serverTimestamp(),
      lastActionPerformed: "rejected",
    });
  } catch (error) {
    console.error(`Rejection failed for item: ${postId}`, error);
    throw error;
  }
}
//TODO: Update last modified Timestamp too.
