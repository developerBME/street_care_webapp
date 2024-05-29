import React, { useState, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { fetchEventById, formatDate } from "../EventCardService";
import OutreachEventCard from "./OutreachEventCard";
import { fetchOutreaches } from "../HelpRequestService";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import defaultImage from "../../images/default_avatar.svg";
import verifiedImg from "../../images/verified_purple.png";
import userSlots from "../../images/userSlots.png";
import HelpRequestOutreachCard from "./HelpRequestOutreachCard";

const ICanHelpConfirmationModal = ({ id }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchOutreaches(id);
        // setData(result);
        setEvents(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    console.log(`Outreaches related to Help Request ID ${id} are ${data}`);
    getData(); // Invoke the async function
  }, []);

  useEffect(() => {
    setEventsDisplay(events);
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

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
      {/* <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-[#F8F9F0] rounded-2xl p-14"> */}
      <div className="w-[70%] bg-[#F8F9F0] rounded-2xl p-14 lg:max-w-[900px] xl:max-w-[1200px]">
        <div className="w-fit h-fit flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
            <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
              <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                Make sure you are not going alone
              </div>
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
          {/* <>
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
          </> */}
          {/* <>
            <div className="bg-[#F5EEFE] min-w-full md:min-w-[320px] max-w-[320px] lg:w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
              <div className="inline-flex items-center space-x-2 ">
                <img src={defaultImage} className="w-8 h-8 rounded-full" />
                <div className="font-normal font-inter text-[13px] ">
                  Username
                </div>
                <img src={verifiedImg} className="w-5 h-5" />
              </div>
              <div className="my-3 space-y-3 w-full h-full flex flex-col">
                <div className="flex flex-col justify-between space-y-3">
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                    <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                      18 May, 2024
                    </div>
                  </div>
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
                    <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                      San Jose, CA
                    </div>
                  </div>
                </div>

                <div className="font-medium text-[20px] font-dmsans">
                  Sample Title
                </div>

                <div className="font-medium text-[14px] font-dmsans text-[#444746]">
                  Sample Description
                </div>

                <div className="inline-flex items-center gap-2 flex-wrap">
                  {skills.map((item, index) => (
                  <div
                    className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <img className="w-[20px] h-[14px] my-1" src={userSlots}></img>
                <div className="font-normal font-dmsans text-[14px]">0/10</div>
              </div>
              <div class="group relative mt-2">
                <CustomButton
                  label="Join"
                  name="buttonlight"
                  onClick={() => {
                    navigate(`/`);
                  }}
                />
              </div>
            </div>
          </> */}
          {/* <div className="w-full h-fit grid grid-cols-1 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 pt-9 gap-5">
            <HelpRequestOutreachCard data={data} />
            <HelpRequestOutreachCard data={data} />
            <HelpRequestOutreachCard data={data} />
            <HelpRequestOutreachCard data={data} />
            <HelpRequestOutreachCard data={data} />
            <HelpRequestOutreachCard data={data} />
          </div> */}

          <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            {eventsDisplay.length > 0 &&
              eventsDisplay.map((eventData) => (
                <HelpRequestOutreachCard
                  key={eventData.id}
                  data={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICanHelpConfirmationModal;
