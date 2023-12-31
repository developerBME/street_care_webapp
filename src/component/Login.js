import React, { useState } from "react";
import { signInWithEmailAndPassword, setPersistence,  browserSessionPersistence, browserLocalPersistence  } from "firebase/auth";
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

import {
  handleGoogleSignIn,
  handleFacebookSignIn,
  handleTwitterSignIn,
} from "./Signup";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errormsg, setErrors] = useState({
    PassError: "",
    EmailError: "",
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
  onAuthStateChanged(fAuth, (user) => {
    // Checks Login status for Redirection
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
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

    try {
      // Set persistence based on the rememberMe state
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
  
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess("Successfully logged in!");
      setError(""); // Clearing out any existing error messages
      navigate(-1, { preventScrollReset: true });
    } catch (error) {
      setError(error.message);
      setLoginSuccess(""); // Clearing out any success messages
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center px-4 py-8 lg:px-32 lg:py-20 h-full w-full mx-auto rounded-2xl ">
            {/* form */}
            <form id="login" onSubmit={handleSubmit}>
              <div className="w-fit text-neutral-800 text-5xl font-medium font-bricolage leading-[64px]">
                Log in
              </div>
              <div className=" h-fit mt-14 flex flex-col justify-start items-start gap-9 ">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <div
                    className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200 cursor-pointer"
                    onClick={handleGoogleSignIn}
                  >
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal ">
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
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal">
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
                    <div className="self-stretch text-zinc-700 text-[15px] font-semibold font-inter leading-tight">
                      Email
                    </div>
                    <div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className={`text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.EmailError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {errormsg.EmailError && (
                      <div className="text-red-700">{errormsg.EmailError}</div>
                    )}
                  </div>
                  <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                    <div className="self-stretch text-zinc-700 text-[15px]  font-semibold font-inter leading-tight">
                      Password
                    </div>
                    <div className="self-stretch  bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                      <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          className={`text-zinc-700 w-full h-full px-4 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                            errormsg.PassError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    {errormsg.PassError && (
                      <div className="text-red-700">{errormsg.PassError}</div>
                    )}
                  </div>
                  <div className="w-fit text-violet-600 text-[15px] font-normal font-inter leading-snug hover:underline cursor-pointer">
                    Forgot your password?
                  </div>
                </div>
              </div>

              <div className="justify-start items-center mt-14 gap-4 inline-flex">
                
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
              <div className="self-stretch my-14 h-14 flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className="grow shrink basis-0 text-center text-neutral-100 text-lg font-semibold font-inter leading-normal h-14 px-8 py-4 bg-violet-700 rounded-[100px]"
                  >
                    {" "}
                    Log in{" "}
                  </button>
                </div>
              </div>
              <div className="w-fit text-center mx-auto">
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
