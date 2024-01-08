import React from "react"
import profilePic from "../../images/avatar.jpg"
import wavingHand from "../../images/waving_hand.png"
import CustomButton from "../Buttons/CustomButton"
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";

const OutreachVisitLogProfileCard = ({visitLogCardData})=>{
    const navigate = useNavigate();

    return (
        <div className="bg-[#F5EEFE] rounded-2xl ">
            {/*<div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                 <img src={visitLogCardData.photoUrl || defaultImage} className="w-6 h-6 rounded-full"/>
                 <div>{visitLogCardData.userName || "not defined"}</div>
            </div> */}
            <div className="px-6 py-2">
                <div className="space-y-4 mt-3">
                    <div className="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight">{visitLogCardData.date || ""} {visitLogCardData.time}</div>
                    <div className="font-normal font-inter text-[#444746] text-[13px]">{visitLogCardData?.location?.street || ""} {visitLogCardData?.city || ""} {visitLogCardData?.state || ""} {visitLogCardData?.location?.zipcode || ""}
                    </div>
                    <div class="text-zinc-700 text-[12px] font-normal font-['DM Sans'] leading-snug">People Helped : {visitLogCardData.numberPeopleHelped || ""}</div>
                    <div className="inline-flex items-center gap-2">
                        {visitLogCardData?.whatGiven.map((item, index) => (
                        <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">{item}</div>
                        ))}
                    </div>
                    <div className="w-full inline-flex items-center bg-white px-4 py-1 space-x-2.5 rounded-2xl">
                        <img src={wavingHand} />
                        <div className="font-normal font-['Inter'] text-[10px] text-[#181818]">
                        {visitLogCardData.helpType || ""}
                        {/* Childcare specialist needed */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2 px-6 pb-6 space-x-2">
                <CustomButton label="View Details" name="buttonlightsmall" onClick={() => {navigate(`/VisitLogDetails/${visitLogCardData.id}`);
                  }} />
                <CustomButton label="Share" name="buttonsmallborder2"/>
            </div>
        </div>
    )
}

export default OutreachVisitLogProfileCard;