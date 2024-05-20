import React, { useEffect } from "react";
import { useState } from "react";
import CustomButton from "../../Buttons/CustomButton";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import arrowBack from "../../../images/arrowBack.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import errorImg from "../../../images/error.png";
import { send2FA, verify2FA } from "../UpdateEmail2FA";

import {
  getAuth,
  deleteUser,
  signOut,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { updateEmailId } from "../UpdateEmail";
import { useNavigate } from "react-router-dom";

const UpdateEmailAddress = () => {
  const stepLabelMap = {
    UPDATE_EMAIL: "Update email",
    VERIFY_CODE: "Verify Code",
    // NEW_EMAIL_CODE: "Verify New Email",
  };

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newVerificationCode, setNewVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const fAuth = getAuth();
  const navigate = useNavigate();

  // const [error, setError] = useState(null);

  const [currentStep, setCurrentStep] = useState("UPDATE_EMAIL");

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  const [errormsg, setErrors] = useState({
    EmailError: "",
    PassError: "",
    CodeError: "",
  });

  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resendCode = () => {
    setMinutes(4);
    setSeconds(59);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  //Old Email Verification step via reauthentication of current user login
  const handleEmailSubmit = async () => {
    // if (isSubmitted === 2) {
    //   setIsSubmitted((prevState) => prevState - 1);
    // } else {
    //   setIsSubmitted((prevState) => prevState + 1);
    // }

    if (
      !email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
      ""
    ) {
      updateErrorState("EmailError", "Email is required");
      return;
    } else if (email) {
      updateErrorState("EmailError", "");
    }

    if (!password) {
      updateErrorState("PassError", "Password is required");
      return;
    } else if (password) {
      updateErrorState("PassError", "");
    }

    //G relogin code
    //await reauthenticateWithPopup(auth.currentUser, provider);
    //const user = getAuth().currentUser;

    // Current user's reauthentication
    const credential = EmailAuthProvider.credential(fAuth.currentUser.email, password);
    try {
      const response = await reauthenticateWithCredential(fAuth.currentUser, credential);
      console.log('after relogin'); 
      console.log(response);
      console.log(email, fAuth?.currentUser.uid, Date.now().toString());
      //sending verification code to new email after user relogin
      const newEmailSendCodeResponse = await send2FA(
        email,
        fAuth?.currentUser.uid,
        Date.now().toString()
      );
      console.log(newEmailSendCodeResponse);
    } catch (error) {
      // Reauthentication failed, handling the error
      updateErrorState("PassError", "Incorrect Password");
      console.error("Reauthentication Failed!", error);
    }

    setCurrentStep("VERIFY_CODE");
    setMinutes(4);
    setSeconds(59);
    // document.getElementById("email-update-form").reset();
  };

  //New email verification step
  const handleCodeSubmit = async () => {
    if (!verificationCode || "") {
      updateErrorState("CodeError", "Verification code is required");
      return;
    } else if (!/^[0-9]{6}$/.test(verificationCode)) {
      updateErrorState("CodeError", "Please enter all 6 digits");
      return;
    } else if (verificationCode) {
      updateErrorState("CodeError", "");
    }
    // setShowVerification(true);

    // verifying code of new email
    console.log(verificationCode);
    const response = await verify2FA(
      email,
      fAuth?.currentUser.uid,
      Date.now().toString(),
      verificationCode
    );
    console.log(response.status);
    
    if (response.status === 200) { //On verifying code, updating email
      updateEmailId(email);
      navigate("/profile/profilesettings/emailupdateconfirmation");
    } else {
      console.log("Invalid code");
    }

    setVerificationCode("");
    // setCurrentStep("NEW_EMAIL");
  };

  //New email verification code, final update email
  // const handleNewEmailCode = async () => {
  //   if (!verificationCode || "") {
  //     updateErrorState("CodeError", "Verification code is required");
  //     return;
  //   } else if (!/^[0-9]{6}$/.test(verificationCode)) {
  //     updateErrorState("CodeError", "Please enter all 6 digits");
  //     return;
  //   } else if (verificationCode) {
  //     updateErrorState("CodeError", "");
  //   }
  //   const response = await verify2FA(
  //     email,
  //     fAuth?.currentUser.uid,
  //     Date.now().toString(),
  //     verificationCode
  //   );

  //   if (response.status) {
  //     updateEmailId(email);
  //     navigate("/profile/profilesettings/emailupdateconfirmation");
  //   } else {
  //     console.log("Invalid code");
  //   }

  //   setCurrentStep("NEW_EMAIL_CODE");
  //   setVerificationCode("");
  // };

  const handleBack = () => {
    // setIsSubmitted((prevState) => prevState - 1);

    if (currentStep === "VERIFY_CODE") {
      setCurrentStep("UPDATE_EMAIL");
    }
    // else {
    //   setCurrentStep("VERIFY_CODE");
    // }

    setMinutes(4);
    setSeconds(59);
  };

  const stepFuncMap = {
    UPDATE_EMAIL: handleEmailSubmit,
    VERIFY_CODE: handleCodeSubmit,
    // NEW_EMAIL_CODE: handleNewEmailCode,
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="w-1/2 bg-[#f7f7f7] rounded-l-2xl">
            <div className="w-full h-full px-4 py-6 md:p-12 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
              {currentStep === "UPDATE_EMAIL" ? (
                <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[35px] inline-flex">
                  <div className="flex-col justify-start items-start gap-5 md:gap-6 inline-flex">
                    <div className="flex flex-col gap-2">
                      <div className="font-dmsans text-base">
                        <Breadcrumbs
                          aria-label="breadcrumb"
                          separator={<NavigateNextIcon />}
                        >
                          <Link
                            underline="hover"
                            href="../ProfileSettings"
                            className="font-dmsans"
                          >
                            Account Settings
                          </Link>
                          <Typography>Update your email address</Typography>
                        </Breadcrumbs>
                      </div>
                      <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                        Update your email address
                      </div>
                    </div>
                    <div className="text-black text-base font-normal">
                      To update your email address, kindly provide your new
                      email address.
                    </div>
                    <form
                      className="gap-6 flex flex-col w-full"
                      id="email-update-form"
                      // onSubmit={handleSubmit}
                    >
                      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                        <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                          <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                            Existing Email Address
                          </div>
                          <div className="self-stretch bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                              <input
                                type="email"
                                id="email"
                                disabled
                                // placeholder="patrick_123@email.com"
                                value={fAuth.currentUser.email}
                                className="text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ring-gray-200"
                                // onChange={(e) => setEmail(e.target.value)}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                        <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                          <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                            New Email Address
                          </div>
                          <div className="self-stretch  bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                              <input
                                type="email"
                                id="email"
                                placeholder="Enter new email address"
                                className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
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
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <div className="text-red-700 font-dmsans">
                                {errormsg.EmailError}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                        <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                          <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                            Password
                          </div>
                          <div className="relative self-stretch bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                  errormsg.PassError !== ""
                                    ? "ring-red-500"
                                    : "ring-gray-300"
                                }`}
                                onChange={(e) => setPassword(e.target.value)}
                              ></input>
                              <div
                                className="absolute right-4 top-2/4 transform -translate-y-2/4 cursor-pointer"
                                onClick={handleTogglePassword}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </div>
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
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[35px] inline-flex">
                  <div className="flex-col justify-start items-start gap-5 md:gap-6 inline-flex">
                    <div>
                      <Link to="/profile/profilesettings/updateemailaddress">
                        <div className="inline-flex cursor-pointer">
                          {/* removed pl-3 xl:px-16 xl:pt-16 from this div*/}
                          <img
                            alt=""
                            src={arrowBack}
                            onClick={handleBack}
                            // onClick={() =>
                            //   setIsSubmitted((prevState) => prevState - 1)
                            // }
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="font-dmsans text-2xl font-bold">
                      New Email Address Verification
                    </div>
                    <div className="font-dmsans text-base font-normal">
                      We have sent a verification code to{" "}
                      <span className="text-[#6840E0]">{email}</span>. Enter the
                      code below to verify your new email address
                    </div>
                    <form
                      id="verification-code-form"
                      className="gap-6 flex flex-col w-full"
                    >
                      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                        <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                          <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                            Verification Code
                          </div>
                          <div className="self-stretch  bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                            <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex relative">
                              <input
                                type="text"
                                id="verficationCode"
                                placeholder="845672"
                                maxLength="6"
                                value={verificationCode}
                                className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                  errormsg.CodeError !== ""
                                    ? "ring-red-500"
                                    : "ring-gray-300"
                                }`}
                                onChange={(e) => {
                                  setVerificationCode(e.target.value);
                                }}
                              ></input>
                              <div
                                className="absolute rounded-md py-1.5 px-2 bg-slate-200 right-3 text-xs font-dmsans font-normal text-black cursor-pointer hover:bg-slate-300"
                                onClick={() => setVerificationCode("")}
                              >
                                Clear
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between w-full">
                            {seconds > 0 || minutes > 0 ? (
                              <div className="text-xs font-normal font-inter leading-tight text-[#444746]">
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </div>
                            ) : (
                              <button
                                // className="disabled:text-black disabled:cursor-not-allowed
                                // text-[#6840E0] cursor-pointer text-sm font-dmsans font-normal"
                                className="text-[#6840E0] cursor-pointer text-sm font-dmsans font-normal"
                                onClick={resendCode}
                              >
                                Resend Code
                              </button>
                            )}
                          </div>
                          {errormsg.CodeError && (
                            <div className="inline-flex items-center gap-1.5">
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <div className="text-red-700 font-dmsans">
                                {errormsg.CodeError}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <CustomButton
                name="buttondefault"
                type="submit"
                label={stepLabelMap[currentStep]}
                onClick={stepFuncMap[currentStep]}
              ></CustomButton>
            </div>
          </div>
          <div className="w-1/2 bg-white rounded-r-2xl">
            <div className="w-full h-full flex-col justify-center gap-6 inline-flex">
              <div className="flex flex-col gap-8 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-10 xl:pr-30">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">
                    Steps to update your email address
                  </div>
                  <div className="text-base font-normal">
                    Ensure you have access to your new email address before proceeding. 
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-base font-bold">
                      Step 1 - Enter New Email and Existing Password
                    </div>
                    {currentStep === "UPDATE_EMAIL" ? (
                      <AiOutlineLoading3Quarters className="text-green-300" />
                    ) : (
                      <FaCheckCircle className="text-green-600" />
                    )}
                  </div>
                  <div className="text-base font-normal">
                    Enter your new email address and existing password.
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-base font-bold">
                      Step 2 - Verify New Email
                    </div>
                    {currentStep === "VERIFY_CODE" && (
                      <AiOutlineLoading3Quarters className="text-green-300" />
                    )}
                  </div>
                  <div className="text-base font-normal">
                    Verify your new email address using the link sent to your
                    email address.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmailAddress;
