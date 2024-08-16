import React from "react";
import { handleRsvp } from "../EventCardService";
import CustomButton from "../Buttons/CustomButton";

const EditModal = ({
  handleClose,
  id,
  label,
  navigate,
  label2,
  setLabel2,
  refresh,
  title,
  eventDate,
  location,
  onEventWithdraw,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white p-5 rounded-lg relative max-w-lg w-full">
        {/* <button
          className="absolute top-0 right-1 text-gray-700 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button> */}
        <div className="flex w-6 h-6 m-auto">
          <button
            className="text-4xl absolute top-0 right-1 text-gray-700 hover:text-gray-900"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <h3 className="pb-4">
          {`Do you want to remove the `} <b>{`${title}`}</b> {` event in `}
          <b>{`${location.city}`}</b>
          {`,`} <b>{`${location.state}`}</b> {`at`} <b>{`${eventDate}`}</b>
          {` from your profile?`}
        </h3>
        <div className="flex gap-x-2">
          <CustomButton
            name="buttonlight"
            label="Yes"
            onClick={(e) => {
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
              if (onEventWithdraw) {
                onEventWithdraw();
              }
            }}
          >
            <p className="text-center mx-auto">Yes</p>
            {/* Yes */}
          </CustomButton>
          <CustomButton name="buttonlight" label="No" onClick={handleClose}>
            <p className="text-center mx-auto">No</p>
            {/* No */}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
