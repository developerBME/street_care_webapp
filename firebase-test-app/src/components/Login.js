import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  // Importing the auth instance
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function GoogleAuth(props) {
  const [message, setMessage] = useState('');

    const handleGoogleLogin = () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then((result) => {
                // Successful login
                setMessage('Successful login');
            })
            .catch((error) => {
                // Handle error
                setMessage('Login failure');
            });
    };

    return (
      <div style={props.style}>
          <button 
              onClick={handleGoogleLogin} 
              style={{
                  background: 'white',
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '2px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
              }}
          >
              <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google Logo" 
                  width="30" 
                  style={{ marginRight: '5px' }} 
              />
              Sign in with Google
          </button>
          {message && <div>{message}</div>}
      </div>
  );
}


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");


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
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button 
          type="submit" 
          style={{ padding: "10px 15px", fontSize: "16px", borderRadius: "4px", border: "none", cursor: "pointer", backgroundColor: "#007BFF", color: "#FFF", transition: "background-color 0.3s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      {loginSuccess && <p style={{ color: "green", marginTop: "15px" }}>{loginSuccess}</p>}
      <GoogleAuth style={{ padding: '20px' }} />
    </div>
);

}

export default Login;
