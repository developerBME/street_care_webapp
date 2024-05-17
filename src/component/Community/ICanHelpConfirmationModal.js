import React from "react";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { fetchEventById, formatDate } from "../EventCardService";
import OutreachEventCard from "./OutreachEventCard";

const ICanHelpConfirmationModal = ({ id }) => {
  const navigate = useNavigate();

  return (
    // <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
    //   <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-[#F8F9F0] rounded-2xl p-14">
    //     <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
    //       <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
    //         <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
    //           <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
    //             Help Request published in the Community!
    //           </div>
    //         </div>
    //         <div className="self-stretch text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal"></div>
    //       </div>
    //       <div className="w-fit justify-start items-start gap-4 inline-flex">
    //         <CustomButton
    //           label="All Help Requests"
    //           name="buttondefault"
    //           onClick={() => {
    //             navigate("/allHelpRequests");
    //           }}
    //         />
    //         <CustomButton
    //           label="Back to my Profile"
    //           name="buttonborder"
    //           onClick={() => {
    //             navigate("/profile");
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-[#F8F9F0] rounded-2xl p-14">
        <div className="w-fit h-fit flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
            <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
              <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                Make sure you are not going alone
              </div>
              {/* {events.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))} */}
            </div>
            <div className="self-stretch text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal">
              Group presence offers security and effectiveness in engaging with
              unfamiliar situations and individuals, benefiting both volunteers
              and the homeless. <br /> How outreach on Street Care works? <br />{" "}
              We post the outreach for you and other volunteers can sign up to
              go with you.
            </div>
          </div>
          <div className="w-fit justify-start items-start gap-4 inline-flex">
            <CustomButton
              label="Create an Outreach"
              name="buttondefault"
              onClick={() => {
                navigate(`/createOutreach/${id}`);
              }}
            />
          </div>
          <>
            <div className="p-4 sm:p-4 lg:p-8 gap-8 bg-white border-y border-[#C8C8C8] sm:justify-end">
              <div className=" md:grid md:grid-cols-3 md:gap-4">
                <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[5px] inline-flex col-span-2 md:mb-0 mb-4">
                  <div className="self-stretch text-[#273164] text-[24px] font-medium font-bricolage leading-9">
                    Outreach Name
                  </div>
                  <div className="self-stretch text-[#616161] text-[12px] font-normal font-dmsans leading-normal">
                    Location:
                    <br />
                    How to find:
                  </div>
                </div>
                <div className="col-span-1 h-fit">
                  <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right">
                    I can help
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-4 lg:p-8 gap-8 bg-white border-y border-[#C8C8C8] sm:justify-end">
              <div className=" md:grid md:grid-cols-3 md:gap-4">
                <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[5px] inline-flex col-span-2 md:mb-0 mb-4">
                  <div className="self-stretch text-[#273164] text-[24px] font-medium font-bricolage leading-9">
                    Outreach Name
                  </div>
                  <div className="self-stretch text-[#616161] text-[12px] font-normal font-dmsans leading-normal">
                    Location:
                    <br />
                    How to find:
                  </div>
                </div>
                <div className="col-span-1 h-fit">
                  <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right">
                    I can help
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-4 lg:p-8 gap-8 bg-white border-y border-[#C8C8C8] sm:justify-end">
              <div className=" md:grid md:grid-cols-3 md:gap-4">
                <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[5px] inline-flex col-span-2 md:mb-0 mb-4">
                  <div className="self-stretch text-[#273164] text-[24px] font-medium font-bricolage leading-9">
                    Outreach Name
                  </div>
                  <div className="self-stretch text-[#616161] text-[12px] font-normal font-dmsans leading-normal">
                    Location:
                    <br />
                    How to find:
                  </div>
                </div>
                <div className="col-span-1 h-fit">
                  <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right">
                    I can help
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-4 lg:p-8 gap-8 bg-white border-y border-[#C8C8C8] sm:justify-end">
              <div className=" md:grid md:grid-cols-3 md:gap-4">
                <div className="w-full md:w-fit h-fit flex-col justify-start items-start gap-[5px] inline-flex col-span-2 md:mb-0 mb-4">
                  <div className="self-stretch text-[#273164] text-[24px] font-medium font-bricolage leading-9">
                    Outreach Name
                  </div>
                  <div className="self-stretch text-[#616161] text-[12px] font-normal font-dmsans leading-normal">
                    Location:
                    <br />
                    How to find:
                  </div>
                </div>
                <div className="col-span-1 h-fit">
                  <button className="w-fit bg-[#E6DCFF] hover:bg-[#6840E0] text-[#181818] hover:text-white rounded-[100px] flex-col justify-start gap-2 flex px-4 py-2 md:px-6 md:py-2.5 text-center text-[12px] font-semibold font-inter leading-tight md:float-right">
                    I can help
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ICanHelpConfirmationModal;
