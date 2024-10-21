import React, { useState } from "react";
import add2 from "../../images/add2.png";
import close from "../../images/close.png";

const ChipSuperpower = (props) => {
  const [isActive, setIsActive] = useState(props.checked);
  const handleAddClick = () => {
    props.setter(props.val, !isActive);
    setIsActive(!isActive);
  };
  return (
    // <div
    //   className={`inline-flex cursor-pointer items-center gap-1 bg-white border border-[#CACACA] rounded-xl px-3 py-1 mr-1 font-semibold ${
    //     isActive ? "bg-purple-100 border border-[#5F36D6] text-[#5F36D6]" : ""
    //   }`}
    // >
    //   <div
    //     className={`flex items-center justify-center h-6 w-fit text-[#616161] cursor-pointer ${
    //       isActive ? "text-[#5F36D6]" : ""
    //     }`}
    //     onClick={handleAddClick}
    //   >
    //     {props.val}
    //     <div className="flex p-2">
    //       {isActive ? (
    //         <img src={close} className={`w-6 h-6`} />
    //       ) : (
    //         <img src={add2} className="w-6 h-6" />
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div
      onClick={handleAddClick}
      className={`inline-flex cursor-pointer items-center gap-1 rounded-xl px-3 py-1 mr-1 
      ${
        isActive
          ? "bg-purple-100 border border-[#5F36D6] text-[#5F36D6]"
          : " bg-white border border-[#CACACA]"
      }`}
    >
      <div
        className={`text-sm font-semibold font-opensans ${
          isActive ? "text-[#5F36D6]" : "text-[#616161]"
        }`}
      >
        <input
          type="checkbox"
          id={props.val}
          value=""
          className="hidden"
          required=""
          checked={isActive}
        ></input>
        {props.val}
      </div>

      {isActive ? (
        <img src={close} className={`w-6 h-6`} />
      ) : (
        <img src={add2} className="w-6 h-6" />
      )}
    </div>
  );
};

export default ChipSuperpower;
