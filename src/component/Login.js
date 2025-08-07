import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./firebase"; // Importing the auth instance
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";

import { RiTwitterXFill } from "react-icons/ri";
import errorImg from "../images/error.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  handleGoogleSignIn,
  handleFacebookSignIn,
  handleTwitterSignIn,
} from "./Signup";
import CustomButton from "./Buttons/CustomButton";
import logEvent from "./FirebaseLogger";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import collectionMapping from "../utils/firestoreCollections";

const bannedUser_collection = collectionMapping.bannedUser;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  //const [banUser, setBannedUser] = useState("");

  const [errormsg, setErrors] = useState({
    PassError: "",
    EmailError: "",
    BannedUserError: ""
  });

  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const fAuth = getAuth();
  if (fAuth.currentUser) navigate("/profile", { replace: true });
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      updateErrorState("EmailError", "Email is required!");
      return;
    } else if (email) {
      updateErrorState("EmailError", "");
    }
    if (!password) {
      updateErrorState("PassError", "Password is required!");
      return;
    } else if (password) {
      updateErrorState("PassError", "");
    }

    try {
      const userQuery = query(
        collection(db, bannedUser_collection),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if(userData.email == email){
            console.log(userData.email);
            updateErrorState("BannedUserError", "User Profile is Banned! Please Contact Admin");
          }
        });
      }
      else{
        updateErrorState("BannedUserError", "");
        // Set persistence based on the rememberMe state
        const persistenceType = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
        setPersistence(auth, persistenceType)
        .then(async () => {
          await signInWithEmailAndPassword(auth, email, password);
          setLoginSuccess("Successfully logged in!");
          setError(""); // Clearing out any existing error messages
          // navigate(-1, { preventScrollReset: true });
          navigate("/profile");
          logEvent("STREET_CARE_INFO_AUTH", `${email} has logged in`);
        })
        .catch((error) => {
          // setError(error.message);
          if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            setError(
            <div className="flex items-center">
              <img src={errorImg} className="w-3 h-3 mr-2" />
              <div>Email or password is incorrect. Please check your credentials and try again.</div>
            </div>
            );
          } else {
            setError(error.message);
          }
          logEvent("STREET_CARE_ERROR", `at login - ${error.message}`);
          setLoginSuccess(""); // Clearing out any success messages
        });
      }
    } catch (error) {
      console.error('Error searching email: ', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-40 mb-16 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center px-4 py-8 lg:px-36 lg:py-24 h-full w-full mx-auto rounded-2xl ">
            {/* form */}
            <form id="login" onSubmit={handleSubmit}>
              <div className="w-fit text-neutral-800 text-5xl font-medium font-bricolage leading-[64px]">
                Log in
              </div>
              <div className=" h-fit mt-16 flex flex-col justify-start items-start gap-9 ">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <div
                    className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200 cursor-pointer"
                    onClick={handleGoogleSignIn}
                  >
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-medium font-inter leading-normal ">
                      Continue with Google
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
                      <BiLogoFacebookCircle size={32} color="#0163E0" />
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
                      Email
                    </div>
                    <div className="self-stretch  bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.EmailError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={ handleKeyPress}
                        ></input>
                      </div>
                    </div>
                    {errormsg.EmailError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsans">
                          {errormsg.EmailError}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                      Password
                    </div>
                    {/*<div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 justify-center items-start inline-flex">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="Enter your password"
                          className={`text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.PassError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <div
                          className="cursor-pointer relative right-6 top-2/4 transform -translate-y-2/4"
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                        </div>*/}
                    <div className="relative self-stretch bg-white rounded-md border-0 border-stone-300 justify-start items-center gap-2 inline-flex">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className={`text-zinc-700 w-full h-10 px-4 text-[15px] rounded-md border-0 font-normal font-inter leading-snug tracking-wide outline-none ring-1 ring-inset ${
                          errormsg.PassError !== ""
                            ? "ring-red-500"
                            : "ring-gray-300"
                        }`}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={ handleKeyPress}
                      />
                      <div
                        className="absolute right-4 top-2/4 transform -translate-y-2/4 cursor-pointer"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                  {error && (
                    <div className="text-red-700 text-base font-normal font-open-sans leading-normal my-2">
                      {error}
                      {console.log(error)}
                    </div>
                  )}
                  <div
                    className="w-fit text-violet-600 text-[15px] font-normal font-inter leading-snug hover:underline cursor-pointer"
                    onClick={() => {
                      navigate("/ForgotPassword");
                    }}
                  >
                    Forgot your password?
                  </div>

                  {
                    errormsg.BannedUserError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsans">
                          {errormsg.BannedUserError}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>

              <div className="justify-start items-center mt-16 mb-6 gap-4 inline-flex">
                <div className="w-[18px] h-[18px] relative">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="w-[18px] h-[18px] left-0 top-0 absolute bg-violet-700 rounded-sm cursor-pointer "
                  ></input>
                </div>

                <div className="text-black text-sm font-normal font-open-sans leading-tight">
                  Remember me
                </div>
              </div>
              <CustomButton
                name="buttondefaultwide"
                type="submit"
                label="Log in"
              ></CustomButton>
              {/* <div className="self-stretch mb-14 h-14 flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className="grow shrink basis-0 text-center text-neutral-100 text-lg font-semibold font-inter leading-normal h-14 px-8 py-4 bg-violet-700 rounded-[100px]"
                  >
                    {" "}
                    Log in{" "}
                  </button>
                </div>
              </div> */}
              <div className="w-fit text-center mx-auto mt-6">
                <span className="text-zinc-700 text-base font-normal font-open-sans leading-normal">
                  Don't have an account?{" "}
                </span>
                <span
                  onClick={() => {
                    navigate("/signup", { replace: true });
                  }}
                  className="text-violet-600 text-base font-normal font-open-sans leading-normal cursor-pointer"
                >
                  Sign up
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
