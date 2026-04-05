import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./component/firebase";
import { UserProvider } from "./context/Usercontext.js";
import collectionMapping from "./utils/firestoreCollections.js";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import ScrollToTop from "./component/helper/ScrollToTop";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { ProtectedAdminRoute } from "./component/ProtectedAdminRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Regularly imported components
import Home from "./component/Home";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import Login from "./component/Login";
import Signup2 from "./component/Signup";
import ForgotPassword from "./component/UserProfile/ForgotPassword";
import Profile from "./component/UserProfile/Profile";
import ProfileSettings from "./component/UserProfile/ProfileSettings";
import UpdateProfile from "./component/UserProfile/ProfileSettings/UpdateProfile";
import UpdateEmailAddress from "./component/UserProfile/ProfileSettings/UpdateEmailAddress";
import DeleteAccount from "./component/UserProfile/ProfileSettings/DeleteAccount";
import AccSetting from "./component/UserProfile/AccSetting";
import CreateOutreachAdmin from "./component/admin_test/CreateOutreachAdmin.js";
import PostApprovals from "./component/admin_test/PostApprovals.js";
import AdminOutreachEvents from "./component/Admin/AdminOutreachEvents.js";
import AllOutreachEvents from "./component/AllOutreachEvents";
import AllPastOutreachEvents from "./component/AllPastOutreachEvents";
import AllOutreachVisitLog from "./component/AllOutreachVisitLog";
import VisitLogDetails from "./component/Community/VisitLogDetails";
import PersonalVisitLogDetails from "./component/Community/PersonalVisitLogDetails";
import TestUser from "./component/Test/Test";
import ListUser from "./component/Test/ListUser";
import SampleForm from "./component/Sample_form";
import Temp_Profile from "./component/Temp_Profile";
import CommOutForm from "./component/UserProfile/CommOutForm";
import PersonalOutForm from "./component/UserProfile/PersonalOutForm";
import Documenting from "./component/UserProfile/Documenting";
import OutreachSignup from "./component/Community/OutreachSignup";
import Newscard from "./component/HomePage/Newscard";
import ComingSoon from "./component/ComingSoon";
// import CommunityComingSoon from "./component/CommunityComingSoon";
import Readmorenews from "./component/HomePage/Readmorenews";
import EmailVerificationModal from "./component/EmailVerificationModal";
import EmailUpdateConfirmation from "./component/UserProfile/ProfileSettings/EmailUpdateConfirmation";
import DeleteAccConfirmation from "./component/UserProfile/ProfileSettings/DeleteAccConfirmation";
import TestAdmin from "./component/UserProfile/TestAdmin";
import MoreVisitLogs from "./component/Community/MoreVisitLogs";
import CreateOutreach from "./component/Community/CreateOutreach";
import AllSignedUpOutreaches from "./component/UserProfile/AllSignedUpOutreaches";
import AllLikedOutreaches from "./component/UserProfile/AllLikedOutreaches";
import AllCreatedOutreaches from "./component/UserProfile/AllCreatedOutreaches";
import InteractionLogForm from "./component/UserProfile/InteractionLogForm";

// Lazy-loaded components
const Community = lazy(() => import("./component/Community/Community"));
const HowToHelp = lazy(() => import("./component/HowtoHelp/HowToHelp"));
const AdminHomePage = lazy(() => import("./component/Admin/AdminHomePage.js"));
const UserList = lazy(() => import("./component/admin_test/UserList.js"));
const UserListNew = lazy(() => import("./component/Admin/UserListNew.js"));
const OutreachEvents = lazy(() => import("./component/Admin/OutreachEvents"));
const Not404 = lazy(() => import("./component/404"));

const users_collection = collectionMapping.users;


function App() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [firebaseUser, setFirebaseUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

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
            collection(db, users_collection),
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

  return (
    <UserProvider>
      <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
        <Router>
          <ScrollToTop />
          <NavBar
            loggedIn={loggedIn}
            photoUrl={photoUrl}
            setLoggedIn={setLoggedIn}
          />
          {/* Suspense Tag use to wrap around the Lazy Loaded Routes */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/howtohelp" element={<HowToHelp />} />
              <Route
                path="/community"
                element={<Community loggedIn={loggedIn} />}
              />
              {/* <Route path="/community" element={<CommunityComingSoon />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/signup" element={<Signup2 />} />
              <Route
                path="/admin-panel/createoutreachadmin"
                element={<CreateOutreachAdmin />}
              />
              <Route path="/allnews" element={<Newscard />} />
              <Route path="/allnews/:id" element={<Readmorenews />} />
              {/* <Route path="/user/:uid" element={<UserDetails />} /> // Route for
            user details */}
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
                  <ProtectedAdminRoute
                    user={firebaseUser}
                    loading={loadingUser}
                  />
                }
              >
                <Route path="/testAdmin" element={<TestAdmin />} />
                <Route path="/admin-panel/userlist" element={<UserList />} />
                <Route path="/admin" element={<AdminHomePage />} />
                <Route path="/admin/postApprovals" element={<PostApprovals />} />
                <Route path="/admin/userManagement" element={<UserListNew />} />
                <Route
                  path="/admin/outreach-events"
                  element={<OutreachEvents />}
                />
              </Route>
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
                  path="/profile/personaloutform"
                  element={<PersonalOutForm />}
                />
                <Route path="/createOutreach" element={<CreateOutreach />} />
              </Route>
              <Route
                path="/profile/profilesettings/deleteaccconfirmation"
                element={<DeleteAccConfirmation />}
              />
              <Route path="/profile/select-outreach" element={<Documenting />} />
              {/* <Route path="/profile/commoutform" element={<ComingSoon />} /> */}
              <Route path="/outreachsignup" element={<OutreachSignup />} />
              <Route path="/outreachsignup/:id" element={<OutreachSignup />} />
              {/* <Route path="/helpRequestEventWindow" element={<ComingSoon />} /> */}
              {/* <Route path="/helpRequestForm" element={<ComingSoon />} /> */}
              {/* <Route path="/icanhelp" element={<ComingSoon />} /> */}
              {/* <Route path="/donateForm" element={<DonateForm />} /> */}
              <Route path="/donateForm" element={<ComingSoon />} />
              <Route
                path="/allOutreachEvents"
                element={<AllOutreachEvents loggedIn={loggedIn} />}
              />
              {/* <Route path="/createBME" element={<CreateBME />} /> */}
              <Route
                path="/allPastOutreachEvents"
                element={<AllPastOutreachEvents />}
              />
              <Route
                path="profile/interactionLogForm"
                element={<InteractionLogForm />}
              />
              <Route
                path="/allOutreachVisitLog"
                element={<AllOutreachVisitLog />}
              />
              <Route
                path="profile/allSignedUpOutreaches"
                element={<AllSignedUpOutreaches />}
              />
              <Route
                path="profile/allLikedOutreaches"
                element={<AllLikedOutreaches />}
              />
              <Route
                path="profile/allCreatedOutreaches"
                element={<AllCreatedOutreaches />}
              />

              <Route path="/admin" element={<AdminHomePage />} />
              <Route
                path="/admin/adminOutreachEvents"
                element={<AdminOutreachEvents />}
              />

              <Route path="/sample_form" element={<SampleForm />} />
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
              <Route path="/test" element={<TestUser />} />
              <Route path="/list" element={<ListUser />} />
              <Route
                path="/profile/visitlogform/:id"
                element={<InteractionLogForm />}
              />
              <Route path="/myvisitlogs" element={<MoreVisitLogs />} />

              {/* Admin Routes */}
            </Routes>
          </Suspense>
          <Footer />
          <Analytics />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;