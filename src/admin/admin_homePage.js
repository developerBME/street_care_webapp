
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../component/firebase";
import NavBar from "../component/Navbar";
import Footer from "../component/Footer";
import Admin_Dashboard from "./admin_dashboard";
import Admin_NavBar from "./admin_Navbar";
import Admin_Footer from "./admin_footer";

function Admin_HomePage() {
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
        <Admin_NavBar
          loggedIn={loggedIn}
          photoUrl={photoUrl}
          setLoggedIn={setLoggedIn}
        />
        
        <Admin_Dashboard />

        {/* <Admin_Footer /> */}
    </div>
  );
}

export default Admin_HomePage;