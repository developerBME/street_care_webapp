import React, { useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Importing the auth instance
import {sendPasswordResetEmail} from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [emailForDisplay, setEmailForDisplay] = useState("");
  const [showCheckEmailBlock, setShowCheckEmailBlock] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleResetPasswordClick = async () => {
// Database handling for email and showing the "Check your email" block
    if (!resetEmail) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setError(null); // Clearing out any existing error messages
      setShowCheckEmailBlock(true);
      setEmailForDisplay(resetEmail);     
      setResetEmail("");

    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError(
          'The provided email address does not exist. Please check your email and try again.'
        );
      } else if (error.code === 'auth/invalid-email') {
        setError(
          'Invalid email address. Please enter a valid email address.'
        );
      }  else {
        setError(
          'Failed to send password reset email. Please try again later.'
        );
      }
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="w-[95%] md:w-[90%] lg:w-[75%] mx-2 mt-32 mb-20 rounded-2xl bg-white text-black ">
          
          <div className="justify-center items-center inline-flex p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7]">
            {showCheckEmailBlock ? (
                /* Check your email - Block */
                <div className="flex-col justify-start items-start gap-8 inline-flex">
                <div className="text-neutral-800 text-6xl font-medium font-bricolage leading-10">
                    Check your email
                </div>
                <div className=" lg:w-[67%] flex-col justify-start items-start gap-6 flex">
                            <div className="w-fit">
                                <span className="text-black text-base font-normal font-['DM Sans'] leading-normal tracking-wide">Follow the instructions sent to </span>
                                <span className="text-black text-base font-bold font-['DM Sans'] leading-normal"> {" "}{emailForDisplay}{" "} </span>
                                <span className="text-black text-base font-normal font-['DM Sans'] leading-normal tracking-wide"> to reset your password. If it doesn't arrive, be sure to check your spam folder.</span>
                            </div>
                        </div>

                        <div className="justify-start items-start gap-2 inline-flex cursor-pointer" 
                                onClick={() => {
                                navigate("/Login");
                            }}>
                            <div className="w-6 h-6 relative origin-top-left" >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20L13.41 18.59L7.83 13H20V11H7.83L13.41 5.41L12 4L4 12L12 20Z" fill="#6840E0"/>
                                </svg>
                            </div>
                            <div className="text-violet-600 text-base font-bold font-['DM Sans'] leading-normal">Back to login</div>
                        </div>
                </div>
            ) : (
                /* Forgot Password - Block */
                
                <div className="lg:w-[63%] flex-col justify-start items-start gap-4 flex">
                    <div className="text-neutral-800 text-5xl font-bricolage leading-[64px] font-medium">Forgot your password?</div>
                    <div className="text-black text-base font-normal font-['DM Sans'] leading-normal tracking-wide">We’ve got you covered. We’ll email you instructions to reset your password. Kindly provide us with the email associated with your profile.</div>
                    <div className="w-full md:w-[95%] flex-col justify-start items-start gap-2 md:gap-4 flex">
                        <div className=" w-full md:w-[95%] flex-col justify-start items-start gap-1.5 flex">
                            <div className=" text-zinc-700 text-sm font-medium font-['DM Sans'] leading-tight">
                                Email
                            </div>
                            <div className="self-stretch h-12 px-4 py-1 bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                                <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full md:w-[95%] h-10 text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug outline-none"
                                value={resetEmail}
                                onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                    </div>
                    <CustomButton
                    label="Reset Password"
                    name="buttondefault"
                    onClick={handleResetPasswordClick}
                    />
                    <div className="text-red-700">{error}</div>
                </div>
                
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
