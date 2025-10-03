import React, { useState } from "react";
import IconTextButton from "./IconTextButton/IconTextButton";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoIosAppstore } from "react-icons/io";
import { CiMobile4 } from "react-icons/ci";

const MobileAppRedirect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-bricolage relative">
      <button
        className="flex flex-col items-center border border-black bg-nav text-white rounded-xl px-4 py-4 shadow-sm hover:shadow-md hover:bg-[#504279] transition"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="flex">
          <IoLogoGooglePlaystore className="w-12 h-12 mb-2" />
          <IoIosAppstore className="w-12 h-12 mb-2" />
        </div>
        <div className="flex items-center">
          <CiMobile4 className="w-12 h-12" />
          <span>Get the App</span>
        </div>
      </button>

      {isModalOpen && (
        <div className="font-bricolage absolute bottom-20 right-20 bg-white border border-black rounded-xl pb-6 pl-6 pr-6 shadow-lg w-72">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-2 text-black text-2xl font-bold"
          >
            ×
          </button>

          <div className="space-y-4 mt-6">
            <IconTextButton
              title="For Android Users"
              iconName={IoLogoGooglePlaystore}
              primaryText="Get it on"
              secondaryText="Google Play"
              link="https://play.google.com/store/apps/details?id=com.app.bmeapplication1&pcampaignid=web_share"
            />
            <IconTextButton
              title="For IOS Users"
              iconName={IoIosAppstore}
              primaryText="Get it on"
              secondaryText="App Store"
              link="https://apps.apple.com/us/app/street-care-help-the-homeless/id1553805037"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppRedirect;
