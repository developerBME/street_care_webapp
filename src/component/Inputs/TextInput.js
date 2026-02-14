import { useEffect, useState, UseRef, forwardRef } from "react";
import { Info } from "lucide-react";

const TextInput = forwardRef(
  (
    {
      type,
      label,
      requiredLabel,
      tooltipContent,
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    const inputPlaceholderClassName =
      "text-zinc-900 w-full h-full pl-4 rounded-[4px] border-0 text-[14px] font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300";

    if (type === "full-single-text-input") {
      return (
        <>
          <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
            <div className="text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]">
              {label}
              {requiredLabel ? "*" : ""}
            </div>

            <div className="self-stretch h-fit  border-collapse">
              <div className=" h-14  justify-center items-start ">
                <input
                  //TODO: Handle Change Logic
                  ref={ref}
                  required=""
                  className={inputPlaceholderClassName}
                  onChange={onChange}
                  {...props}
                ></input>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (type === "full-single-text-input-with-tooltip") {
      return (
        <div className="self-stretch w-full h-fit flex-col justify-start items-start flex">
          <div className="flex items-center gap-2 text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]">
            <span>
              {label}
              {requiredLabel ? "*" : ""}
            </span>

            {/* Tooltip */}
            <div className="relative group">
              <Info size={14} color="#000000" />
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#D9D9D9] text-black text-[12px] font-[500] px-3 h-[22px] rounded-[10px] whitespace-nowrap z-10 w-fit font-dmSans flex items-center">
                {tooltipContent}
              </div>
            </div>
          </div>

          <div className="self-stretch h-fit border-collapse">
            <div className="h-14 justify-center items-start">
              <input
                //TODO: Handle Change Logic
                ref={ref}
                required=""
                className={inputPlaceholderClassName}
                onChange={onChange}
                {...props}
              />
            </div>
          </div>
        </div>
      );
    }
  }
);

export default TextInput;
