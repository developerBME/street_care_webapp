import React from "react";
import { useRef, useEffect } from "react";
import arrowBack from "../images/arrowBack.png";

function PopUpModal({ children, onClose }) {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center"
      >
        {/* Back Button */}
        <div className="flex items-center w-full mb-4">
          <img
            src={arrowBack}
            alt="Back"
            className="w-6 h-6 cursor-pointer"
            onClick={onClose} // Clicking on the image closes the modal
          />
          <button
            onClick={onClose}
            className="ml-2 text-sm text-gray-700 font-medium hover:underline"
          >
            Go Back
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default PopUpModal;
