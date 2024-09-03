
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../component/firebase";
// import AdminNavBar from "../component/Navbar";
// import AdminFooter from "../component/Footer";
import AdminDashboard from "./AdminDashboard";
//import AdminNavBar from "./AdminNavbar";
//import AdminFooter from "./admin_footer";

function AdminHomePage() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [firebaseUser, setFirebaseUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fAuth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setFirebaseUser(user);
        setLoadingUser(false);
        try {
          const userRef = query(
            collection(db, "users"),
            where("uid", "==", fAuth?.currentUser?.uid)
          );
          const data = await getDocs(userRef);
          if (typeof data.docs[0] == "undefined") {
            setPhotoUrl("");
            console.log("UNDEFINED");
          } else {
            setPhotoUrl(data.docs[0].data().photoUrl);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return(
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      {/* <AdminNavBar
        loggedIn={loggedIn}
        photoUrl={photoUrl}
        setLoggedIn={setLoggedIn}
        /> */}
        
        <AdminDashboard />

        {/* <AdminFooter /> */}
    </div>
  );
}

export default AdminHomePage;