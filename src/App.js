import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./component/firebase";
import { UserProvider } from "./context/Usercontext.js";
import collectionMapping from "./utils/firestoreCollections.js";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ScrollToTop from "./component/helper/ScrollToTop";
// import CommunityComingSoon from "./component/CommunityComingSoon";
import { ProtectedRoute } from "./component/ProtectedRoute";

import { ProtectedAdminRoute } from "./component/ProtectedAdminRoute";

const AdminHomePage = lazy(() => import("./component/Admin/AdminHomePage.js"));
const Home = lazy(() => import("./component/Home"));
const About = lazy(() => import("./component/About/About"));
const Contact = lazy(() => import("./component/Contact/Contact"));
const Community = lazy(() => import("./component/Community/Community"));
const Login = lazy(() => import("./component/Login"));
const Signup2 = lazy(() => import("./component/Signup"));
const ForgotPassword = lazy(() => import("./component/UserProfile/ForgotPassword"));
const Profile = lazy(() => import("./component/UserProfile/Profile"));
const ProfileSettings = lazy(() => import("./component/UserProfile/ProfileSettings"));
const UpdateProfile = lazy(() => import("./component/UserProfile/ProfileSettings/UpdateProfile"));
const UpdateEmailAddress = lazy(() => import("./component/UserProfile/ProfileSettings/UpdateEmailAddress"));
const DeleteAccount = lazy(() => import("./component/UserProfile/ProfileSettings/DeleteAccount"));
const AccSetting = lazy(() => import("./component/UserProfile/AccSetting"));
const UserList = lazy(() => import("./component/admin_test/UserList.js"));
const UserListNew = lazy(() => import("./component/Admin/UserListNew.js"));
const CreateOutreachAdmin = lazy(() => import("./component/admin_test/CreateOutreachAdmin.js"));
const PostApprovals = lazy(() => import("./component/admin_test/PostApprovals.js"));
const OutreachEvents = lazy(() => import("./component/Admin/OutreachEvents"));
const AdminOutreachEvents = lazy(() => import("./component/Admin/AdminOutreachEvents.js"));
const AllOutreachEvents = lazy(() => import("./component/AllOutreachEvents"));
const AllPastOutreachEvents = lazy(() => import("./component/AllPastOutreachEvents"));
const AllOutreachVisitLog = lazy(() => import("./component/AllOutreachVisitLog"));
const VisitLogDetails = lazy(() => import("./component/Community/VisitLogDetails"));
const PersonalVisitLogDetails = lazy(() => import("./component/Community/PersonalVisitLogDetails"));
const TestUser = lazy(() => import("./component/Test/Test"));
const ListUser = lazy(() => import("./component/Test/ListUser"));
const SampleForm = lazy(() => import("./component/Sample_form"));
const Temp_Profile = lazy(() => import("./component/Temp_Profile"));
const Not404 = lazy(() => import("./component/404"));
const HowToHelp = lazy(() => import("./component/HowtoHelp/HowToHelp"));
const CommOutForm = lazy(() => import("./component/UserProfile/CommOutForm"));
const PersonalOutForm = lazy(() => import("./component/UserProfile/PersonalOutForm"));
const Documenting = lazy(() => import("./component/UserProfile/Documenting"));
const OutreachSignup = lazy(() => import("./component/Community/OutreachSignup"));
const Newscard = lazy(() => import("./component/HomePage/Newscard"));
const ComingSoon = lazy(() => import("./component/ComingSoon"));
const Readmorenews = lazy(() => import("./component/HomePage/Readmorenews"));
const EmailVerificationModal = lazy(() => import("./component/EmailVerificationModal"));
const EmailUpdateConfirmation = lazy(() => import("./component/UserProfile/ProfileSettings/EmailUpdateConfirmation"));
const DeleteAccConfirmation = lazy(() => import("./component/UserProfile/ProfileSettings/DeleteAccConfirmation"));
const TestAdmin = lazy(() => import("./component/UserProfile/TestAdmin"));
const MoreVisitLogs = lazy(() => import("./component/Community/MoreVisitLogs"));
const CreateOutreach = lazy(() => import("./component/Community/CreateOutreach"));
const AllSignedUpOutreaches = lazy(() => import("./component/UserProfile/AllSignedUpOutreaches"));
const AllLikedOutreaches = lazy(() => import("./component/UserProfile/AllLikedOutreaches"));
const AllCreatedOutreaches = lazy(() => import("./component/UserProfile/AllCreatedOutreaches"));
const InteractionLogForm = lazy(() => import("./component/UserProfile/InteractionLogForm"));

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
