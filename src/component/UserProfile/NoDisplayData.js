import React from "react";
import DocVec from "../../images/DocVec.svg";
import { useNavigate } from "react-router-dom"; 


function NoDisplayData({name,label}){
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
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9">{label}</div>
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
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9">{label}</div>
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
                    <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9">{label}</div>
                </div>
            </div>
        );
    }
}
export default NoDisplayData;