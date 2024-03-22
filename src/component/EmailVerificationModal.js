import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const EmailVerificationModal = () => {
  const navigate = useNavigate();

  const fireBaseSignOut = async () => {
    const fAuth = await getAuth();
    signOut(fAuth)
      .then(() => {
        console.log("success");
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  useEffect(() => {
    fireBaseSignOut();
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
              {/* <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex"> */}
              {/* <CustomButton
                  label="Sign Up"
                  name="buttondefault"
                  onClick={(e) => {}}
                /> */}
              {/* </div> */}

              <div
                className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                  <button className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight">
                    Login
                  </button>
                </div>
              </div>
              {/* {success && <RSVPConfirmationModal />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
