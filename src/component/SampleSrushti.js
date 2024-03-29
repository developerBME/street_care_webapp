import React from "react";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";
import icon_howtoprep from "../images/icon_howtoprep.png";
import three from "../images/three.png";

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
                   <div className="w-full h-fit justify start items-start grid grid-cols-2 lg:grid-cols-2 font-bricolage ">
                    
                    <div className="grow items-start h-full lg:items-start xl:items-start flex-col rounded-tl-2xl rounded-bl-2xl lg:rounded-tr-none lg:rounded-tl-2xl lg:rounded-bl-2xl shrink basis-0  px-8 py-4 bg-gradient-to-br from-emerald-300 to-neutral-200 gap-6 flex">
                      <div className="text-violet-950 text-3xl lg:text-3xl font-dmsans font-medium">
                        580K+ 
                        <br/>
                        <span className="font-bricolage text-xl xl:text-sm">Total homeless population in United States</span>

                      </div>
                    </div>
                    <div className="grow items-start h-full lg:items-start xl:items-start flex-col rounded-tr-2xl rounded-br-2xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-purple-200 to-neutral-200 gap-6 flex">
                      <div className="text-violet-950 text-3xl lg:text-3xl xl:text-4xl font-dmsans font-medium ">
                        24%
                        <br/>
                        <span className="font-bricolage text-xl xl:text-sm">Homeless due to health conditions</span>
                      </div>
                    </div>


                  </div>

              </div>
                <h2 className="hidden lg:block text-neutral-800 lg:text-[20px] text-[20px] font-medium font-dmsans lg:leading-[64px] lg:visible leading-[44px] ">
                  Stories
                </h2>{/* hide when xl */}
                <div class="block lg:hidden mt-8 w-12 h-12 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-emerald-300 to-neutral-200 p-5">
                  <img src={icon_howtoprep} className="block lg:hidden mb-6" />
                </div>
                <h2 className="text-neutral-800 lg:text-[20px] text-[20px] font-medium font-dmsans lg:leading-[64px] leading-[44px] lg:hidden mb-6 pb-24 ">
                  Stories from Homeless People
                </h2>
                <div className="bg-[#F5EEFE] rounded-[30px] flex flex-col h-full">

              </div>
              <div class ="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                <div class="rounded-[30px] flex flex-col h-full overflow-hidden shadow-lg">
                  <img class="w-full" src={three} alt="Rodney"></img>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Rodney</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                </div>

                <div class="rounded-[30px] flex flex-col h-full overflow-hidden shadow-lg">
                  <img class="w-full" src={three} alt="Matt"></img>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Matt</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                </div>

                <div class="rounded-[30px] flex flex-col h-full overflow-hidden shadow-lg">
                  <img class="w-full" src={three} alt="Anna"></img>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">'Anna'</div>
                      <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                </div>

              </div>

              <div>
                <h2 class="text-gray-800 py-8 text-[20px] font-dmsans">Let's get started</h2>
              </div>
              <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                <div class="xl:m-0 h-25 bg-white rounded-xl shadow-md overflow-hiddenmd:max-w-xl">
                  <div class="md:flex">
                    <div class ="">
                      <div class="h-36 w-full object-cover md:h-full md:w-36 bg-gradient-to-br from-emerald-300 to-neutral-200">
                        <img src={icon_howtoprep} className="h-16 items-center"></img>
                      </div>

                    </div>
                    <div class="p-8">
                      <div class="text-sm text-gray-800 font-semibold">How to prepare care package?</div>
                      <span class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Make helpful, respectful, and appropriate care packages.</span>

                    </div>
                  </div>

                </div>

                <div class="xl:m-0 h-25 bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
                  <div class="md:flex">
                    <div class=" ">
                      <div class="h-36 w-full object-cover md:h-full md:w-36 bg-gradient-to-br from-purple-300 to neutral-200">
                        <img src={icon_howtoprep} className="h-16 items-center"></img>
                      </div>
                    </div>
                    <div class="p-8">
                      <div class="text-sm text-gray-800 font-semibold">Prepare guide for outreach</div>
                      <span href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        Tips on what to bring, how to approach and safety tips for a successful outreach.
                      </span>
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