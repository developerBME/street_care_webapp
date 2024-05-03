import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "./firebase"; // Importing the auth instance
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

import { FcGoogle } from "react-icons/fc";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";

import { RiTwitterXFill } from "react-icons/ri";
import errorImg from "../images/error.png";
import { emailConfirmation } from "./EmailService";
import CustomButton from "./Buttons/CustomButton";

const handleGoogleSignIn = async (e) => {
  e.preventDefault();
  console.log("Google Signup");

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
    const ref = doc(db, "users", user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection");
      // console.log("Document data:", docSnap.data());
    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: "Web",
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid,
        photoUrl:
          user.photoURL
            .toString()
            .substring(0, user.photoURL.toString().indexOf("=") + 1) + "s224-c",
      };
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
};

const handleFacebookSignIn = async (e) => {
  e.preventDefault();
  console.log("Facebook Signup");

  try {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;

    // Check if document exists in the user collection:
    const ref = doc(db, "users", user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection");
      // console.log("Document data:", docSnap.data());
    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: "Web",
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid,
      };
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
  }
};

const handleTwitterSignIn = async (e) => {
  e.preventDefault();
  console.log("Twitter Signup");

  try {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;
    console.log(user);

    // Check if document exists in the user collection:
    const ref = doc(db, "users", user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // No need to update, just leave a logged in state
      console.log("User exists in the collection");
      // console.log("Document data:", docSnap.data());
    } else {
      // Create the document and leave a logged in state
      console.log("User does not exist in the collection");
      const userData = {
        dateCreated: new Date(),
        deviceType: "Web",
        email: user.email,
        isValid: true,
        //organization: company,
        username: user.displayName,
        uid: user.uid,
        photoUrl:
          user.photoURL
            .toString()
            .substring(0, user.photoURL.toString().indexOf("_normal")) + ".png",
      };
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, userData);
    }

    // setTimeout(() => {
    //   navigate("/profile");
    // }, 6000); // Wait for 2 seconds to let the user see the success message
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
  }
};

function Signup2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  //star start

  const [errormsg, setErrors] = useState({
    PassError: "",
    UsernameError: "",
    EmailError: "",
  });

  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //star end

  const [loginSuccess, setLoginSuccess] = useState("");

  // Check if user is already logged in:
  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    // Checks Login status for Redirection
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // navigate("/profile", { replace: true });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Enter Valid Email Address");
      updateErrorState("EmailError", "Email is required!");
      return;
    } else if (email) {
      updateErrorState("EmailError", "");
    }
    if (!password) {
      setError("Password is Mandatory");
      updateErrorState("PassError", "Password is required!");
      return;
    } else if (password) {
      updateErrorState("PassError", "");
    }

    if (!userName) {
      setError("Username is Mandatory");
      updateErrorState("UsernameError", "UserName is required!");
      return;
    } else if (userName) {
      updateErrorState("UsernameError", "");
    }

    const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px"><h1>Thank you for creating the outreach</h1><p>You have succefully registered! Your username is ${userName} and regiestered email address is ${email}</p></div>`;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      console.log(currentUser);
      const userData = {
        dateCreated: new Date(),
        deviceType: "Web",
        email: email,
        isValid: true,
        //organization: company,
        username: userName,
        uid: currentUser.uid,
        photoUrl: "",
      };

      // await firestore.collection('users').doc(currentUser.uid).set(userData);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, userData);

      sendEmailVerification(currentUser);

      // emailConfirmation(email, fAuth.currentUser.displayName, "", emailHTML);
      // Clear inputs or navigate to a different page
      setUserName("");
      setEmail("");
      setPassword("");
      //setCompany('');
      setLoginSuccess("Successfully signed up!");
      setError(""); // Clear out any existing error messages

      navigate("/verifyemail");

      // setTimeout(() => {
      //   navigate("/verifyemail");
      // }, 1000); // Wait for 2 seconds to let the user see the success message
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
        <div className=" w-fit mx-2 lg:mx-40 mt-40 mb-16 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center px-4 py-8 lg:px-36 lg:py-24 h-full w-full mx-auto rounded-2xl ">
            {/* form */}
            <form id="login" onSubmit={handleSignUp}>
              <div className="w-fit text-neutral-800 text-5xl font-medium font-bricolage leading-[64px]">
                Sign up
              </div>
              <div className=" h-fit mt-9 flex flex-col justify-start items-start gap-9 ">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <div
                    className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200 cursor-pointer"
                    onClick={handleGoogleSignIn}
                  >
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-medium font-inter leading-normal">
                      <button type="submit">Continue with Google</button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <FcGoogle size={32} />
                    </div>
                  </div>
                  {/*
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div
                      className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal"
                      onClick={handleFacebookSignIn}
                    >
                      <button type="submit">Continue with Facebook</button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <BiLogoFacebookCircle size={32} color=" #0163E0" />
                    </div>
                  </div>
                  */}
                  <div
                    className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200 cursor-pointer"
                    onClick={handleTwitterSignIn}
                  >
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-medium font-inter leading-normal">
                      <button type="submit">Continue with Twitter</button>
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <RiTwitterXFill size={32} />
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
                    <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                      Email*
                    </div>
                    <div className="self-stretch  bg-white rounded-md border-0 border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className={`text-zinc-700 w-full h-full rounded-md border-0 px-4 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.EmailError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {errormsg.EmailError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsaans">
                          {errormsg.EmailError}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                      Password*
                    </div>
                    <div className="self-stretch  bg-white rounded-md border-0 border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          className={`text-zinc-700 w-full h-full px-4 text-[15px] border-0 rounded-md font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.PassError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {errormsg.PassError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsans">
                          {errormsg.PassError}
                        </div>
                      </div>
                    )}
                  </div>
                  {/*  */}
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px]  font-medium font-inter leading-tight">
                      What should we call you?*
                    </div>
                    <div className="self-stretch  bg-white rounded-md border-0 border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="text"
                          id="name"
                          placeholder="Enter your profile name"
                          className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.UsernameError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setUserName(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {errormsg.UsernameError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsans">
                          {errormsg.UsernameError}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-9">
                <CustomButton
                  name="buttondefaultwide"
                  type="submit"
                  label="Sign up"
                ></CustomButton>
              </div>
              {/* <div className="self-stretch my-14 h-14 flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className="grow shrink basis-0 h-14 px-8 py-4 bg-violet-700 rounded-[100px] text-center text-neutral-100 text-lg font-semibold font-inter leading-normal"
                  >
                    Sign up with email
                  </button>
                </div>
              </div> */}
              <div className="w-fit text-center mx-auto mt-2">
                <span className="text-zinc-700 text-base font-normal font-open-sans leading-normal">
                  Already have an account?{" "}
                </span>
                <span
                  onClick={() => {
                    navigate("/login", { replace: true });
                  }}
                  className="text-violet-600 text-base font-normal font-open-sans leading-normal cursor-pointer"
                >
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
export { handleGoogleSignIn, handleFacebookSignIn, handleTwitterSignIn };
