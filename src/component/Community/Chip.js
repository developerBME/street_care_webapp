import React from "react";
import add2 from "../../images/add2.png"

const Chip = (props)=>{
    return(
        <div className="inline-flex cursor-pointer items-center gap-1 bg-white border border-[#CACACA] rounded-full px-3 py-1">
            <div className="text-[#616161] text-sm font-semibold font-['Open Sans']">{props.val}</div>
            <img src={add2} className="w-6 h-6" />
        </div>
    );
}

export default Chip