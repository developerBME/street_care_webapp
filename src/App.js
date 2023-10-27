import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Profile from "./component/UserProfile/Profile";
import Signup2 from "./component/Signup2";
import HowToHelp from "./component/HowToHelp";
import Community from "./component/Community/Community";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CommOutForm from "./component/UserProfile/CommOutForm";
import PersonalOutForm from "./component/UserProfile/PersonalOutForm";
import Documenting from "./component/UserProfile/Documenting";
import OutreachSignup from "./component/Community/OutreachSignup";
import CreateOutreach from "./component/Community/CreateOutreach";
import HelpRequestForm from "./component/Community/HelpRequstForm";
import HelpRequestEventWindow from "./component/Community/HelpRequestEventWindow";
import DonateForm from "./component/Donate/DonateForm";
import CreditCardPayment from "./component/Donate/CreditCardPayment";

function App() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {}, []);
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setLoggedIn(true);
      // ...
    } else {
      setLoggedIn(false);
      // User is signed out
      // ...
    }
  });
  return (
    <div>
      <Router>
        <NavBar loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtohelp" element={<HowToHelp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/select-outreach" element={<Documenting />} />
          <Route path="/profile/commoutform" element={<CommOutForm />} />
          <Route path="/outreachsignup" element={<OutreachSignup />} />
          <Route path="/createOutreach" element={<CreateOutreach />} />
          <Route
            path="/helpRequestEventWindow"
            element={<HelpRequestEventWindow />}
          />
          <Route
            path="/profile/personaloutform"
            element={<PersonalOutForm />}
          />
          <Route path="/helpRequestForm" element={<HelpRequestForm />} />
          <Route path="/*" element={<Home />} />
          <Route path="/donateForm" element={<DonateForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
