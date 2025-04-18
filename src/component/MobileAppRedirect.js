import React, { useState } from "react";
import MobileAppRedirectButton from "./MobileAppRedirectButton/MobileAppRedirectButton";
import { IoLogoAppleAppstore, IoLogoGooglePlaystore } from "react-icons/io5";
import { IoIosAppstore } from "react-icons/io";

const MobileAppRedirect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex flex-col items-center border border-black bg-nav text-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-[#504279] transition"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="flex">
            <IoLogoGooglePlaystore className="w-12 h-12 mb-2" />
            <IoIosAppstore className="w-12 h-12 mb-2" />
        </div>
        <span className="text-base font-semibold">Get the App</span>
      </button>

      {isModalOpen && (
        <div className="absolute bottom-20 right-20 bg-white border border-black rounded-xl pb-6 pl-6 pr-6 shadow-lg w-72">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-2 text-black text-2xl font-bold"
          >
            ×
          </button>

          <div className="space-y-4 mt-6">
            <MobileAppRedirectButton
              title="For Android Users"
              iconName={IoLogoGooglePlaystore}
              osName="Google Play"
              link="https://play.google.com/store/apps/details?id=com.app.bmeapplication1&pcampaignid=web_share"
            />
            <MobileAppRedirectButton
              title="For IOS Users"
              iconName={IoLogoAppleAppstore}
              osName="App Store"
              link="https://apps.apple.com/us/app/street-care-help-the-homeless/id1553805037"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppRedirect;
