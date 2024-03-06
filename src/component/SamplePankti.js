import React from "react";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function PanktiSample() {
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
          <h1 class="text-4xl font-bold mb-4">What is Street Care?</h1>
          <p class="text-lg mb-8 px-4 md:px-0">
          Street Care - a platform — built by homelessness and wellness experts — is full of clear, simple tutorials and guidance.
          </p>

          <p class="text-lg mb-8 px-4 md:px-0">
          Street Care is an initiative of Bright Mind, a 501(c)(3) nonprofit organization. We are a wellness-based education organization working to foster well-being, tenacity, curiosity, and creativity through community education. Utilizing tech for good, we create programs to help as many people as possible.
          </p>

        </div>
      </div>
    </div>
  );
}

export default PanktiSample;