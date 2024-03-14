import React from "react";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function SrushtiSample() {
  const navigate = useNavigate();
   return (
         
     <div className="relative flex flex-col items-center ">
         <div className=" w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black mb-20 ">
 
             <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
         
                 <h2 className="text-neutral-800 lg:text-[57px] text-[36px] font-medium font-bricolage lg:leading-[64px] leading-[44px] pb-10 ">
                     Why should I get involved?
                 </h2>
                 
         
                 <div className="w-fit text-zinc-600 text-lg font-normal font-open-sans leading-normal ">
                     Getting involved in addressing homelessness <span className="text-purple-500 lg:hidden">brings positive change </span> to individuals, communities, and society.
                     By joining the cause, you can contribute to meaningful impact and personal fullfillment.
                 </div>
                 <div className=" mt-10 w-full h-fit justify-start items-start">
                   <div className="w-full h-fit justify start items-start grid grid-cols-1 lg:grid-cols-2 font-bricolage ">
                    
                    <div className="grow items-start h-full lg:items-start xl:items-start flex-col rounded-t-2xl  lg:rounded-tr-none lg:rounded-tl-2xl lg:rounded-bl-2xl shrink basis-0  px-8 py-4 bg-gradient-to-br from-emerald-300 to-neutral-200 gap-6 flex">
                      <div className="text-violet-950 text-2xl lg:text-xl font-bricolage font-medium leading-loose text-[40px] font-normal leading-[64px]">
                        580K+ 
                        <br/>
                        <span className="text-xs">Total homeless population in United States</span>

                      </div>
                    </div>
                    <div className="grow items-start h-full lg:items-start xl:items-start flex-col rounded-tr-2xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-purple-200 to-neutral-200 gap-6 flex">
                      <div className="text-violet-950 text-2xl lg:text-xl font-bricolage font-medium leading-loose text-[40px] font-normal leading-[64px]">
                        24%
                        <br/>
                        <span className="text-xs">Homeless due to health conditions</span>
                      </div>
                    </div>


                  </div>

                 </div>

         
             </div>
         </div>
     </div>
   );
 }
 
 export default SrushtiSample;