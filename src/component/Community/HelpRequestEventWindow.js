import React from "react";
import CustomButton from  "../Buttons/CustomButton";
import Needhelp from "../../images/help_announcement.png";

function HelpRequestEventWindow() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-fit lg:w-[fit] mx-2 lg:mx-40 mt-32 mb-20 rounded-2xl bg-white text-black ">
          {/*  */}
          <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-fit rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="w-fit text-neutral-800 text-[50px] font-medium font-['DM Sans'] leading-[64px]">
                Help request in 123 Plaza
              </div>

              <div className="w-fit h-8 px-2 py-1 bg-rose-50 rounded-lg justify-start items-start gap-2 inline-flex">
                   <img className="w-6 h-6" src={Needhelp} alt="..."
                            ></img>
                   <div className="text-center text-rose-900 text-lg font-semibold font-['Open Sans'] leading-normal">
                   Need Help</div>
              </div>

              <div className="w-fit text-zinc-600 text-sm font-normal font-open-sans leading-normal">
                Posted on july 23, 2023 by Jay K
              </div>


              {/* block */}
              <div className="self-stretch h-72 flex-col justify-start items-start gap-8 flex mt-10">
                <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
                 <div className="self-stretch text-black text-sm font-bold font-['Bricolage Grotesque'] leading-tight">Name</div>
                    <div className="self-stretch text-zinc-600 text-sm font-normal font-['Open Sans'] leading-tight">Lucy </div>
                </div>


                <div className="flex-col space-x-0 space-y-2">
                   <div className="w-fit text-black text-sm font-bold font-['Bricolage Grotesque'] leading-tight">What kind of help they need?</div>
                   <div className="flex-row space-x-2 space-y-4">
                     <div className="w-20 h-8 px-3 py-1 rounded-xl border border-stone-300 justify-start items-center gap-4 inline-flex">
                     <div className="text-zinc-700 text-sm font-semibold font-['Open Sans'] leading-tight">
                       Childcare     
                     </div>
                     </div>
                     <div className="w-fit h-8 px-3 py-1 rounded-xl border border-stone-300 justify-start items-center gap-4 inline-flex">
                        <div className="text-zinc-700 text-sm font-semibold font-['Open Sans'] leading-tight">
                         Counseling and Support
                        </div>
                     </div>
                   </div>
                   <div className="w-fit text-zinc-600 text-sm font-normal font-['Open Sans'] leading-tight">Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling. </div>
                </div>


                <div className="w-fit h-16 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch text-black text-sm font-bold font-['Bricolage Grotesque'] leading-tight">How can other Volunteers find them?</div>
                    <div className="self-stretch text-zinc-600 text-sm font-normal font-['Open Sans'] leading-tight">123 Plaza, New York<br/>She is around 5’3 tall, with blonde long hair and tattoos on her arm.</div>
                </div>
                
              </div>
              
                  {/* block */}
             
              
            </div>


            {/* button div */}
            <div className="flex space-x-4 md:mt-10 mt-10">
            <CustomButton label="I can Help" name="buttondefault" />
            <CustomButton label="Cancel" name="buttonmediumlight" />
            </div>

          </div>
          
        </div>
       
      </div>
    </div>
  );
}

export default HelpRequestEventWindow;
