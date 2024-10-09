import React, { useState, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { fetchEventById} from "../EventCardService";
import OutreachEventCard from "./OutreachEventCard";
import { fetchOutreaches } from "../HelpRequestService";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import defaultImage from "../../images/default_avatar.svg";
import verifiedImg from "../../images/verified_purple.png";
import userSlots from "../../images/userSlots.png";
import HelpRequestOutreachCard from "./HelpRequestOutreachCard";
import { formatDate } from "./../HelperFunction";

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
    // Old (Committed)
    // <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50 overflow-scroll">
    //   <div className="w-[70%] bg-[#F8F9F0] rounded-2xl p-14 lg:max-w-[900px] xl:max-w-[1200px]">
    //     <div className="w-fit h-fit flex-col justify-start items-start gap-8 inline-flex">
    //       <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
    //         <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
    //           <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
    //             Make sure you are not going alone
    //           </div>
    //         </div>
    //         <div className="self-stretch text-[#616161] text-lg font-semibold font-['Open Sans'] leading-normal">
    //           Group presence offers security and effectiveness in engaging with
    //           unfamiliar situations and individuals, benefiting both volunteers
    //           and the homeless. <br /> How outreach on Street Care works? <br />{" "}
    //           We post the outreach for you and other volunteers can sign up to
    //           go with you.
    //         </div>
    //       </div>
    //       <div className="w-fit justify-start items-start gap-4 inline-flex">
    //         <CustomButton
    //           label="Create an Outreach"
    //           name="buttondefault"
    //           onClick={() => {
    //             navigate(`/createOutreach/${id}`);
    //           }}
    //         />
    //       </div>
    //       <div className="w-full h-fit grid grid-cols-1 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 pt-9 gap-5">
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //         <HelpRequestOutreachCard data={data} />
    //       </div>

    //       <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
    // {eventsDisplay.length > 0 &&
    //   eventsDisplay.map((eventData) => (
    //     <HelpRequestOutreachCard
    //       key={eventData.id}
    //       data={{
    //         ...eventData,
    //         eventDate: formatDate(
    //           new Date(eventData.eventDate.seconds * 1000)
    //         ),
    //       }}
    //     />
    //   ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // New
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50 overflow-hidden">
      <div className="bg-white w-[90%] max-h-[90vh] overflow-y-auto p-8 rounded shadow-lg">
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
            We post the outreach for you and other volunteers can sign up to go
            with you.
          </div>
        </div>
        <div className="w-fit justify-start items-start gap-4 inline-flex mt-2">
          <CustomButton
            label="Create an Outreach"
            name="buttondefault"
            onClick={() => {
              navigate(`/createOutreach/${id}`);
            }}
          />
        </div>
        {/* <div className="max-h-[100vh] overflow-y-auto">
          <div className="w-full h-fit grid grid-cols-1 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 pt-9 gap-5">
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
        </div> */}

        <div className="max-h-[100vh] overflow-y-auto">
          <div className="w-full h-fit grid grid-cols-1 overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 pt-9 gap-5">
            {eventsDisplay.length > 0 &&
              eventsDisplay.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    label: "View Details",
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
