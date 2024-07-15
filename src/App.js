import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./component/firebase";

import Home from "./component/Home";
import UserList from "./component/UserList";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import ForgotPassword from "./component/UserProfile/ForgotPassword";
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
import Temp_Profile from "./component/Temp_Profile";

import { ProtectedRoute } from "./component/ProtectedRoute";
import EmailVerificationModal from "./component/EmailVerificationModal";

import Sample_form from "./component/Sample_form";
import AllHelpRequests from "./component/AllHelpRequests";
import ProfileSettings from "./component/UserProfile/ProfileSettings";
import UpdateEmailAddress from "./component/UserProfile/ProfileSettings/UpdateEmailAddress";
import DeleteAccount from "./component/UserProfile/ProfileSettings/DeleteAccount";
import PersonalVisitLogDetails from "./component/Community/PersonalVisitLogDetails";
import EmailUpdateConfirmation from "./component/UserProfile/ProfileSettings/EmailUpdateConfirmation";
import DeleteAccConfirmation from "./component/UserProfile/ProfileSettings/DeleteAccConfirmation";
import UpdateProfile from "./component/UserProfile/ProfileSettings/UpdateProfile";
import UserDetails from "./component/UserDetails";

import TestUser from "./component/Test/Test";
import ListUser from "./component/Test/ListUser";

function App() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [firebaseUser, setFirebaseUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  // console.log(firebaseUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fAuth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setLoggedIn(true);
        setFirebaseUser(user);
        setLoadingUser(false);
        try {
          const userRef = query(
            collection(db, process.env.REACT_APP_FIREBASE_USER_COLLECTION),
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
        // setLoggedIn(false);
        // User is signed out
        // ...
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <Router>
        <ScrollToTop />
        <NavBar
          loggedIn={loggedIn}
          photoUrl={photoUrl}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtohelp" element={<HowToHelp />} />
          <Route path="/community" element={<Community />} />
          {/* <Route path="/community" element={<CommunityComingSoon />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup2 />} />
          <Route path="/userlist" element={<UserList/>}/>
          <Route path="/allnews" element={<Newscard />} />
          <Route path="/allnews/:id" element={<Readmorenews />} />
          

          <Route path="/user/:uid" element={<UserDetails />} />  // Route for user details
          <Route
            path="/verifyemail"
            element={
              <EmailVerificationModal
                setLoggedIn={setLoggedIn}
                user={firebaseUser}
              />
            }
          />
          <Route
            element={
              <ProtectedRoute user={firebaseUser} loading={loadingUser} />
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/accsetting" element={<AccSetting />} />
            <Route
              path="/profile/profilesettings"
              element={<ProfileSettings />}
            />
            <Route
              path="/profile/profilesettings/updateprofile"
              element={<UpdateProfile />}
            />
            <Route
              path="/profile/profilesettings/updateemailaddress"
              element={<UpdateEmailAddress />}
            />
            <Route
              path="/profile/profilesettings/emailupdateconfirmation/:email"
              element={<EmailUpdateConfirmation />}
            />
            <Route
              path="/profile/profilesettings/deleteaccount"
              element={<DeleteAccount setLoggedIn={setLoggedIn} />}
            />

            <Route path="/profile/commoutform" element={<CommOutForm />} />
            <Route
              path="/profile/visitlogform"
              element={<PersonalOutForm />}
            />
            <Route path="/createOutreach" element={<CreateOutreach />} />
            <Route
              path="/createOutreach/:helpreqid"
              element={<CreateOutreach />}
            />
            <Route path="/helpRequestForm" element={<HelpRequestForm />} />
          </Route>
          <Route
            path="/profile/profilesettings/deleteaccconfirmation"
            element={<DeleteAccConfirmation />}
          />
          <Route path="/profile/select-outreach" element={<Documenting />} />

          {/* <Route path="/profile/commoutform" element={<ComingSoon />} /> */}

          <Route path="/outreachsignup" element={<OutreachSignup />} />
          <Route path="/outreachsignup/:id" element={<OutreachSignup />} />

          <Route
            path="/helpRequestEventWindow"
            element={<HelpRequestEventWindow />}
          />
          {/* <Route path="/helpRequestEventWindow" element={<ComingSoon />} /> */}

          {/* <Route path="/helpRequestForm" element={<ComingSoon />} /> */}
          <Route path="/community/icanhelp/:id" element={<ICanHelpForm />} />
          {/* <Route path="/icanhelp" element={<ComingSoon />} /> */}
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

          <Route path="/sample_form" element={<Sample_form />} />
          <Route path="visitLogDetails" element={<VisitLogDetails />} />
          <Route path="visitLogDetails/:id" element={<VisitLogDetails />} />
          <Route
            path="personalVisitLogDetails"
            element={<PersonalVisitLogDetails />}
          />
          <Route
            path="personalVisitLogDetails/:id"
            element={<PersonalVisitLogDetails />}
          />
          <Route path="/*" element={<Not404 />} />
          <Route path="/temp_profile" element={<Temp_Profile />} />

          <Route
            path="/community/allHelpRequests"
            element={<AllHelpRequests />}
          />

          <Route path="/community/allHelpRequests" element={<AllHelpRequests />} />

          <Route path="/test" element={<TestUser />} />
          <Route path="/list" element={<ListUser />} />
          <Route path="/profile/visitlogform/:id" element={<PersonalOutForm />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
