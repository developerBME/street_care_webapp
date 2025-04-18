import React from "react";

const MobileAppRedirectButton = ({ title, iconName: Icon, osName, link }) => {
  return (
    <div className="w-full">
      <span className="text-sm font-semibold text-gray-800">{title}</span>

      <button
        onClick={() => window.open(link)}
        className="flex items-center gap-3 w-full rounded-md px-2 py-1 border border-black bg-nav text-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-[#504279] transition"
      >
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          {Icon && <Icon className="text-black w-6 h-6" />}
        </div>

        <div className="flex flex-col items-start">
          <span >Get it on</span>
          <span className="font-bold">{osName}</span>
        </div>
      </button>
    </div>
  );
};

export default MobileAppRedirectButton;
