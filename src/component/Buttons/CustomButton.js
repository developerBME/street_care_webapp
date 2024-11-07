import React from "react";

function CustomButton({ label, name, onClick, icon, disable, type, textColor }) {
  if (name === "buttonborder") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonbordericon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] pl-[16px] pr-[24px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon4") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] px-[10px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttondefault") {
    return (
      <button
        onClick={onClick}
        className={` text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttondefaultlong") {
    return (
      <button
        onClick={onClick}
        className={`w-full text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttondefaulticon") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 items-center text-[14px] font-medium py-[10px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon1") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 items-center text-[14px] font-medium py-[10px] px-[10px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonlight") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonlighticon") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-[#d7ccec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon2") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] px-[10px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-[#d7ccec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonblue") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonblueicon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon3") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] px-[10px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonsmall") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[5px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#36295E]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallicon") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[5px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#36295E]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon5") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[5px] px-[5px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#36295E]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonsmallight") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[5px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallighticon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon6") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[5px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonsmallblue") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[5px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallblue2") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[7px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallblueicon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] pl-[16px] pr-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon7") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[5px] px-[5px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonmediumlight") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] border-slate-950 rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-black bg-[#f1f3f2]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallborder") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[5px] px-[24px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? `text-[${textColor ? textColor : "#1F0A58"}] border-[#C8C8C8] hover:bg-violet-200`
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallbordericon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[24px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon8") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[5px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonicon8small") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[5px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-4 h-4 text-[#7f56f1]" />
      </button>
    );
  } else if (name === "buttonlightsmall") {
    return (
      <button
        onClick={onClick}
        className={`text-[11px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonsmallborder2") {
    return (
      <button
        onClick={onClick}
        className={`text-[11px] font-medium py-[10px] px-[24px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] bg-white hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonlg") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[20px] px-[36px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonlgicon") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 items-center text-[14px] font-medium py-[20px] pl-[26px] pr-[36px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon9") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 items-center text-[14px] font-medium py-[20px] px-[20px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonlgblue") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[20px] px-[26px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonlgblueicon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[20px] pl-[26px] pr-[36px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon10") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 items-center text-white text-[14px] font-medium py-[20px] px-[20px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-[#79EAFF] hover:bg-[#75daec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonlglight") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[20px] px-[26px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-violet-300"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonlglighticon") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[20px] pl-[26px] pr-[36px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-[#d7ccec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon11") {
    return (
      <button
        onClick={onClick}
        className={`w-fit inline-flex gap-2 text-[14px] font-medium py-[20px] px-[20px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#181818] bg-violet-200 hover:bg-[#d7ccec]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttonlgborder") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[20px] px-[26px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonbordericon") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] w-fit inline-flex gap-2 font-medium py-[20px] pl-[26px] pr-[36px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name === "buttonicon12") {
    return (
      <button
        onClick={onClick}
        className={` text-[14px] w-fit inline-flex gap-2 font-medium py-[20px] px-[20px] border-[1px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-[#1F0A58] border-[#C8C8C8] hover:bg-violet-200"
            : "text-[#bfbfbf] border[#d8d8d8] cursor-not-allowed hover:bg-white"
        }`}
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name === "buttondefaultwide") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={` text-[16px] font-medium w-full py-[10px] px-[24px] rounded-full transition ease-in-out ${
          disable !== "true"
            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttondInprogressWide") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={` text-[16px] font-medium w-full py-[10px] px-[24px] rounded-full transition ease-in-out ${
          disable !== "true"
            ? "text-[#181818] bg-[#FFD100] hover:bg-[#F5BF34]"
            : "text-[#181818] bg-[#FFD100] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "buttonClosedWide") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={` text-[16px] font-medium w-full py-[10px] px-[24px] rounded-full transition ease-in-out border border-[#565656] ${
          disable !== "true"
            ? "text-[#181818] bg-white hover:bg-gray-100"
            : "text-[#181818] bg-white cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "deleteButton") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-[#CF003E] hover:bg-[#cf003ec7]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  } else if (name === "editButton") {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 inline-flex ${
          disable !== "true"
            ? "text-[#181818] bg-[#E6DCFF] hover:bg-[#c4b6e7]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {icon && (<img src={icon} className="w-5 h-5 " />)}
        {label}
      </button>
    );
  } else if(name==="close"){
    return (
      <button
        onClick={onClick}
        className={`bg-[#000]] border border-[#C8C8C8] text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 inline-flex ${
          disable !== "true"
            ? "text-[#1F0A58] border border-[#6840E0] hover:bg-[#c4b6e7]"
            : " text-[#1F0A58] border border-[#6840E0] cursor-not-allowed"
        }`}
      >
        {icon && (<img src={icon} className="w-5 h-5 " />)}
        {label}
      </button>
    );
  }else {
    return (
      <button
        onClick={onClick}
        className={`text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
          disable !== "true"
            ? "text-white bg-violet-700 hover:bg-[#36295E]"
            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
        }`}
      >
        {label}
      </button>
    );
  }
}

export default CustomButton;
