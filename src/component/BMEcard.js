import React from "react";



const BMEcard = () => {
    return (
      
      <div className="w-full mx-auto bg-violet-50 rounded-lg p-8 lg:p-6 ">
        <div className="p-2 justify-start items-center gap-2 inline-flex">
          <div className="w-7 h-7 md:w-9 relative">
            <div className="w-7 h-7 md:w-9 left-0 top-0 absolute bg-yellow-200 rounded-full"></div>
            <div className="left-[4px] top-[6px] md:left-[6px] md:top-[8px] absolute text-black text-[6px] md:text-[8px] font-bold">
              Street
            </div>
            <div className="left-[7px] top-[14px] md:left-[9px] md:top-[18px] absolute text-black text-[6px] md:text-[8px] font-bold">
              Care
            </div>
          </div>
          <div className="text-black lg:text-[12px] md:text-[10px] font-normal">Street Care Official</div>
        </div>
        <div className="self-stretch h-auto md:h-[156px] flex-col justify-start items-start gap-2 md:gap-4 flex">
          <div className="self-stretch text-neutral-800 text-[20px] md:text-[16px] lg:text-[20px] font-medium leading-loose">Volunteer Meetup</div>
          <div className="self-stretch text-zinc-700 text-[14px] md:text-[12px] lg:text[14px] font-semibold leading-normal">Sept 9, 2023 SAT 12:00pm</div>
          <div className="self-stretch h-auto md:h-[52px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-zinc-700 text-[12px]  md:text-[10px] lg:text[12px] font-normal leading-normal">
              200 Eastern Pkwy, Brooklyn, NY 11238
            </div>
            <div className="self-stretch text-zinc-700 text-[12px] md:text-[10px] lg:text[12px] font-normal leading-normal">Open Spots: 8/20</div>
          </div>
        </div>
        <div className="self-stretch h-auto md:h-[68px]  flex-col justify-start items-start gap-2.5 flex">
          <div className="px-6 py-2 rounded-[100px] border border-violet-950 justify-center items-center gap-2.5 inline-flex">
            <button className="text-center text-sm md:text-base">Join</button>
          </div>
        </div>
      </div>
    );
  };
  
  
// const BMEcard = ()=>{
//     return(
//     <div className="w-[429.33px] h-[404px] p-8 bg-violet-50 rounded-[30px] flex-col justify-start items-start gap-8 inline-flex">
//     <div className="p-2 justify-start items-center gap-2 inline-flex">
//         <div className="w-9 h-9 relative">
//             <div className="w-9 h-9 left-0 top-0 absolute bg-yellow-200 rounded-full"></div>
//             <div className="left-[6px] top-[8px] absolute text-black text-[8px] font-bold">Street</div>
//             <div className="left-[9px] top-[18px] absolute text-black text-[8px] font-bold">Care</div>
//         </div>
//         <div className="text-black text-xs font-normal">Street Care Official</div>
//     </div>
//     <div className="self-stretch h-[156px] flex-col justify-start items-start gap-6 flex">
//         <div className="self-stretch text-neutral-800 text-2xl font-medium leading-loose">Volunteer Meetup</div>
//         <div className="self-stretch text-zinc-700 text-lg font-semibold leading-normal">Sept 9, 2023 SAT 12:00pm</div>
//         <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
//             <div className="self-stretch text-zinc-700 text-[17px] font-normal leading-normal">200 Eastern Pkwy, Brooklyn, NY 11238</div>
//             <div className="self-stretch text-zinc-700 text-[17px] font-normal leading-normal">Open Spots: 8/20</div>
//         </div>
//     </div>
//     <div className="self-stretch h-[68px] pt-3 flex-col justify-start items-start gap-2.5 flex">
//         <div className="px-8 py-4 rounded-[100px] border border-violet-950 justify-center items-center gap-2.5 inline-flex">
//             <button className="text-center">Join</button>
//         </div>
//     </div>
// </div>
    
//     )
// }

export default BMEcard