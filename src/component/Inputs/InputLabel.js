import React from "react";

export default function InputLabel({
  label,
  children,
  fontWeight = "[500]",
  fontSize = "[14px]",
  textColor = "zinc-700",
  className = "",
}) {
  return (
    <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
      <div
        className={
          className
            ? className
            : `text-${textColor} text-${fontSize} font-${fontWeight} leading-[20px] tracking-[0%] font-dm-sans mb-[9px]`
        }
      >
        {label}
      </div>
      {children}
    </div>
  );
}
