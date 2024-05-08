import React, { useState } from "react";
import errorImg from "../../../images/error.png";
import CustomButton from "../../Buttons/CustomButton";


const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrors] = useState({
    EmailError: "",
    PassError: "",
  });

  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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
                  >
                    <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                      <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                        <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                          Email Address
                        </div>
                        <div className="self-stretch bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                            <input
                              type="email"
                              id="email"
                              placeholder="patricks_123@email.com"
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
                        <div className="self-stretch bg-white border-stone-300 justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                            <input
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                errormsg.PassError !== ""
                                  ? "ring-red-500"
                                  : "ring-gray-300"
                              }`}
                              onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <div className=""></div>
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
                    <CustomButton 
                    name="deleteButton"
                    type="submit"
                    label="Delete Account"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white rounded-r-2xl">
            <div className="w-full h-full flex-col justify-center gap-6 inline-flex">
              <div className="flex flex-col gap-4 font-dmsans px-4 py-6 md:py-12 md:px-8 lg:px-12 lg:py-16 xl:pl-10 xl:pr-30">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">
                    Things to keep in mind
                  </div>
                  <div className="text-base font-normal">
                    Once you delete your account, StreetCare remove any
                    information related to your account from the platform. This
                    includes :
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <ul className="text-black font-normal text-base font-dmsans">
                    <li>Name</li>
                    <li>Email Address</li>
                    <li>Profile Picture</li>
                    <li>Your Achievements</li>
                    <li>Your Visitlogs</li>
                    <li>Registered Outreaches</li>
                  </ul>
                </div>
                <div className="text-base font-normal">
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
