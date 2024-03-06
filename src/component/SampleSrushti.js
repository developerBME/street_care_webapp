import React from "react";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function SrushtiSample() {
  const navigate = useNavigate();
   return (
         
     <div className="relative flex flex-col items-center ">
         <div className=" w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black mb-20 ">
 
             <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
         
                 <h2 className="text-neutral-800 lg:text-[57px] text-[36px] font-medium font-bricolage lg:leading-[64px] leading-[44px] pb-24 ">
                     Why should I get involved?
                 </h2>
         
                 <div className="w-fit text-zinc-600 text-lg font-normal font-open-sans leading-normal ">
                     Getting involved in addressing homelessness brings positive change to individuals, communities, and society.
                     By joining the cause, you can contribute to meaningful impact and personal fullfillment.
                 </div>
         
             </div>
         </div>
     </div>
   );
 }
 
 export default SrushtiSample;