import React, { useEffect, useState } from "react";

import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import OutreachEventCard from "./OutreachEventCard";
import { fetchEventById} from "../EventCardService";
import { formatDate } from "./../HelperFunction";

const ConfirmationModal = ({
  isOpen,
  closeModal,
  currSupPow,
  refreshUserQuery,
  id,
  outreachEvents,
}) => {
  const [success, setSuccess] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = [];
      for (let eventId of outreachEvents) {
        const edata = await fetchEventById(eventId);
        eventsData.push(edata);
      }
      setEvents(eventsData);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  // This function is drilled to child component: Chips

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <div className="w-[350px] sm:w-[550px] md:w-[650px] lg:w-[800px] bg-[#F8F9F0] rounded-2xl p-14">
        <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
          <div className="self-stretch h-fit flex-col justify-start items-start gap-6 flex">
            <div className="justify-self-end items-start gap-20 sm:gap-6 inline-flex w-full">
              <div className="w-fit text-[#212121] text-4xl font-medium font-bricolage leading-[44px]">
                Make sure you are not going alone
              </div>
              {events.map((eventData) => (
                <OutreachEventCard
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))}
              {/* <div className="w-fit h-fit  bg-gray-300  justify-end ">
                <button className="text-6xl " onClick={closeModal}>
                  &times;
                </button>
              </div> */}
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
            {/* <CustomButton
              label="I will bring a friend"
              name="buttonborder"
              onClick={() => {
                navigate("/");
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
