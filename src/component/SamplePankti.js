import React from "react";
import { useNavigate } from "react-router-dom";

function PanktiSample() {
 const navigate = useNavigate();
  return (
      <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
      
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
        </div>

        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 mb-8 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          
        <div>
          <div className="sm:p-4 lg:px-10 lg:py-10 bg-gradient-to-br from-[#FFF8BA] to-[#DDD] rounded-t-2xl px-2 py-6 flex-col justify-start items-start gap-4 inline-flex w-full">

            <div>
              <div className="text-2xl font-medium font-dmsans">
                Help Requests (7)
              </div>
              <div className="text-md font-normal font-dmsans pt-2">
                What are help requests and how can they help you? If you are ready
                to help people now, kindly sign up to outreaches
              </div>
            </div>
          </div>
        <div className="sm:p-4 lg:px-10 lg:py-10 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
          <div>
          <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-y border-[#C8C8C8] sm:justify-end">
          <div className=" md:grid md:grid-cols-3 md:gap-4">
            <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[15px] inline-flex col-span-2 md:mb-0 mb-4">
            
              <div className="w-fit h-8 px-2 py-1 bg-[#FFECF2] rounded-lg justify-start items-start gap-2 inline-flex">
                <div className="text-center text-[#7E0025] text-lg font-semibold font-opensans leading-normal">
                  Need Help
                </div>
              </div>

              <div className="self-stretch text-[#616161] text-[15px] font-normal font-dmsans leading-normal">
                Location: 200 Eastern Pkwy, Brooklyn, NY 11238
              </div>

              <div className="self-stretch text-[#273164] text-[28px] font-medium font-bricolage leading-9">
                Homeless man needs immediate assistance
              </div>
              <div className="w-full overflow-x-auto">
                <div className="justify-start items-start gap-2 inline-flex">
                    <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                      <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                        Childcare
                      </div>
                    </div>
                    <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                      <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                        Counseling and support
                      </div>
                    </div>
                </div>
              </div>
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
}

export default PanktiSample;