import React from "react";
import mapImage from "../images/map.png";

const Map = () => {
  return (
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
        We are active across countries and continents
      </p>
      <img src={mapImage} alt="map" className="w-full h-[550px] pt-8" />
    </div>
  );
};

export default Map;
