import React from "react";
import { handleRsvp } from "../EventCardService";

const EditModal = ({
  handleClose,
  id,
  label,
  navigate,
  label2,
  setLabel2,
  refresh,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white p-6 rounded-lg relative">
        <button
          className="absolute top-0 right-1 text-gray-700 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
        <h3 className="py-4">
          {`Are you sure that you don't want to attend the event?`}
        </h3>
        <div className="flex gap-x-2">
          <a
            href="#"
            className="flex-2 px-8 py-2 rounded-2xl flex-col justify-center items-start flex bg-violet-200 text-black hover:bg-[#37168B] hover:text-white w-1/4"
            onClick={(e) =>
              handleRsvp(
                e,
                id,
                label,
                navigate,
                label2,
                setLabel2,
                false,
                refresh
              )
            }
          >
            {/* <h3 className="">Yes</h3> */}
            Yes
          </a>
          <a
            href="#"
            className="flex-2 px-9 py-2 rounded-2xl flex-col justify-center items-start flex bg-violet-200 text-black hover:bg-[#37168B] hover:text-white w-1/4"
            onClick={handleClose}
          >
            No
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
