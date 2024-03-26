import React from "react";
import { useNavigate } from "react-router-dom";

function PanktiSample() {
 const navigate = useNavigate();
  return (
    <div className="flex py-16 flex-col items-center justify-center">
      <div className="w-full flex pt-28 justify-center">
        <div className="bg-gradient-to-br from-[#FFF8BA] to-[#DDD] rounded-t-2xl px-8 py-10 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-2xl font-medium font-dmsans">
            Help Requests (6)
          </div>
          <div className="text-md font-normal font-dmsans pt-2">
            What are help requests and how can they help you? If you are ready
            to help people now, kindly sign up to outreaches
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex">
        <div className="bg-[#F7F7F7] w-[61%] rounded-b-2xl px-8 py-10 flex-col justify-start items-start gap-4 inline-flex">
          <div className="w-full">
            <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
              <div className="flex relative">
                  <div className="text-center text-sm font-semibold font-opensans leading-normal">
                    <p className="rounded-lg bg-[#FFECF2] p-2 text-[#7E0025]">Need help</p> 
                  </div>
                  <div className="text-xs text-[#616161] m-3">
                    <p>Posted 30 mins ago by User K</p>
                  </div>
                  <div className="ml-auto text-sm text-[#FFF]">
                    <p className="bg-[#6840E0] rounded-xl p-2">Offer Help</p>
                  </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

export default PanktiSample;