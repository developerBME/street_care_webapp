import React from "react";
import CustomButton from "../Buttons/CustomButton";


const DeleteModal = ({
  handleClose,
  handleDelete,
  modalMsg
}) => {
  const DeleteClick = (event) => {
    event.stopPropagation();
    handleDelete();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white p-5 rounded-lg relative max-w-lg w-full">
        <div className="flex w-6 h-6 m-auto">
          <button
            className="text-4xl absolute top-0 right-1 text-gray-700 hover:text-gray-900"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <h3 className="pb-4">
          {modalMsg}
        </h3>
        <div className="flex gap-x-2">
          <CustomButton
            name="deleteButton"
            label="Delete"
            onClick={DeleteClick}
          />
          <CustomButton name="buttonborder" label="Cancel" onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
