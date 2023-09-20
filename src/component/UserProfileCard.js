import React from "react";

const UserProfileCard = ({cardData})=>{

    const { title, eventName, eventDate, buttonText } = cardData;

    return(
        <div className="bg-[#F1EEFE] w-fit p-4 rounded-xl">
            <div className="flex flex-col space-y-8">
                <p className="text-xs text-sky-900 font-['Inter'] font-semibold leading-[18px]">{title}</p>
                <div className="flex flex-col space-y-6">
                    <div className="text-[17px] text-neutral-800 font-bold font-bricolage leading-7">{eventName}</div>
                    <div className="text-zinc-700 text-[14px] font-semibold font-['Inter'] leading-normal">{eventDate}</div>
                </div>
                <div className="pt-3">
                    <button className="px-6 py-2 border border-violet-400 rounded-full text-center text-violet-400 text-md font-semibold font-lato leading-normal">{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfileCard;