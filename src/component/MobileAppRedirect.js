import React, { useState } from "react";
import MobileAppRedirectButton from "./MobileAppRedirectButton/MobileAppRedirectButton";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa6";
import { CiMobile3 } from "react-icons/ci";

const MobileAppRedirect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex flex-col items-center border border-black bg-nav text-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-[#504279] transition"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <CiMobile3 className="w-12 h-12 mb-2" />
        <span className="text-base font-semibold">Get the App</span>
      </button>

      {isModalOpen && (
        <div className="absolute bottom-20 right-20 bg-white border border-black rounded-xl p-6 shadow-lg w-72">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-3 text-black text-2xl font-bold"
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
              iconName={FaApple}
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
