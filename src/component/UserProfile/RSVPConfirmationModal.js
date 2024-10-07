import React from "react";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CustomButton from "../Buttons/CustomButton";
import arrowBack from "../../images/arrowBack.png";

const RSVPConfirmationModal = ({closeModal, type='edit'}) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 bg-[#F8F9F0] rounded-2xl p-14">
        <div className="w-full h-fit flex-col justify-start items-start gap-12 inline-flex">
          <div className="self-stretch h-fit flex-col gap-6 flex justify-center items-center w-full">
            <div
              className="secondary-bg-color rounded-container flex justify-center items-center"
              style={{ width: '231px', height: '231px' }}>
              <div className="primary-bg-color rounded-container">
                <DoneOutlinedIcon sx={{ fontSize: 85 }} style={{ color: '#fff' }}/>
              </div>
            </div>
            {type === "edit" ? (
              <div className="justify-self-end items-start gap-20 sm:gap-6 w-full flex justify-center items-center flex-col">
                <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                  You have successfully signed up for the event!
                </div>
                <div className="text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal">
                  Thank you for joining us!
                </div>
              </div>
              ) : (
                <div className="justify-self-end items-start gap-20 sm:gap-6 w-full flex justify-center items-center flex-col">
                  <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                    You have successfully withdrawn up for the event!
                  </div>
                </div>
              )}
          </div>
          <div className="w-full justify-center items-center gap-4 inline-flex">
            <CustomButton
              label="Go back"
              name="editButton"
              onClick={closeModal}
              icon={arrowBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPConfirmationModal;
