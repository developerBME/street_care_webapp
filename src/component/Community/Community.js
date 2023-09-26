import React from "react";

import Landing from "../HomePage/Landing";
import Form from "../Community/Form"
import arrowBack from "../../images/arrowBack.png"

function Community() {
  return (
    
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black ">
          <div className="inline-flex pl-40 cursor-pointer pb-[19px]">
             <img src={arrowBack}/>
             <p className="font-semibold font-bricolage text-[22px]">Return to Profile</p>
         </div>
          <div className="rounded-2xl mx-2 mb-32 lg:mx-40 bg-[#F8F9F0] pt-[100px] pb-[100px] pr-[150px] pl-[150px]">
           <Form/>
         </div>
        </div>
      </div>
    </div>
  
    // <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
    //     <div className="pt-32 inline-flex pb-4">
    //         <img src={arrowBack}/>
    //         <p className="font-semibold font-bricolage text-[22px]">Return to Profile</p>
    //     </div>
    //   <div className="relative flex flex-col items-center ">
    //     <div className="rounded-2xl mx-2 mb-32 lg:mx-40 bg-[#F8F9F0] pt-[100px] pb-[100px] pr-[150px] pl-[150px]">
    //       <Form/>
    //     </div>
    //   </div>
    // </div>

  );
}

export default Community;
