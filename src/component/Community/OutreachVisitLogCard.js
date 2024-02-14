import React from "react"
import wavingHand from "../../images/waving_hand.png"
import CustomButton from "../Buttons/CustomButton"
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";

const OutreachVisitLogCard = ({visitLogCardData})=>{
    const navigate = useNavigate();

    return (
        <div className="bg-[#F5EEFE] rounded-[30px] flex flex-col h-full">
                
                        <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                            <img
                                src={visitLogCardData.photoUrl || defaultImage}
                                className="w-6 h-6 rounded-full"
                            />
                            <div>{visitLogCardData.userName || "not defined"}</div>
                        </div>
                <div className="flex-1 px-4 xl:py-1.5 lg:py-4 py-3">
                <div className="space-y-4">
                        <div class="text-violet-900 text-sm font-medium font-bricolage leading-tight">{visitLogCardData.date || ""} · {visitLogCardData?.location?.street || ""} {visitLogCardData?.city || ""} {visitLogCardData?.state || ""} {visitLogCardData?.location?.zipcode || ""}</div>
                               <div class="text-zinc-700 text-[10px] font-normal font-bricolage leading-snug">{visitLogCardData.description || ""}</div>
                               <div className=""> 
                                 <div className="inline-flex items-center gap-2 flex-wrap">
                                     {visitLogCardData?.whatGiven.map((item, index) => (
                                     <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">{item}</div>
                                     ))}
                                 </div>
                               </div>
                                <div className="w-full inline-flex items-center bg-white px-4 py-1 space-x-2.5 rounded-2xl">
                                    <img src={wavingHand} />
                                    <div className="font-normal font-['Inter'] text-[10px] text-[#181818]">
                                    {visitLogCardData.helpType || ""}
                                    </div>
                                </div>
                </div>
            </div>
            <div className="pt-2 px-4 pb-6 space-x-2">
                <CustomButton label="View Details" name="buttonlightsmall" onClick={() => {navigate(`/VisitLogDetails/${visitLogCardData.id}`);
                  }} />
                        <CustomButton label="Share" name="buttonsmallborder2"/>
            </div>
        </div>
    )
}

export default OutreachVisitLogCard;





