import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  deleteUser,
  signOut,
  signInWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

const DeleteAccount = (props) => {
  const auth = getAuth();
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrors] = useState({
    EmailError: "",
    PassError: "",
  });
  const [reauthenticated, setReauthenticated] = useState(false);
  const [provider, setProvider] = useState(null);
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

  const handleReauthentication = async () => {
    if (provider === GoogleAuthProvider.PROVIDER_ID) {
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({
        prompt: "select_account",
        login_hint: email,
      });
      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user.email === email) {
          setReauthenticated(true);
          setErrors({
            EmailError:
              "Re-authentication successful. You can now delete your account.",
            PassError: "",
          });
        } else {
          updateErrorState(
            "EmailError",
            "Re-authenticated email does not match the current email."
          );
        }
      } catch (error) {
        console.error("Error during Google re-authentication", error);
        updateErrorState(
          "EmailError",
          "Error during Google re-authentication. Please try again."
        );
      }
    } else if (provider === EmailAuthProvider.PROVIDER_ID) {
      if (!password) {
        updateErrorState("PassError", "Password is required");
        return;
      }
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        setReauthenticated(true);
        setErrors({
          EmailError:
            "Re-authentication successful. You can now delete your account.",
          PassError: "",
        });
      } catch (error) {
        console.error("Error re-authenticating user", error);
        if (error.code === "auth/wrong-password") {
          updateErrorState("PassError", "Invalid Password");
        } else {
          updateErrorState(
            "EmailError",
            "Error re-authenticating user. Please try again."
          );
        }
      }
    } else {
      updateErrorState("EmailError", "Unsupported authentication provider.");
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    if (!reauthenticated) {
      await handleReauthentication();
      return;
    }

    try {
      await deleteUser(auth.currentUser);
      updateErrorState("EmailError", "User account deleted successfully.");
      await signOut(auth);
      props.setLoggedIn(false);
      navigate("/profile/profilesettings/deleteaccconfirmation", {
        state: { email: email },
      });
    } catch (error) {
      console.error("Error deleting user data", error);
      updateErrorState(
        "EmailError",
        "Error deleting user data. Please try again."
      );
    }
  };

  const checkProvider = () => {
    const providerData = auth.currentUser.providerData[0];
    setProvider(providerData.providerId);
  };

  useEffect(() => {
    checkProvider();
  }, []);

  return (
    // <div className="bg-gradient-to-tr from-[#E4EEEA] from-20% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
    //   <div className="relative flex flex-col items-center gap-4">
    //     <div className="w-[95%] lg:max-w-[850px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-col lg:flex-row">
    //       <div className="w-full lg:w-1/2 bg-[#f7f7f7] rounded-t-2xl rounded-2xl lg:rounded-tr-none">
    //         <div className="w-full h-full px-4 py-6 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
    //           <div className="font-dmsans text-base flex">
    //             <NavigateBeforeIcon />
    //             <Breadcrumbs
    //               aria-label="breadcrumb"
    //               separator={<NavigateNextIcon />}
    //             >
    //               <Link
    //                 underline="hover"
    //                 to="../ProfileSettings"
    //                 className="text-black"
    //               >
    //                 Profile Settings
    //               </Link>
    //               <Typography color="text.primary">Delete Account</Typography>
    //             </Breadcrumbs>
    //           </div>
    //           <div className="text-3xl lg:text-4xl font-dmsans font-bold text-left text-black">
    //             Delete Your Account
    //           </div>
    //           <div className="w-full lg:w-[300px] flex flex-col gap-2 mb-2">
    //             <div className="font-dmsans text-sm text-center text-black">
    //               Are you sure you want to delete your account?
    //             </div>
    //             <div className="text-[10px] font-dmsans text-center text-black">
    //               This action cannot be undone.
    //             </div>
    //           </div>
    //           <div className="font-dmsans text-sm text-left text-black">
    //             Email
    //           </div>
    //           <div className="w-full">
    //             <input
    //               id="email"
    //               className="w-full h-[40px] rounded-md border-[1px] border-gray-500 p-2"
    //               placeholder="example@example.com"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //             {errormsg.EmailError && (
    //               <span className="text-red-500 text-sm">
    //                 {errormsg.EmailError}
    //               </span>
    //             )}
    //           </div>
    //           {provider === EmailAuthProvider.PROVIDER_ID && (
    //             <>
    //               <div className="text-xs font-dmsans text-left text-[#7C7C7C] mb-4">
    //                 Enter your email and password, and click "Delete your
    //                 account" to delete your account.
    //               </div>
    //               <div className="font-dmsans text-sm text-left text-black">
    //                 Password
    //               </div>
    //               <div className="w-full relative">
    //                 <input
    //                   id="password"
    //                   type={showPassword ? "text" : "password"}
    //                   className="w-full h-[40px] rounded-md border-[1px] border-gray-500 p-2"
    //                   placeholder="Password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                 <button
    //                   type="button"
    //                   onClick={handleTogglePassword}
    //                   className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
    //                 >
    //                   {showPassword ? (
    //                     <VisibilityOffOutlinedIcon />
    //                   ) : (
    //                     <VisibilityOutlinedIcon />
    //                   )}
    //                 </button>
    //                 {errormsg.PassError && (
    //                   <span className="text-red-500 text-sm">
    //                     {errormsg.PassError}
    //                   </span>
    //                 )}
    //               </div>
    //             </>
    //           )}
    //           {provider === GoogleAuthProvider.PROVIDER_ID && (
    //             <>
    //               <div className="text-xs font-dmsans text-left text-[#7C7C7C] mb-4">
    //                 reauthenticate via google sign in, and click "Delete your
    //                 account" to delete your account.
    //               </div>
    //               <div className="w-full flex justify-center mt-6">
    //                 <button
    //                   id="reauthenticate-google-button"
    //                   className="w-full flex items-center justify-center py-3.5 mt-2.5 bg-primary text-black"
    //                   onClick={handleReauthentication}
    //                 >
    //                   <FcGoogle className="mr-2" />
    //                   Re-authenticate with Google
    //                 </button>
    //               </div>
    //             </>
    //           )}
    //           <div className="w-full flex justify-center mt-6">
    //             <button
    //               id="delete-account-button"
    //               onClick={handleDeleteUser}
    //               className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
    //                 reauthenticated
    //                   ? "text-black bg-red hover:bg-[#cf003ec7]"
    //                   : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
    //               }`}
    //             >
    //               Delete your account
    //             </button>
    //             <Link to="../ProfileSettings">
    //               <button
    //                 id="cancel-delete-account-button"
    //                 className="w-full flex items-center justify-center py-3.5 mt-2.5"
    //               >
    //                 Cancel
    //               </button>
    //             </Link>
    //           </div>
    //           <div className="w-1/2 bg-white rounded-r-2xl">
    //             <div className="w-full h-full flex-col justify-center gap-6 inline-flex">
    //               <div className="flex flex-col gap-4 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-16 ">
    //                 <div className="flex flex-col gap-4">
    //                   <div className="text-2xl font-bold">
    //                     Things to keep in mind
    //                   </div>
    //                   <div className="text-base font-normal text-justify">
    //                     Once you delete your account, StreetCare remove any
    //                     information related to your account from the platform.
    //                     <br />
    //                     This includes :
    //                   </div>
    //                 </div>
    //                 <div className="flex flex-col gap-1 pl-6">
    //                   <ul className="text-black font-normal text-base font-dmsans list-disc">
    //                     <li className="pl-1">Name</li>
    //                     <li className="pl-1">Email Address</li>
    //                     <li className="pl-1">Profile Picture</li>
    //                     <li className="pl-1">Your Achievements</li>
    //                     <li className="pl-1">Your Visitlogs</li>
    //                     <li className="pl-1">Registered Outreaches</li>
    //                   </ul>
    //                 </div>
    //                 <div className="text-base font-normal font-dmsans">
    //                   This information cannot be retrieved in the future.
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-gradient-to-tr from-[#E4EEEA] from-20% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-[95%] lg:max-w-[850px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 bg-[#f7f7f7] text-black flex flex-col rounded-2xl">
          <div className="flex flex-col w-full md:flex-row h-full items-start bg-white rounded-2xl">
            {/* <div className="px-[20px] w-fit md:w-1/2 bg-gray flex flex-col items-start justify-normal md:my-20 md:mx-8"> */}
            <div className="flex flex-col gap-1 w-full md:w-1/2 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-16 bg-gray-100 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
              {/* <div>
                <h2 className="text-2xl font-bold">Delete Your Account</h2>
              </div> */}
              <div className="font-dmsans text-base flex">
                <NavigateBeforeIcon />
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon />}
                >
                  <Link
                    underline="hover"
                    to="../ProfileSettings"
                    className="text-[#6840E0]"
                  >
                    Account Settings
                  </Link>
                  <Typography color="text.primary">Delete Account</Typography>
                </Breadcrumbs>
              </div>
              <div className="text-3xl lg:text-4xl font-dmsans font-medium text-left text-black mt-2">
                Delete Your Account
              </div>
              <div className="w-full lg:w-[300px] flex flex-col gap-2 mb-2 mt-2">
                <div className="font-dmsans text-sm text-start text-black w-fit">
                  {/* Are you sure you want to delete your account? */}
                  To delete your account kindly enter the credentials associated
                  with your account.
                </div>
                {/* <div className="text-[10px] font-dmsans text-center text-black">
                  This action cannot be undone.
                </div> */}
              </div>
              <div className="font-dmsans text-sm text-left text-black mt-4">
                Email
              </div>
              <div className="w-full">
                <input
                  id="email"
                  className="w-full h-[40px] rounded-md border-[1px] border-gray-500 p-2 mt-2"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errormsg.EmailError && (
                  <span className="text-red-500 text-sm">
                    {errormsg.EmailError}
                  </span>
                )}
              </div>
              {provider === EmailAuthProvider.PROVIDER_ID && (
                <>
                  <div className="text-xs font-dmsans text-left text-[#7C7C7C] mb-4 mt-2">
                    Enter your email and password, and click "Delete your
                    account" to delete your account.
                  </div>
                  <div className="font-dmsans text-sm text-left text-black">
                    Password
                  </div>
                  <div className="w-full relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full h-[40px] rounded-md border-[1px] border-gray-500 p-2"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute top-2 right-0 flex items-center px-2 mt-[-2] text-gray-500"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </button>
                    {errormsg.PassError && (
                      <span className="text-red-500 text-sm">
                        {errormsg.PassError}
                      </span>
                    )}
                  </div>
                </>
              )}
              {provider === GoogleAuthProvider.PROVIDER_ID && (
                <>
                  <div className="text-xs font-dmsans text-left text-[#7C7C7C] mb-4 mt-2">
                    reauthenticate via google sign in, and click "Delete your
                    account" to delete your account.
                  </div>
                  {/* <div className="w-full flex justify-center mt-6">
                    <button
                      id="reauthenticate-google-button"
                      className="w-full flex items-center justify-start py-3.5 mt-2.5 bg-primary text-black"
                      onClick={handleReauthentication}
                    >
                      <FcGoogle className="mr-2" />
                      Re-authenticate with Google
                    </button>
                  </div> */}
                  <div
                    className="w-full md:w-[70%] h-12 md:h-10 relative bg-white rounded-[100px] border border-neutral-200 cursor-pointer"
                    onClick={handleReauthentication}
                  >
                    <div className="left-[30px] md:left-[25px] top-[8px] absolute text-center text-neutral-600 text-sm font-medium font-inter leading-normal w-full">
                      Re-authenticate with Google
                    </div>
                    <div className="w-8 h-8 left-[8px] md:left-[22.50px] top-[8px] absolute">
                      <FcGoogle size={24} />
                    </div>
                  </div>
                </>
              )}
              <div className="w-full flex justify-start my-6">
                <button
                  id="delete-account-button"
                  onClick={handleDeleteUser}
                  // className={`text-[12px] font-medium py-[2px] px-[16px] mr-[4px] h-8 rounded-full transition ease-in-out delay-300 ${
                  //   reauthenticated
                  //     ? "text-black bg-red hover:bg-[#cf003ec7]"
                  //     : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
                  // }`}
                  className={`text-[12px] font-medium py-[2px] px-[16px] mr-[4px] h-8 rounded-full transition ease-in-out delay-300 ${
                    reauthenticated
                      ? "text-black bg-red hover:bg-[#cf003ec7]"
                      : "text-black bg-[#d8d8d8] hover:bg-[#cf003ec7]"
                  }`}
                >
                  Delete your account
                </button>
                <Link to="../ProfileSettings">
                  <button
                    id="cancel-delete-account-button"
                    className="w-full flex items-center justify-center py-[2px] px-[16px] h-8 text-[12px] rounded-full"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              {/* <div>
                <h2 className="text-2xl font-bold">Things to keep in mind</h2>
              </div> */}
              <div className="w-full h-full flex-col justify-center gap-6 inline-flex bg-white rounded-b-2xl md:rounded-b-none md:rounded-r-2xl">
                <div className="flex flex-col gap-1 w-full font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-16">
                  {/* <div className="flex flex-col gap-4 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-16"> */}
                  <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold">
                      Things to keep in mind
                    </div>
                    <div className="text-base font-normal text-justify text-gray-600">
                      Once you delete your account, StreetCare remove any
                      information related to your account from the platform.
                      <br />
                      This includes :
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pl-6">
                    <ul className="font-normal text-base font-dmsans list-disc text-gray-600">
                      <li className="pl-1">Name</li>
                      <li className="pl-1">Email Address</li>
                      <li className="pl-1">Profile Picture</li>
                      <li className="pl-1">Your Achievements</li>
                      <li className="pl-1">Your Visitlogs</li>
                      <li className="pl-1">Registered Outreaches</li>
                    </ul>
                  </div>
                  <div className="text-base font-normal font-dmsans text-gray-600">
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
