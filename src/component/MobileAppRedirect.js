import React, { useState } from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiAppstore } from "@icons-pack/react-simple-icons";

const MobileAppRedirect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-bricolage relative">
      <button
        className="w-[60px] h-[60px] flex flex-col items-center bg-nav text-white rounded-xl px-2 py-2 shadow-md shadow-gray-600 hover:shadow-lg hover:bg-[#504279] transition md:w-auto md:h-auto md:px-3 md:pt-1 md:pb-3"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="relative block md:hidden w-20 h-20">
          <img
            src="/stash-smartphone-light.png"
            alt="Smart-Phone Logo"
            className="absolute inset-0 m-auto w-6 h-12 z-10"
          />
          <img
            src="/Vector.png"
            alt="Download-Vector"
            className="absolute inset-0 m-auto w-4 h-4 z-20"
          />
        </div>

        <span className="mb-1 text-lg font-medium hidden md:inline">
          Get the App
        </span>

        <div className="hidden md:flex items-center gap-6">
          <img
            src="/stash-smartphone-light.png"
            alt="Smart-Phone Logo"
            className="w-10 h-20"
          />

          <div className="flex flex-col gap-3">
            <SiAppstore className="w-8 h-8" title="App Store" />
            <IoLogoGooglePlaystore className="w-8 h-8" />
          </div>
        </div>
      </button>

      {isModalOpen && (
        <div className="font-bricolage absolute bottom-10 md:bottom-16 right-10 md:right-20 bg-white rounded-xl py-5 px-3 shadow-md shadow-gray-600 w-55">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-1 top-1 w-3 h-3 flex items-center justify-center text-white text-sm bg-black rounded-full hover:text-lightgray-600"
          >
            ×
          </button>

          <div className="space-y-5">
            {/* Android Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.app.bmeapplication1&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#3B2A5C] text-white rounded-lg px-3 py-2 hover:bg-[#4A3470] transition-colors w-40 shadow-md shadow-gray-500"
            >
              <div className="w-24 flex justify-center">
                <span className="font-medium">Android</span>
              </div>
              <IoLogoGooglePlaystore className="w-7 h-7" />
            </a>

            {/* iOS Button */}
            <a
              href="https://apps.apple.com/us/app/street-care-help-the-homeless/id1553805037"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#3B2A5C] text-white rounded-lg px-3 py-2 hover:bg-[#4A3470] transition-colors w-40 shadow-md shadow-gray-500"
            >
              <div className="w-24 flex justify-center">
                <span className="font-medium">iOS</span>
              </div>
              <SiAppstore className="w-7 h-7" title="App Store" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppRedirect;
