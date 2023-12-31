import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./component/firebase";

import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Profile from "./component/UserProfile/Profile";
import Signup2 from "./component/Signup";
import HowToHelp from "./component/HowtoHelp/HowToHelp";
import Community from "./component/Community/Community";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CommOutForm from "./component/UserProfile/CommOutForm";
import PersonalOutForm from "./component/UserProfile/PersonalOutForm";
import Documenting from "./component/UserProfile/Documenting";
import AccSetting from "./component/UserProfile/AccSetting";
import OutreachSignup from "./component/Community/OutreachSignup";
import CreateOutreach from "./component/Community/CreateOutreach";
import HelpRequestForm from "./component/Community/HelpRequstForm";
import HelpRequestEventWindow from "./component/Community/HelpRequestEventWindow";
import DonateForm from "./component/Donate/DonateForm";
import AllOutreachEvents from "./component/AllOutreachEvents";
import AllPastOutreachEvents from "./component/AllPastOutreachEvents";
import AllOutreachVisitLog from "./component/AllOutreachVisitLog";
//import CreateBME from "./component/Community/CreateBME";
import ScrollToTop from "./component/helper/ScrollToTop";
import Not404 from "./component/404";
import Newscard from "./component/HomePage/Newscard";
import ComingSoon from "./component/ComingSoon";
import Readmorenews from "./component/HomePage/Readmorenews";
import ICanHelpForm from "./component/Community/ICanHelpForm";
import CommunityComingSoon from "./component/CommunityComingSoon";
import VisitLogDetails from "./component/Community/VisitLogDetails";
import Test from "./component/UserProfile/Test";

function App() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {}, []);
  onAuthStateChanged(fAuth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setLoggedIn(true);
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

      // if (fAuth?.currentUser?.providerData[0].providerId === 'google.com') {
      //   setPhotoUrl(fAuth?.currentUser?.photoURL.toString().substring(0,fAuth?.currentUser?.photoURL.toString().indexOf("=")+1) + "s224-c");
      // } else if (fAuth?.currentUser?.providerData[0].providerId === 'twitter.com'){
      //   setPhotoUrl(fAuth?.currentUser?.photoURL.toString().substring(0,fAuth?.currentUser?.photoURL.toString().indexOf("_normal")) + ".png");
      // } else if (fAuth?.currentUser?.providerData[0].providerId === 'facebook.com'){
      //   setPhotoUrl(fAuth?.currentUser?.photoURL.toString());
      // } else {
      //   setPhotoUrl("")
      // }
      // ...
    } else {
      setLoggedIn(false);
      // User is signed out
      // ...
    }
  });
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <Router>
        <ScrollToTop />
        <NavBar loggedIn={loggedIn} photoUrl={photoUrl} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtohelp" element={<HowToHelp />} />
          <Route path="/community" element={<Community />} />
          {/* <Route path="/community" element={<CommunityComingSoon />} /> */}
          <Route path="/contact" element={<ComingSoon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup2 />} />
          <Route path="/allnews" element={<Newscard />} />
          <Route path="/allnews/:id" element={<Readmorenews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/select-outreach" element={<Documenting />} />
          <Route path="/profile/commoutform" element={<CommOutForm />} />
          {/* <Route path="/profile/commoutform" element={<ComingSoon />} /> */}
          <Route
            path="/profile/personaloutform"
            element={<PersonalOutForm />}
          />
          <Route path="/outreachsignup" element={<OutreachSignup />} />
          <Route path="/outreachsignup/:id" element={<OutreachSignup />} />
          <Route path="/createOutreach" element={<CreateOutreach />} />
          <Route
            path="/createOutreach/:helpreqid"
            element={<CreateOutreach />}
          />
          <Route path="/profile/accsetting" element={<AccSetting />} />
          <Route
            path="/helpRequestEventWindow"
            element={<HelpRequestEventWindow />}
          />
          {/* <Route path="/helpRequestEventWindow" element={<ComingSoon />} /> */}
          <Route path="/helpRequestForm" element={<HelpRequestForm />} />
          {/* <Route path="/helpRequestForm" element={<ComingSoon />} /> */}
          {/* <Route path="/icanhelp/:id" element={<ICanHelpForm />} /> */}
          <Route path="/icanhelp" element={<ComingSoon />} />
          {/* <Route path="/donateForm" element={<DonateForm />} /> */}
          <Route path="/donateForm" element={<ComingSoon />} />
          <Route path="/allOutreachEvents" element={<AllOutreachEvents />} />
          {/* <Route path="/createBME" element={<CreateBME />} /> */}
          <Route
            path="/allPastOutreachEvents"
            element={<AllPastOutreachEvents />}
          />
          <Route
            path="/allOutreachVisitLog"
            element={<AllOutreachVisitLog />}
          />
          <Route path="visitLogDetails" element={<VisitLogDetails />} />
          <Route path="visitLogDetails/:id" element={<VisitLogDetails />} />
          <Route path="/*" element={<Not404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
