import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const UpdateProfile = () => {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="bg-[#f7f7f7] rounded-l-2xl">
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
                        <Typography>Update your Profile</Typography>
                      </Breadcrumbs>
                    </div>
                    <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                      Update your Profile
                    </div>
                  </div>
                  <div className="items-center justify-center h-full w-full rounded-xl bg-white">
                    <div className="flex-row">
                      <div className="flex-row"></div>
                      <div c></div>
                    </div>
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

export default UpdateProfile;
