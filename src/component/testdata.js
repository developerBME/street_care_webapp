import React from "react";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function CopyVisitLogBook() {
  async function copyDocs() {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first!");
      return;
    }
    const fromCol = collection(db, "VisitLogBook_New");
    const toCol = "VisitLogBook_dev";
    const snapshot = await getDocs(fromCol);
    for (let d of snapshot.docs) {
      await setDoc(doc(db, toCol, d.id), d.data());
      console.log("Copied doc", d.id);
    }
    alert("✅ Done copying test data!");
  }

  return (
    <button
      onClick={copyDocs}
      style={{
        position: "fixed",
        bottom: 50,
        right: 50,
        zIndex: 9999,
        padding: "1em",
        background: "#1F0A58",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Copy VisitLogBook Data
    </button>
  );
}
