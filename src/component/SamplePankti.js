import React from "react";
import { useNavigate } from "react-router-dom";

function PanktiSample() {
 const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div class="w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="sm:p-4 lg:px-10 lg:py-10 bg-gradient-to-br from-[#FFF8BA] to-[#DDD] rounded-t-2xl px-2 py-6 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-2xl font-medium font-dmsans">
            Help Requests (6)
          </div>
          <div className="text-md font-normal font-dmsans pt-2">
            What are help requests and how can they help you? If you are ready
            to help people now, kindly sign up to outreaches
          </div>
        </div>
        <div className="sm:p-4 lg:px-10 lg:py-10 bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
         
        </div>

      </div>
      <div class="w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="sm:p-4 lg:px-10 lg:py-10 bg-gradient-to-br from-[#FFF8BA] to-[#DDD] rounded-t-2xl px-2 py-6 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-2xl font-medium font-dmsans">
            Help Requests (6)
          </div>
          <div className="text-md font-normal font-dmsans pt-2">
            What are help requests and how can they help you? If you are ready
            to help people now, kindly sign up to outreaches
          </div>
        </div>
        <div className="sm:p-4 lg:px-10 lg:py-10 bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
         
        </div>

      </div>
    </div>
  );
}

export default PanktiSample;