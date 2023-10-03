import React from "react"
import userImg from "../../images/user.jpeg"
import verifiedImg from "../../images/verified_purple.png"
import wavingHand from "../../images/waving_hand.png"

const OutreachEventCard = ({cardData}) => {
    const {name,eventName,eventDate,location,req} = cardData

    return(
        <div className="bg-[#F5EEFE] w-[340px] lg:w-full rounded-2xl mb-4">
            <div className="inline-flex items-center px-5 pt-6 pb-3 space-x-2">
                <img src={userImg} className="w-8 h-8 rounded-full"/>
                <div className="font-normal font-['Inter'] text-[13px] ">{name}</div>
                <img src={verifiedImg} className="w-5 h-5"/>
            </div>
            <div className="px-5 py-2 space-y-2 w-full">
                <div className="font-medium text-[16px] font-bricolage">{eventName}</div>
                <div className="font-semibold font-['Inter'] text-[12px] text-[#37168B]">{eventDate}</div>
                <div className="font-normal font-['Inter'] text-[#444746] text-[12px]">{location}</div>
                <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
                    <img src={wavingHand} />
                    <div className="font-normal font-['Inter'] text-[12px] text-[#181818]">{req}</div>
                </div>
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-4 gap-16">
                <button className="font-semibold text-[11px] text-[#181818] rounded-full px-4 py-2 bg-[#E6DCFF]">RSVP</button>
                <div className="font-normal font-['Inter'] text-[12px]">Open Spots: 8/20</div>
    </div> 
        </div>
    )
}
 
export default OutreachEventCard