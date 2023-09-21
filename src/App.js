import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Profile from "./component/Home/Profile";
import Login2 from "./component/Login2";
import Signup2 from "./component/Signup2";
import HowToHelp from "./component/HowToHelp";
import Community from "./component/Community/Community";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/howtohelp" element={<HowToHelp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
