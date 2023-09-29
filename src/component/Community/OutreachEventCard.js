import React from "react"
import userImg from "../../images/user.jpeg"
import verifiedImg from "../../images/verified.png"
import wavingHand from "../../images/waving_hand.png"

const OutreachEventCard = () => {
    return(
        <div className="bg-[#F5EEFE] w-full rounded-2xl">
            <div className="inline-flex items-center px-6 pt-9 pb-3 space-x-2">
                <img src={userImg} className="w-9 h-9 rounded-full"/>
                <div className="font-normal font-['Inter'] text-[15px] ">William Smith</div>
                <img src={verifiedImg} className="w-6 h-6"/>
            </div>
            <div className="px-6 py-3 space-y-4 w-full">
                <div className="font-medium text-xl font-bricolage">BK Fort Green Outreach</div>
                <div className="font-semibold font-['Inter'] text-[13px] text-[#37168B]">Sept 9, 2023 SAT 12:00pm</div>
                <div className="font-normal font-['Inter'] text-[#444746] text-[13px]">200 Eastern Pkwy, Brooklyn, NY 11238</div>
                <div className="w-full inline-flex bg-white px-4 py-3 space-x-2.5 rounded-2xl">
                    <img src={wavingHand} />
                    <div className="font-normal font-['Inter'] text-[13px] text-[#181818]">Childcare Specialist needed</div>
                </div>
            </div>
            <div className="inline-flex items-center justify-between px-6 pt-4 pb-6 gap-16">
                <button className="font-semibold text-[15px] text-[#181818] rounded-full px-4 py-2.5 bg-[#E6DCFF]">RSVP</button>
                <div className="font-normal font-['Inter'] text-[13px]">Open Spots: 8/20</div>
            </div>
        </div>
    )
}
 
export default OutreachEventCard