import { useState, useEffect, useRef } from "react";
//If name is other it provides a checkBox which on selection provides additional text input to support
// provide it with checkboxes ref
//name of the option
//provide Fn to handleChange
// provide with index of the option
const Checkbox = ({
  name,
  callbackFn,
  groupkey,
  SetIsOtherChecked,
  interaction,
}) => {
  if (name !== "Other / Add Your Own") {
    return (
      <>
        <div className=" justify-end items-end inline-flex ">
          <input
            type="checkbox"
            id={`${interaction}-${groupkey}-${name}`}
            value={`${name}`}
            className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
            required=""
            onClick={(e) => {
              callbackFn(e);
            }}
          ></input>
          <label
            htmlFor={`${interaction}-${groupkey}-${name}`}
            className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer peer-checked:border-[#5F36D6] peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
          >
            <div className="w-full h-full mb-6 text-base font-semibold">
              {" "}
              {`${name}`}
            </div>
          </label>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" justify-end items-end inline-flex ">
          <input
            type="checkbox"
            id={`${interaction}-${groupkey}-${name}`}
            value={`${name}`}
            className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
            required=""
            onClick={(e) => {
              callbackFn(e);
              SetIsOtherChecked((prev) => !prev);
            }}
          ></input>
          <label
            htmlFor={`${interaction}-${groupkey}-${name}`}
            className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer peer-checked:border-[#5F36D6] peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
          >
            <div className="w-full h-full mb-6 text-base font-semibold">
              {" "}
              {`${name}`}
            </div>
          </label>
        </div>
      </>
    );
  }
};

export default Checkbox;
