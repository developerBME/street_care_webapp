import React, { useEffect, useState } from "react";
import CustomButton from "../../Buttons/CustomButton";
import errorImg from "../../../images/error.png";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
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
  // const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate();


  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     setLoggedInEmail(user.email);
  //   }
  // }, [auth]);

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
      // Validate email format
      // Check if entered email matches the logged-in user's email
      // if (email !== loggedInEmail) {
      //   updateErrorState(
      //     "EmailError",
      //     "Please enter correct email."
      //   );
      //   return;
      // }

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
      console.error("Error deleting user data", error);
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
    // console.log(email);
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-20% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-4 ">
        <div className=" w-[95%] lg:max-w-[850px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-[#f7f7f7] rounded-t-2xl rounded-2xl lg:rounded-tr-none">
            <div className="w-full h-full px-4 py-6 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
              <div className="font-dmsans text-base flex">
                <NavigateBeforeIcon />
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon />}
                // className="flex"
                >
                  <Link
                    underline="hover"
                    href="../ProfileSettings"
                    className="font-dmsans"
                  >
                    Account Settings
                  </Link>
                  <Typography>Update your profile</Typography>
                </Breadcrumbs>
              </div>
              <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                Delete Your Account
              </div>
              {/* things to keep in mind for mobile */}
              <div className="flex flex-col gap-8 font-dmsans bg-white rounded-2xl p-4 lg:hidden">
                <div className="flex flex-col">
                  <div className="text-xl font-bold">
                    Things to keep in mind
                  </div>
                  <div className="text-base font-dmsans my-4 text-slate-600 flex flex-col">
                    Once you delete your account, StreetCare will remove any information related to your account from the platform. This includes:
                    <ul className="list-disc p-5 pr-0.5">
                      <li>Name</li>
                      <li>Email Address</li>
                      <li>Profile Picture</li>
                      <li>Your Achievements</li>
                      <li>Your Visit logs</li>
                      <li>Registered Outreaches</li>
                    </ul>
                    This information cannot be retrieved in the future.
                  </div>
                </div>
              </div>
              <div className="text-black text-base font-dmsans">
                To delete your account, kindly enter the credentials associated with your account.
              </div>
              <div className="w-full">
                <form
                  id="delete-account-form"
                  // onSubmit={handleDeleteAccForm}
                  onSubmit={handleDeleteUser} // Add onSubmit event handler to call handleDeleteUser on form submission
                >
                  <div>
                    <label for="email">Email Address:</label><br />
                    <p>{email}</p>
                    {errormsg.EmailError && (
                      <div className="inline-flex items-center gap-1.5">
                        <img src={errorImg} className="w-3 h-3" />
                        <div className="text-red-700 font-dmsans">
                          {errormsg.EmailError}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="my-3">
                    <label for="password">Password:</label><br />
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className={` text-zinc-700 w-full h-12 px-6 py-2 my-1.5 border-gray-200 rounded-[6px] font-dmsans font-inter leading-snug tracking-wide ring-1 ring-inset ring-gray-200 ${errormsg.PassError !== ""
                          ? "ring-red-500"
                          : "ring-gray-300"
                          }`}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <div
                        className="absolute right-4 top-2/4 transform -translate-y-2/4 cursor-pointer"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
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
                </form>
              </div>
              <CustomButton
                name="deleteButton"
                type="submit"
                label="Delete Account"
                onClick={handleDeleteUser}
              ></CustomButton>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-white rounded-b-2xl hidden lg:flex lg:rounded-r-2xl lg:rounded-bl-none">
            <div className="xl:p-12 lg:p-12 w-full h-full flex-col justify-center gap-6 inline-flex rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
              <div className="flex flex-col gap-8 font-dmsans px-4 py-6 lg:px-12 lg:py-16 xl:pl-10 xl:pr-30">
                <div className="flex flex-col">
                  <div className="text-xl font-bold">
                    Things to keep in mind
                  </div>
                  <div className="text-base font-dmsans my-4 text-slate-600 flex flex-col">
                    Once you delete your account, StreetCare remove any information related to your account from the platform. This includes :
                    <ul className="list-disc p-5 pr-0.5">
                      <li>Name</li>
                      <li>Email Address</li>
                      <li>Profile Picture</li>
                      <li>Your Achievements</li>
                      <li>Your Visitlogs</li>
                      <li>Registered Outreaches</li>
                    </ul>
                    This information cannot be retrieved in the future.
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

export default DeleteAccount;