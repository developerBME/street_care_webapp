import React from "react";


function CustomButton({ label, name }) {
    
    if (name == 'buttonborder'){
        return (
            <button className="text-[#1F0A58] font-semibold text-base font-normal py-[8px] px-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300">
              {label}
            </button>
          );
    } else if(name == 'buttondefault'){
        return (
          <button className="bg-[#6840E0] font-semibold text-base text-white font-normal py-[8px] px-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300">
            {label}
          </button>
          );
    } else if(name == 'buttonlight'){
        return (
            <button className="bg-violet-200 font-semibold text-base text-[#181818] font-normal py-[8px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300">
              {label}
            </button>
          );
    } else if(name == 'buttonsmall'){
      return (
        <button className="bg-violet-700 font-semibold text-base text-white font-normal py-[3px] px-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300">
        {label}
      </button>
        );
    } else if(name == 'buttonsmallight'){
      return (
          <button className="bg-violet-200 font-semibold text-base text-[#181818] font-normal py-[3px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300">
            {label}
          </button>
        );
    } else if (name == 'buttonsmallborder'){
      return (
          <button className="text-[#1F0A58] font-semibold text-base font-normal py-[3px] px-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300">
            {label}
          </button>
        );
    } else {
        return (
            <button className="bg-violet-700 font-semibold text-base text-white font-normal py-[8px] px-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300">
              {label}
            </button>
          );
    }
  }
  
  export default CustomButton;