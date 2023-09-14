import React from "react";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";

function ImageBox() {
  return (
    <div className="flex">
      <div className="w-1/2 p-2 relative h-auto">
        <div className="rounded-tl-2xl rounded-tr-2xl overflow-hidden">
          <img src={pic1} alt="Image 1" className="w-full h-auto rounded-tl-2xl rounded-tr-2xl" />
        </div>
        <div className="bg-[#F2F6D8] rounded-bl-2xl rounded-br-2xl p-4 text-center ">
          <p className="text-base font-open-sans">NY Attorney General</p>
          <p className="text-lg font-bricolage mt-2">Letitia James</p>
        </div>
      </div>
      <div className="w-1/2 p-2 relative">
        <div className="rounded-tl-2xl rounded-tr-2xl overflow-hidden">
          <img src={pic2} alt="Image 2" className="w-full h-auto rounded-tl-2xl rounded-tr-2xl" />
        </div>
        <div className="bg-[#F2F6D8] rounded-bl-2xl rounded-br-2xl p-4 text-center"> 
          <p className="text-base font-open-sans">NYC Mayor</p>
          <p className="text-lg font-bricolage mt-2">Eric Adams</p>
        </div>
      </div>
    </div>
  );
}

export default ImageBox;





