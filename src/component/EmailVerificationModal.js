import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
import CustomButton from "./Buttons/CustomButton";
import errorImg from "../images/error.png";

const EmailVerificationModal = (props) => {
  const navigate = useNavigate();

  const currentUser = getAuth().currentUser;
  const hasSentVerificationLink = useRef(false); // Ref to track if the email verification link is sent

  const [Error, setError] = useState(false);
  const ResendVerificationLink = async () => {
    try {
      await sendEmailVerification(currentUser);
      console.log("Verification email sent");
    } catch (error) {
      setError(true);
      console.error("Error sending verification email:", error);
    }
  };

  const fireBaseSignOut = async () => {
    const fAuth = await getAuth();
    signOut(fAuth)
      .then(() => {
        console.log("success");
        // navigate("/login");
        props.setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  useEffect(() => {
    if (currentUser && currentUser.emailVerified === true) {
      navigate("/profile");
    } else {
      console.log("Email not verified");
      if (!hasSentVerificationLink.current) { // checking this condition as useeffect is being called twice by default
        ResendVerificationLink();
        hasSentVerificationLink.current = true; // Setting the ref to true after sending the verification link
      }
    }
    // fireBaseSignOut();
  }, []);

  return (
    <div className="relative flex flex-col items-center ">
      <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
        <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
          <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
            <div className="w-fit text-[#212121] text-[45px] font-medium font-inter leading-[52px]">
              Please check your email for verification link to activate your
              account!
            </div>

            <div className="justify-start items-start gap-[15px] inline-flex">
              <div className="w-fit justify-start items-start gap-4 inline-flex">
                <CustomButton
                  label="Profile"
                  name="buttondefault"
                  onClick={() => {
                    navigate("/profile");
                    window.location.reload();
                  }}
                />
                <CustomButton
                  label="Resend Link"
                  name="buttonborder"
                  onClick={() => {
                    ResendVerificationLink();
                  }}
                />
              </div>
            </div>
            {Error && (
              <div className="inline-flex items-center">
                <img src={errorImg} className="w-3 h-3" />
                <p className="text-red-600 text-xs">
                  Email already verified please click on profile page
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
