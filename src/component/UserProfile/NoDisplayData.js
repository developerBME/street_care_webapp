import React from "react";
import DocVec from "../../images/DocVec.svg";
import { useNavigate } from "react-router-dom"; 
import CustomButton from "../Buttons/CustomButton";
import AllOutreachVisitLog from "../AllOutreachVisitLog";


function NoDisplayData({name,label}){
    const navigate = useNavigate();
    if (name=="signedupoutreaches"){
        return(
            <div>
                <div className="h-fit flex flex-col justify-center items-center">
                    <img className="w-[260px] h-[250px] flex"
                        src={DocVec}
                        alt="HandshakeLogo"
                    />
                </div>
                <div className="h-fit flex flex-col justify-center items-center gap-2">
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9 mt-9">{label}</div>
                </div>
                <div className="flex justify-center items-start gap-4 mt-9">
                    <CustomButton 
                        label="Document Outreach"
                        name="buttondefault"
                        onClick={() => {
                            navigate("/createOutreach");
                        }}
                    />
                    <CustomButton 
                        label="Explore Outreach Events"
                        name="buttonlight"
                        onClick={() => {
                            navigate("/AllOutreachEvents");
                    }}
                    />
                </div>
            </div>
        );
    } else if (name=="visitlog") {
        return (
            <div>
                <div className="h-fit flex flex-col justify-center items-center">
                    <img className="w-[260px] h-[250px] flex"
                        src={DocVec}
                        alt="HandshakeLogo"
                    />
                </div>
                <div className="h-fit flex flex-col justify-center items-center gap-2">
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9 mt-9">{label}</div>
                </div>
                <div className="flex justify-center items-start gap-4 mt-9">
                    <CustomButton 
                        label="Document visit logs"
                        name="buttondefault"
                        onClick={() => {
                            navigate("/profile/personaloutform");
                        }}
                    />
                    <CustomButton 
                        label="Explore visit logs"
                        name="buttonlight"
                        onClick={() => {
                            navigate("/AllOutreachVisitLog")
                    }}
                    />
                </div>
            </div>
        );
    }else if (name=="helprequest") {
        return (
            <div>
                <div className="h-fit flex flex-col justify-center items-center">
                    <img className="w-[260px] h-[250px] flex"
                        src={DocVec}
                        alt="HandshakeLogo"
                    />
                </div>
                <div className="h-fit flex flex-col justify-center items-center gap-2">
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9 mt-9">{label}</div>
                </div>
                <div className="flex justify-center items-start gap-4 mt-9">
                    <CustomButton 
                        label="Document Help Requests"
                        name="buttondefault"
                        onClick={() => {
                            navigate("/createOutreach");
                        }}
                    />
                    <CustomButton 
                        label="Explore Help Requests"
                        name="buttonlight"
                        onClick={() => {
                            navigate("/AllHelpRequests");
                    }}
                    />
                </div>
            </div>
        );
    }
}
export default NoDisplayData;