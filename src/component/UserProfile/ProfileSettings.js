import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

const settingOptions = [
  {
    title: "Update your profile",
    logo: <MdOutlineAccountCircle />,
    desc: "Name and Profile picture",
  },
  {
    title: "Update your email address",
    logo: <MdAlternateEmail />,
  },
  {
    title: "Delete your account",
    logo: <MdLockOutline />,
  },
];


function ProfileSettings() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black ">
          <div className="w-full h-full px-4 py-6 lg:px-12 lg:py-16 xl:p-16 bg-[#f7f7f7] rounded-[32px] flex-col justify-start items-start gap-6 inline-flex">
            <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[35px] inline-flex">
              <div className="flex-col justify-start items-start gap-5 md:gap-8 inline-flex">
                <div className="text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                  Account Settings
                </div>
              </div>
            </div>
            <div className="items-center justify-center h-full w-full rounded-xl bg-white">
              <div className="flex-col justify-start items-start gap-1 inline-flex w-full">
                <div className="w-full">
                  <div className="flex flex-col">
                    {settingOptions.map((option) => (
                      <div className="flex-col border-b w-full cursor-pointer px-4 py-4 gap-1">
                        <div className="flex gap-3 items-center">
                          <ul className="text-[#6840E0]">
                            <li>{option.logo}</li>
                          </ul>
                          <div className="flex-col flex gap-1 justify-center">
                            <div className="flex font-dmsans text-base text-grey-300 font-semibold">
                              {option.title}
                            </div>
                            {option.desc && <div className="flex font-dmsans text-sm text-grey-300 font-normal">
                              {option.desc}
                            </div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
