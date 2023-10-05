import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { auth, db } from "./firebase"; // Importing the auth instance
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";



import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";

const handleGoogleSignIn = async(e) => {
  e.preventDefault();
  console.log("Google Signup")

  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    // Check if document exists in the user collection:
    const ref = doc(db, 'users', user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection")
      // console.log("Document data:", docSnap.data());

    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: 'Web',
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid
      };
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message

  }catch (error){
    
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  }

}

const handleFacebookSignIn = async(e) => {
  e.preventDefault();
  console.log("Facebook Signup")

  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;

    // Check if document exists in the user collection:
    const ref = doc(db, 'users', user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection")
      // console.log("Document data:", docSnap.data());

    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: 'Web',
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid
      };
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message

  }catch (error){
    
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
  }

}

const handleTwitterSignIn = async(e) => {e.preventDefault();
  console.log("Twitter Signup")

  try {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;
    console.log(user)

    // Check if document exists in the user collection:
    const ref = doc(db, 'users', user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection")
      // console.log("Document data:", docSnap.data());

    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: 'Web',
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid
      };
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message

  }catch (error){
    
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
  }

}


function Signup2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");

  
  // Check if user is already logged in:
  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => { // Checks Login status for Redirection
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      navigate("/profile", { replace: true });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  // const handleGoogleSignIn = async(e) => {
  //     e.preventDefault();
  //     console.log("Google Signup")

  //     try {
  //       const provider = new GoogleAuthProvider();
  //       const auth = getAuth();
  //       const result = await signInWithPopup(auth, provider);
        
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       // const credential = GoogleAuthProvider.credentialFromResult(result);
  //       // const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  
  //       // Check if document exists in the user collection:
  //       const ref = doc(db, 'users', user.uid);
  //       const docSnap = await getDoc(ref);
  //       if (docSnap.exists()) {
  //         // No need to update, just leave a logged in state
  //         console.log("User exists in the collection")
  //         // console.log("Document data:", docSnap.data());

  //       } else {
  //         // Create the document and leave a logged in state
  //         console.log("User does not exist in the collection");
  //         const userData = {
  //           dateCreated: new Date(),
  //           deviceType: 'Web',
  //           email: user.email,
  //           isValid: true,
  //           //organization: company,
  //           username: user.displayName,
  //           uid: user.uid
  //         };
  //         const userRef = doc(db, 'users', user.uid);
  //         setDoc(userRef, userData);
  //       }
  
  //       setTimeout(() => {
  //         navigate("/profile");
  //       }, 6000); // Wait for 2 seconds to let the user see the success message

  //     }catch (error){
        
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     }
  
  //   }

  // const handleFacebookSignIn = async(e) => {
  //     e.preventDefault();
  //     console.log("Facebook Signup")

  //     try {
  //       const provider = new FacebookAuthProvider();
  //       const auth = getAuth();
  //       const result = await signInWithPopup(auth, provider);
        
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const user = result.user;
  
  //       // Check if document exists in the user collection:
  //       const ref = doc(db, 'users', user.uid);
  //       const docSnap = await getDoc(ref);
  //       if (docSnap.exists()) {
  //         // No need to update, just leave a logged in state
  //         console.log("User exists in the collection")
  //         // console.log("Document data:", docSnap.data());

  //       } else {
  //         // Create the document and leave a logged in state
  //         console.log("User does not exist in the collection");
  //         const userData = {
  //           dateCreated: new Date(),
  //           deviceType: 'Web',
  //           email: user.email,
  //           isValid: true,
  //           //organization: company,
  //           username: user.displayName,
  //           uid: user.uid
  //         };
  //         const userRef = doc(db, 'users', user.uid);
  //         setDoc(userRef, userData);
  //       }
  
  //       // setTimeout(() => {
  //       //   navigate("/profile");
  //       // }, 6000); // Wait for 2 seconds to let the user see the success message

  //     }catch (error){
        
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);
  //     }
  
  //   }

  // const handleTwitterSignIn = async(e) => {e.preventDefault();
  //   console.log("Twitter Signup")

  //   try {
  //     const provider = new TwitterAuthProvider();
  //     const auth = getAuth();
  //     const result = await signInWithPopup(auth, provider);
      
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const user = result.user;
  //     console.log(user)

  //     // Check if document exists in the user collection:
  //     const ref = doc(db, 'users', user.uid);
  //     const docSnap = await getDoc(ref);
  //     if (docSnap.exists()) {
  //       // No need to update, just leave a logged in state
  //       console.log("User exists in the collection")
  //       // console.log("Document data:", docSnap.data());

  //     } else {
  //       // Create the document and leave a logged in state
  //       console.log("User does not exist in the collection");
  //       const userData = {
  //         dateCreated: new Date(),
  //         deviceType: 'Web',
  //         email: user.email,
  //         isValid: true,
  //         //organization: company,
  //         username: user.displayName,
  //         uid: user.uid
  //       };
  //       const userRef = doc(db, 'users', user.uid);
  //       setDoc(userRef, userData);
  //     }

  //     // setTimeout(() => {
  //     //   navigate("/profile");
  //     // }, 6000); // Wait for 2 seconds to let the user see the success message

  //   }catch (error){
      
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = TwitterAuthProvider.credentialFromError(error);
  //   }

  // }


const handleSignUp = async (e) => {
  e.preventDefault();
  if (!userName) {
    setError('Username is Mandatory');
    return;
  }
  if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    setError('Enter Valid Email Address');
    return;
  }
  if (!password) {
    setError('Password is Mandatory');
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user;

    const userData = {
      dateCreated: new Date(),
      deviceType: 'Web',
      email: email,
      isValid: true,
      //organization: company,
      username: userName,
      uid: currentUser.uid
    };

    //await firestore.collection('users').doc(currentUser.uid).set(userData);
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, userData);



    // Clear inputs or navigate to a different page
    setUserName('');
    setEmail('');
    setPassword('');
    //setCompany('');
    setLoginSuccess("Successfully signed up!");
    setError(""); // Clear out any existing error messages

    setTimeout(() => {
      navigate("/profile");
    }, 6000); // Wait for 2 seconds to let the user see the success message

  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Account already exists, please Log in.");
    } else {
      setError(error.message);
    }
    setLoginSuccess(""); // Clear out any success messages
  }
};



  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center px-4 py-8 lg:px-32 lg:py-20 h-full w-full mx-auto rounded-2xl ">
            {/* form */}
            <form id="login" onSubmit={handleSignUp}>
              <div className="w-fit text-neutral-800 text-5xl font-medium font-bricolage leading-[64px]">
                Sign up
              </div>
              <div className=" h-fit mt-14 flex flex-col justify-start items-start gap-9 ">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal" onClick={handleGoogleSignIn}>
                    <button
                      type="submit"
                    >
                      Continue with Google
                    </button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <FcGoogle size={32} />
                    </div>
                  </div>
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal" onClick={handleFacebookSignIn}>
                    <button
                      type="submit"
                    >
                      Continue with Facebook
                    </button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <AiFillApple size={32} />
                    </div>
                  </div>
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal" onClick={handleTwitterSignIn}>
                    <button
                      type="submit"
                    >
                      Continue with Twitter
                    </button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <FcGoogle size={32} />
                    </div>
                  </div>
                  {/* <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-neutral-600 text-lg font-semibold font-inter leading-normal">
                      Continue with Facebook
                    </div>
                    <div className="w-8 h-8 left-[23.50px] top-[12px] absolute">
                      <div className="w-7 h-7 left-[2px] top-[2px] absolute bg-gradient-to-b from-sky-500 to-blue-700 rounded-full" />
                    </div>
                  </div> */}
                </div>
                <div className="w-[360px] justify-start items-center gap-[13px] inline-flex">
                  <div className="w-40 h-[0px] border border-neutral-200"></div>
                  <div className="text-neutral-900 text-[15px] font-normal font-inter leading-snug">
                    or
                  </div>
                  <div className="w-40 h-[0px] border border-neutral-200"></div>
                </div>
                <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px] font-semibold font-inter leading-tight">
                      Email*
                    </div>
                    <div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className="text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug"
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px]  font-semibold font-inter leading-tight">
                      Password*
                    </div>
                    <div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          className="text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px]  font-semibold font-inter leading-tight">
                      What should we call you?*
                    </div>
                    <div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="text"
                          id="name"
                          placeholder="Enter your profile name"
                          className="text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug"
                          onChange={(e) => setUserName(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-center mt-4 mb-4">
                {error && <p className="text-red-500">{error}</p>}
                {loginSuccess && <p className="text-green-500">{loginSuccess}</p>}
              </div>
              <div className="self-stretch my-14 h-14 flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className="grow shrink basis-0 h-14 px-8 py-4 bg-violet-700 rounded-[100px] text-center text-neutral-100 text-lg font-semibold font-inter leading-normal"
                  >
                    Sign up with email
                  </button>
                </div>
              </div>
              <div className="w-fit text-center mx-auto">
                <span className="text-zinc-700 text-base font-normal font-open-sans leading-normal">
                  Already have an account?{" "}
                </span>
                <span  onClick={() => {
                    navigate("/login");
                  }} className="text-violet-600 text-base font-normal font-open-sans leading-normal cursor-pointer">
                  Log in
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup2;
export { handleGoogleSignIn, handleFacebookSignIn, handleTwitterSignIn};