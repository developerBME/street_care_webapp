import React, { useState , useEffect} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Importing the auth instance
import { getAuth, signInWithPopup, GoogleAuthProvider , onAuthStateChanged} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { SimCard } from "@mui/icons-material";

// function GoogleAuth(props) {
//   const [message, setMessage] = useState("");

//   const handleGoogleLogin = () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // Successful login
//         setMessage("Successful login");
//       })
//       .catch((error) => {
//         // Handle error
//         setMessage("Login failure");
//       });
//   };

//   return (
//     <div style={props.style}>
//       <button
//         onClick={handleGoogleLogin}
//         style={{
//           background: "white",
//           padding: "10px 15px",
//           border: "none",
//           borderRadius: "2px",
//           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src="https://developers.google.com/identity/images/g-logo.png"
//           alt="Google Logo"
//           width="30"
//           style={{ marginRight: "5px" }}
//         />
//         Sign in with Google
//       </button>
//       {message && <div>{message}</div>}
//     </div>
//   );
// }

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");
  const fAuth = getAuth();
  let navigate = useNavigate();
  useEffect(() => {
  }, []);
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      navigate("/", { replace: true });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess("Successfully logged in!");
      setError(""); // Clearing out any existing error messages
    } catch (error) {
      setError(error.message);
      setLoginSuccess(""); // Clearing out any success messages
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed ">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          <p>Login</p>
          <form id="login" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br></br>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            <button type="submit">Submit</button>
          </form>
          {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
          {loginSuccess && (
            <p style={{ color: "green", marginTop: "15px" }}>{loginSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
