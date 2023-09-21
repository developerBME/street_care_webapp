import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Importing the auth instance
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";

function Signup2() {
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
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center px-4 py-8 lg:px-32 lg:py-20 h-full w-full mx-auto rounded-2xl ">
            {/* form */}
            <form id="login" onSubmit={handleSubmit}>
              <div className="w-fit text-neutral-800 text-5xl font-medium font-bricolage leading-[64px]">
                Sign up
              </div>
              <div className=" h-fit mt-14 flex flex-col justify-start items-start gap-9 ">
                <div className="flex-col justify-start items-start gap-4 flex">
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal">
                      Continue with Google
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <FcGoogle size={32} />
                    </div>
                  </div>
                  <div className="w-[360px] h-14 relative bg-white rounded-[100px] border border-neutral-200">
                    <div className="left-[80px] top-[16px] absolute text-center text-neutral-600 text-lg font-semibold font-inter leading-normal">
                      Continue with Apple
                    </div>
                    <div className="w-8 h-8 left-[22.50px] top-[12px] absolute">
                      <AiFillApple size={32} />
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
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch my-14 h-14 flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch h-14 px-8 py-4 bg-violet-700 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                  <button
                    type="submit"
                    className="grow shrink basis-0 text-center text-neutral-100 text-lg font-semibold font-inter leading-normal"
                  >
                    Sign up with email
                  </button>
                </div>
              </div>
              <div className="w-fit text-center mx-auto">
                <span className="text-zinc-700 text-base font-normal font-open-sans leading-normal">
                  Already have an account?{" "}
                </span>
                <span className="text-violet-600 text-base font-normal font-open-sans leading-normal cursor-pointer">
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
