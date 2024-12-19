import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
// import add from "../../images/add.png";
import UserInfo from "./UserInfo";
import { Modal } from "@mui/material";
import OutreachSignupModal from "../Community/OutreachSignupModal";
import RSVPConfirmationModal from "./RSVPConfirmationModal";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import {
	fetchUserOutreaches,
	fetchUserSignedUpOutreaches,
} from '../EventCardService';
import { auth } from '../firebase';
import CustomButton from '../Buttons/CustomButton';

// import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import OutreachVisitLogProfile from "../Community/OutreachVisitLogProfile";
// import NoOutreachDoc from "../Community/NoOutreachDoc";

import NoDisplayData from './NoDisplayData';
import SignedUpOutreaches from './SignedUpOutreaches';
import CreatedOutreaches from './CreatedOutreaches';
import CreatedHelpRequests from './CreatedHelpRequests';
import ErrorMessage from '../ErrorMessage';
import { formatDate } from './../HelperFunction';


function Profile() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [signedUpEvents, setSignedUpEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventsDisplay, setEventsDisplay] = useState([]);
  const [isError, setIsError] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showWithdrawnModal, setShowWithdrawnModal] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // const visitLogsData = await fetchPersonalVisitLogs(
      //   auth?.currentUser?.uid
      // );
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        console.log("UID is ", uid);
        const createdEventsData = await fetchUserOutreaches(uid);
        createdEventsData.sort((a, b) => a.eventDate - b.eventDate);
        const signedUpEventsData = await fetchUserSignedUpOutreaches(uid);
        signedUpEventsData.sort((a, b) => a.eventData - b.eventData);

        console.log("Signed Up Events Data:", signedUpEventsData);

        setCreatedEvents(createdEventsData);
        setSignedUpEvents(signedUpEventsData);
      } else {
        console.log("No user is signed in.");
        // setCreatedEvents([]);
        // setSignedUpEvents([]);
      }
    } catch (error) {
      console.error("Error Fetching data:", error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (event) => {
    console.log("calledddddddddd");
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const onSignUp = () => {
    setSelectedEvent(null);
    setShowSignUpModal(true);
    setIsLoading(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
    setTriggerEffect((prev) => !prev);
  };

  const onEventWithdraw = () => {
    setSelectedEvent(null);
    setShowWithdrawnModal(true);
    setIsLoading(true);
    setTriggerEffect((prev) => !prev);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawnModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [triggerEffect]);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mt-24 sm:mt-22 sm:mb-4 md:mx-20 md:mt-32 lg:mx-40 rounded-2xl bg-white text-black ">
          <UserInfo />
        </div>
        {/* Vishnu */}

        {/* Signed Up outreaches section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                Signed Up Outreaches
              </div>
              <CustomButton
              label="More Signed Up Outreaches"
              name="buttondefault"
              onClick={() => {
                navigate("/profile/allSignedUpOutreaches");
              }}
            />
            </div>
            {/* <div className="pt-4">
              <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
                  Now you can view your created outreach events.
                </div>
              </div>
            </div> */}

            <div className="block overflow-x-auto overflow-y-hidden">
              {isLoading ? (
                <div className="flex justify-between items-center w-full h-fit gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : signedUpEvents.length === 0 ? (
                <NoDisplayData
                  name="signedupoutreaches"
                  label="No outreach events created"
                />
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
                  {signedUpEvents.slice(0,3).map((eventData) => (
                    <OutreachEventCard
                      key={eventData.id}
                      cardData={{
                        ...eventData,
                        eventDate: formatDate(
                          new Date(eventData.eventDate.seconds * 1000)
                        ),
                      }}
                      isProfilePage={true}
                      refresh={fetchData}
                      openModal={() =>
                        openModal({
                          ...eventData,
                          eventDate: eventData.eventDate?.seconds
                            ? formatDate(
                                new Date(eventData.eventDate.seconds * 1000)
                              )
                            : eventData.eventDate,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>{" "}
        </div>

        {/* Created outreaches section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <CreatedOutreaches />
          </div>{" "}
        </div>

        {/*  Outreach Visitlog section */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <OutreachVisitLogProfile />
          </div>
        </div>

        {/* Created Help Request section */}

        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 md:px-12 md:py-16 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
            <CreatedHelpRequests />
          </div>{" "}
        </div>
      </div>
      {
        <Modal open={!!selectedEvent}>
          <OutreachSignupModal
            data={{ ...selectedEvent }}
            closeModal={closeModal}
            onSignUp={onSignUp}
            onEventWithdraw={onEventWithdraw}
          />
        </Modal>
      }
      {/* <Modal open={showSignUpModal}>
				<RSVPConfirmationModal
					closeModal={closeSignUpModal}
					type="edit"
				/>
			</Modal> */}
      <Modal open={showWithdrawnModal}>
        <RSVPConfirmationModal
          closeModal={closeWithdrawModal}
          type="withdraw"
        />
      </Modal>
    </div>
  );
}

export default Profile;
