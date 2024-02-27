import React from "react";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function SrushtiSample() {
 const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center ">
      <div class=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <img
            src={streetcarelogo}
            alt="Logo"
            class="object-cover w-40 h-40 mb-8 rounded-full"
          />
          <h1 class="text-4xl font-bold mb-4">Sample Page</h1>
          <p class="text-lg mb-8 px-4 md:px-0">
            We're working hard to bring you something awesome. Stay tuned!
          </p>
        
        </div>
      </div>
    </div>
  );
}

export default SrushtiSample;