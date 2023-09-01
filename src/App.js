import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./component/Home";
import logo from "./logo.png";

function App() {
  return (
    // <div className="bg-black text-white justify-center w-screen h-screen">
    //   <img src={logo} alt="logo" />
    //   <p className="text-xl p-3">
    //     Use <code>feature</code> branch to push your changes / make pull
    //     request. Let's keep <code>main</code> branch clear for now.
    //   </p>
    //   <p className="text-xl p-3">
    //     We will push to main on a feature basis, once we are done with homepage,
    //     we will push it to main and later on use main branch to deploy our app.
    //   </p>
    //   <p className="text-xl p-3">
    //     {" "}
    //     Also if majority of developers are comfortable using Vite instead of
    //     CRA, you can replace this boilerplate app with a Vite App before
    //     starting to work on the project.
    //   </p>
    // </div>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
