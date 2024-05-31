import React, { useState } from "react";
import errorImg from "../../../images/error.png";
import CustomButton from "../../Buttons/CustomButton";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  deleteUser,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DeleteAccount = (props) => {
  const auth = getAuth();

  const [email, setEmail] = useState(auth.currentUser.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrors] = useState({
    EmailError: "",
    PassError: "",
  });
  const navigate = useNavigate();


  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {

      if (!password) {
        updateErrorState("PassError", "Password is required");
        return;
      }
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Delete user
      await deleteUser(auth.currentUser);
      updateErrorState("EmailError", "User account deleted successfully.");

      // Sign out
      await signOut(auth);
      props.setLoggedIn(false)
      navigate("/profile/profilesettings/deleteaccconfirmation", { state: { email: email } });
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        updateErrorState(
          "PassError",
          "Invalid Password"
        );
      }
      else {
        updateErrorState(
          "EmailError",
          "Error deleting user data. Please try again."
        );
      }

    }

  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="w-1/2 bg-[#f7f7f7] rounded-l-2xl">
            <div className="w-full h-full px-4 py-6 md:p-12 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
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
                        <Typography>Delete your account</Typography>
                      </Breadcrumbs>
                    </div>
                    <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                      Delete Your Account
                    </div>
                  </div>
                  <div className="text-black text-base font-normal">
                    To delete your account kindly enter the credentials
                    associated with your account.
                  </div>
                  <form
                    className="gap-6 flex flex-col w-full"
                    id="delete-account-form"
                    // onSubmit={handleDeleteAccForm}
                    onSubmit={handleDeleteUser} // Add onSubmit event handler to call handleDeleteUser on form submission
                  >
                    <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                      <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                        <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                          Email Address
                        </div>
                        <p>{auth.currentUser.email}</p>
                        {errormsg.EmailError && (
                          <div className="inline-flex items-center gap-1.5">
                            <img src={errorImg} className="w-3 h-3" />
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
                              className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${errormsg.PassError !== ""
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
                  {/* <CustomButton
                    name="deleteButton"
                    type="submit"
                    label="Delete Account"
                    onClick={handleDeleteAccForm}
                  /> */}
                  <CustomButton
                    name="deleteButton"
                    type="submit"
                    label="Delete Account"
                    onClick={handleDeleteUser}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white rounded-r-2xl">
            <div className="w-full h-full flex-col justify-center gap-6 inline-flex">
              <div className="flex flex-col gap-4 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-16 ">
                <div className="flex flex-col gap-4">
                  <div className="text-2xl font-bold">
                    Things to keep in mind
                  </div>
                  <div className="text-base font-normal text-justify">
                    Once you delete your account, StreetCare remove any
                    information related to your account from the platform.
                    <br />
                    This includes :
                  </div>
                </div>
                <div className="flex flex-col gap-1 pl-6">
                  <ul className="text-black font-normal text-base font-dmsans list-disc">
                    <li className="pl-1">Name</li>
                    <li className="pl-1">Email Address</li>
                    <li className="pl-1">Profile Picture</li>
                    <li className="pl-1">Your Achievements</li>
                    <li className="pl-1">Your Visitlogs</li>
                    <li className="pl-1">Registered Outreaches</li>
                  </ul>
                </div>
                <div className="text-base font-normal font-dmsans">
                  This information cannot be retrieved in the future.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
