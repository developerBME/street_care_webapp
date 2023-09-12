import React from "react";
import mapImage from "../images/map.png";

const Map = () => {
  return (
    <div className="mx-auto max-w-8xl px-6 lg:px-8 p-20 bg-gray-100 rounded-lg h-[750px]">
      <h1 className="text-xl font-bold text-gray-900 sm:text-2xl font-bricolage ">
        We are active across countries and contients
      </h1>
      <img src={mapImage} alt="map" className="w-[1500px] h-[550px] pt-8" />
    </div>
  );
};

export default Map;
