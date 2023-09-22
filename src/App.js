import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Profile from "./component/HomePage/Profile";
import Signup2 from "./component/Signup2";
import HowToHelp from "./component/HowToHelp";
import Community from "./component/Community/Community";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import React , {useEffect , useState} from "react";

function App() {
  const fAuth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
  }, []);
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setLoggedIn(true)
      // ...
    } else {
      setLoggedIn(false)
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
