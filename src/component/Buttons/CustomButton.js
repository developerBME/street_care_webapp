import React from "react";

function CustomButton({ label, name, onClick, icon }) {
  if (name == "buttonborder") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] font-medium py-[10px] px-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonbordericon") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] pl-[16px] pr-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon4") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] px-[10px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttondefault") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] text-white text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-[#504279] transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttondefaulticon") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] w-fit inline-flex gap-2 items-center text-white text-[14px] font-medium py-[10px] pl-[16px] pr-[24px] rounded-full hover:bg-[#504279] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon1") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] w-fit inline-flex gap-2 items-center text-white text-[14px] font-medium py-[10px] px-[10px] rounded-full hover:bg-[#504279] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonlight") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonlighticon") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] pl-[16px] pr-[24px] rounded-full hover:bg-[#d7ccec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon2") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] px-[10px] rounded-full hover:bg-[#d7ccec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonblue") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonblueicon") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] text-[14px] w-fit inline-flex gap-2 font-medium py-[10px] pl-[16px] pr-[24px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon3") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] w-fit inline-flex gap-2 text-[14px] font-medium py-[10px] px-[10px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonsmall") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] text-white text-[14px] font-medium py-[5px] px-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonsmallicon") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] text-white w-fit inline-flex gap-2 text-[14px] font-medium py-[5px] pl-[16px] pr-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon5") {
    return (
      <button
        onClick={onClick}
        className="bg-[#6840E0] text-white text-[14px] font-medium py-[5px] px-[5px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonsmallight") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] text-[14px] font-medium py-[5px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonsmallighticon") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] pl-[16px] pr-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon6") {
    return (
      <button
        onClick={onClick}
        className="bg-violet-200 text-[#181818] text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[5px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonsmallblue") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] text-[14px] font-medium py-[5px] px-[24px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonsmallblueicon") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] pl-[16px] pr-[24px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon7") {
    return (
      <button
        onClick={onClick}
        className="bg-[#79EAFF] text-[#181818] w-fit inline-flex gap-2 text-[14px] font-medium py-[5px] px-[5px] rounded-full hover:bg-[#75daec] transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else if (name == "buttonmediumlight") {
    return (
      <button
        onClick={onClick}
        className="bg-[#f1f3f2] text-black text-[14px] font-medium py-[10px] px-[24px] border-slate-950 rounded-full transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonsmallborder") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] font-medium py-[5px] px-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  } else if (name == "buttonsmallbordericon") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[24px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
        {label}
      </button>
    );
  } else if (name == "buttonicon8") {
    return (
      <button
        onClick={onClick}
        className="text-[#1F0A58] text-[14px] w-fit inline-flex gap-2 font-medium py-[5px] px-[5px] border-[1px] border-[#C8C8C8] rounded-full hover:bg-violet-200 transition ease-in-out delay-300"
      >
        <img src={icon} className="w-5 h-5 " />
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="bg-violet-700 text-white text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-[#36295E] transition ease-in-out delay-300"
      >
        {label}
      </button>
    );
  }
}

export default CustomButton;
