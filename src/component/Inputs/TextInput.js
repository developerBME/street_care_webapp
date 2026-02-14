import { useEffect, useState, UseRef, forwardRef } from "react";

const TextInput = forwardRef(
  ({ type, label, requiredLabel, onChange = () => {}, ...props }, ref) => {
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
  }
);

export default TextInput;
