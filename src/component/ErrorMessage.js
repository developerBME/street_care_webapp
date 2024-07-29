import React from "react";
import { BiSolidError } from "react-icons/bi";

const ErrorMessage = ({ displayName }) => {
  return <div className="flex flex-col justify-between items-center bg-[#F6F3FF] rounded-[30px] gap-[12px] md:gap-[20px] px-4 md:px-12 pt-6 pb-10 md:py-16">
    <BiSolidError className="size-6 md:size-12 text-[#CF003E]" />
    <div className="text-base md:text-3xl font-medium text-[#565656]">Please refresh the page or try again later</div>
    <div className="hidden md:block text-base font-normal text-[#565656]">We are not able to load {`\`<${displayName}>\``} at this time.</div>
    <div className="flex flex-col items-center md:hidden text-sm font-normal text-[#565656]">
        <div>We are not able to load</div>
        <div>{`\`<${displayName}>\``} at this time.</div>
    </div>
  </div>;
};

export default ErrorMessage;
