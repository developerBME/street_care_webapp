import React from "react";

const IconTextButton = ({ title, iconName: Icon, primaryText, secondaryText, link }) => {
  return (
    <div className="w-full">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      <button
        onClick={() => window.open(link)}
        className="flex items-center gap-3 w-full rounded-md px-2 py-1 border border-black bg-nav text-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-[#504279] transition"
      >
        {Icon && <Icon className="w-12 h-12" />}

        <div className="flex flex-col items-start">
          {primaryText ? <span>{primaryText}</span> : null}
          {secondaryText ? <span className="font-bold">{secondaryText}</span> : null}
        </div>
      </button>
    </div>
  );
};

export default IconTextButton;
