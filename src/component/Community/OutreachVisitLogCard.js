import React from "react"
import profilePic from "../../images/avatar.jpg"
import wavingHand from "../../images/waving_hand.png"
import location from "../../images/location_on.svg"
import calender from "../../images/calendar_month.svg"
import CustomButton from "../Buttons/CustomButton"
import defaultImage from "../../images/default_avatar.svg";
import { useNavigate } from "react-router-dom";

const OutreachVisitLogCard = ({visitLogCardData, IsNotProfile})=>{
    const navigate = useNavigate();

    return (
        <div className="bg-[#F5EEFE] rounded-2xl flex flex-col h-full">
                {IsNotProfile && (
                        <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                            <img
                                src={visitLogCardData.photoUrl || defaultImage}
                                className="w-6 h-6 rounded-full"
                            />
                            <div>{visitLogCardData.userName || "not defined"}</div>
                        </div>
                )}
                <div className="flex-1 px-6 py-2">
                <div className="space-y-4">
                {IsNotProfile && (
                        <div class="text-violet-900 text-sm font-medium font-bricolage leading-tight">{visitLogCardData.date || ""} · {visitLogCardData?.location?.street || ""} {visitLogCardData?.city || ""} {visitLogCardData?.state || ""} {visitLogCardData?.location?.zipcode || ""}</div>
                )}

                {IsNotProfile && (
                            <div>
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
                     )
                    }

                {!IsNotProfile && (
                    <div className="mt-2">
                        <div className="flex xl:justify-between xl:mt-5 mt-0 flex-col xl:flex-row">
                            <div className="text-violet-900 text-[12px] font-medium font-bricolage leading-tight flex flex-row">
                                <div>{<img className="w-4 h-4" src={calender} />}</div>
                                <div>{visitLogCardData.date || ""} · {visitLogCardData.time}</div>
                            </div>
                            <div className="text-violet-900 text-[12px] font-medium font-bricolage leading-tight flex flex-row mt-2 xl:mt-0"> 
                                <div>{<img className="w-4 h-4" src={location} />}</div>
                                <div>{visitLogCardData?.city || ""}, {visitLogCardData?.state || ""}</div>
                            </div>
                        </div>
                        <div class="text-zinc-700 text-[12px] font-normal font-bricolage leading-snug mt-2 mb-2">{visitLogCardData.description || ""}</div>
                        <div className="flex justify-between mt-2 mb-2">
                            <div className="text-neutral-900 text-[12px]  font-bold font-bricolage leading-tight text-left">People Helped</div>
                            <div className="text-neutral-900 text-[18px] mt-[-5px] font-bold font-bricolage leading-tight text-right">{visitLogCardData.numberPeopleHelped || ""} </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-2">
                            <div className="text-neutral-900 text-[12px]  font-bold font-bricolage leading-tight text-left">Items Donated</div>  
                            <div className="text-neutral-900 text-[18px]  mt-[-5px] font-bold font-bricolage leading-tight text-right">{visitLogCardData.itemQty || ""} </div>
                        </div>
                        <div className=""> 
                                 <div className="inline-flex items-center gap-2 flex-wrap mt-2">
                                     {visitLogCardData?.whatGiven.map((item, index) => (
                                     <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]">{item}</div>
                                     ))}
                                 </div>
                        </div>
                    </div>
                )}
                    
                </div>
            </div>
            <div className="pt-2 px-6 pb-6 space-x-2">
                <CustomButton label="View Details" name="buttonlightsmall" onClick={() => {navigate(`/VisitLogDetails/${visitLogCardData.id}`);
                  }} />
                  {IsNotProfile && (
                        <CustomButton label="Share" name="buttonsmallborder2"/>)}
            </div>
        </div>
    )
}

export default OutreachVisitLogCard;





