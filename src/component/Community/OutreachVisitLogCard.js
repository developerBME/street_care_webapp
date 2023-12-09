import React from "react"
import profilePic from "../../images/avatar.jpg"
import wavingHand from "../../images/waving_hand.png"
import CustomButton from "../Buttons/CustomButton"
import { useNavigate } from "react-router-dom";

const OutreachVisitLogCard = ()=>{
    const navigate = useNavigate();

    const handleViewDetailsClick = () => {
        const details = {
          name: "Joshua K",
          date: "Sept 9, 2023",
          location: "Brooklyn, NY 11238",
          description:
            "Tommy, a senior citizen in a wheelchair wearing a navy blue top and brown shoes.",
          categories: ["Clothes", "Food and Drinks"],
          need: "Childcare specialist needed",
        };
    
        navigate(`/VisitLogDetails?${new URLSearchParams(details).toString()}`);
      };


    return (
        <div className="bg-[#F5EEFE] rounded-2xl ">
            <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                <img src={profilePic} className="w-6 h-6 rounded-full"/>
                <div>Joshua K</div>
            </div>
            <div className="px-6 py-2">
                <div className="space-y-4">
                    <div class="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight">Sept 9, 2023 · Brooklyn, NY 11238</div>
                    <div class="text-zinc-700 text-[10px] font-normal font-['DM Sans'] leading-snug">Tommy, a senior citizen in a wheelchair wearing a navy blue top and brown shoes.</div>
                    <div className="inline-flex items-center gap-2">
                        <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">Clothes</div>
                        <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">Food and Drinks</div>
                    </div>
                    <div className="w-full inline-flex items-center bg-white px-4 py-1 space-x-2.5 rounded-2xl">
                        <img src={wavingHand} />
                        <div className="font-normal font-['Inter'] text-[10px] text-[#181818]">
                        Childcare specialist needed
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2 px-6 pb-6 space-x-2">
                <CustomButton label="View Details" name="buttonlightsmall" onClick={handleViewDetailsClick} />
                <CustomButton label="Share" name="buttonsmallborder2"/>
            </div>
        </div>
    )
}

export default OutreachVisitLogCard;