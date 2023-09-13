import React from "react";
import verifiedImg from "../images/verified.png";
import userImg from "../images/avatar.jpg";
import wavingHand from "../images/waving_hand.png";

const Eventcard = () => {
  return (
    <div className=" w-fit  bg-[#DEF6EB] rounded-lg p-8 lg:p-6 ">
      <div class="flex items-center gap-1">
        <img class="w-9 h-9 rounded-full" src={userImg} alt="User Avatar" />
        <div class="text-black text-xs font-normal">William Smith</div>
        <div class="bg-emerald-100 rounded-xl border border-stone-300 flex items-center px-2 py-1">
          <img class="w-4 h-4" src={verifiedImg} alt="Verified" />
          <div class="text-zinc-700 text-sm  font-semibold leading-tight ">
            Certified Lead
          </div>
        </div>
      </div>
      <div className="mt-2 lg:mt-4">
        <div className="text-neutral-800 text-xl font-medium leading-normal">
          BK Fort Green Outreach
        </div>
        <div className="text-zinc-700  text-[17px] font-semibold leading-normal">
          Sept 9, 2023 SAT 12:00pm
        </div>
        <div className="my-6 p-2 bg-white rounded-lg flex items-center gap-2.5">
          <img src={wavingHand} alt="Waving Hand" />
          <div className="text-neutral-900 text-sm font-normal leading-snug">
            Childcare specialist needed
          </div>
        </div>
        <div className="mt-2 md:mt-4 flex flex-col gap-1">
          <div className="text-zinc-700 text-lg font-normal">
            200 Eastern Pkwy, Brooklyn, NY 11238
          </div>
          <div className="text-zinc-700 text-lg font-normal">
            Open Spots: 8/20
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-4">
        <div className="pt-3 flex items-center gap-2.5">
          <button className=" border-2 border-[#1F0A58] text-[#1F0A58] py-4 px-8 rounded-full text-sm ">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

// const Eventcard = ()=>{
//     return(
//         <div className="w-[429.33px] h-[494px] p-8 bg-green-100 rounded-[30px] flex-col justify-start items-start gap-8 inline-flex">
//         <div className="p-2 justify-start items-center gap-2 inline-flex">
//             <img className="w-9 h-9 rounded-full" src={userImg} />
//             <div className="justify-start items-center gap-2 flex">
//                 <div className="text-black text-xs font-normal">William Smith</div>
//                 <div className="w-[143px] pl-2 pr-3 py-1 bg-emerald-100 rounded-xl border border-stone-300 justify-start items-center gap-1 flex">
//                     <img className="w-4 h-4"src = {verifiedImg}/>
//                     <div className="opacity-90 justify-start items-center gap-1 flex">
//                         <div className="text-zinc-700 text-sm font-semibold leading-tight">Certified Lead</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="self-stretch h-[246px] flex-col justify-start items-start gap-6 flex">
//             <div className="self-stretch text-neutral-800 text-2xl font-medium leading-loose">BK Fort Green Outreach</div>
//             <div className="self-stretch text-zinc-700 text-lg font-semibold leading-normal">Sept 9, 2023 SAT 12:00pm</div>
//             <div className="self-stretch p-4 bg-white rounded-2xl justify-center items-center gap-2.5 inline-flex">
//                 <img src={wavingHand}/>
//                 <div className="grow shrink basis-0 text-neutral-900 text-[15px] font-normal leading-snug">Childcare specialist needed</div>
//             </div>
//             <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
//                 <div className="self-stretch text-zinc-700 text-[17px] font-normal leading-normal">200 Eastern Pkwy, Brooklyn, NY 11238</div>
//                 <div className="self-stretch text-zinc-700 text-[17px] font-normal leading-normal">Open Spots: 8/20</div>
//             </div>
//         </div>
//         <div className="self-stretch h-[68px] pt-3 flex-col justify-start items-start gap-2.5 flex">
//             <div className="px-8 py-4 rounded-[100px] border border-violet-950 justify-center items-center gap-2.5 inline-flex">
//                 <button>Join</button>
//             </div>
//         </div>
//     </div>
//     )
// }

export default Eventcard;
