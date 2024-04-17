import React from "react";

const UpdateEmailAddress = () => {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="w-1/2 bg-[#f7f7f7] rounded-l-2xl">
            <div className="w-full h-full px-4 py-6 lg:px-12 lg:py-16 xl:p-16 flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[35px] inline-flex">
                <div className="flex-col justify-start items-start gap-5 md:gap-8 inline-flex">
                  <div className="text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                    Account Settings
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white rounded-r-2xl">
            <div className="w-full h-full px-4 py-6 lg:px-12 lg:py-16 xl:p-16 flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex flex-col gap-8 font-dmsans">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">
                    Steps to update your email address
                  </div>
                  <div className="text-base font-normal">
                    Ensure you have access to both your email addresses before
                    proceeding.
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-bold">Step 1 - Verify Existing Email</div>
                  <div className="text-base font-normal">Verify your existing email address using the link sent to your email address.</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-bold">Step 2 - Verify New Email</div>
                  <div className="text-base font-normal">Verify your new email address using the link sent to your email address.</div>
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
