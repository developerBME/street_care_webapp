import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import { formatDate, fetchUserOutreaches } from "../EventCardService";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import NoDisplayData from "./NoDisplayData";
import ErrorMessage from "../ErrorMessage";

function CreatedOutreaches() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        console.log("UID is ", uid);
        const createdEventsData = await fetchUserOutreaches(uid);
        createdEventsData.sort((a, b) => a.eventDate - b.eventDate);
        
        setCreatedEvents(createdEventsData);
      } else {
        console.log("No user is signed in");
        setCreatedEvents([]);
      }
    } catch (error) {
        setIsError(true);
        setCreatedEvents([]);
        setErrorMsg("Outreaches could not be loaded. Please try again later.");
        console.error("Error Fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(createdEvents)) {
      setIsLoading(false);
    }
  }, [createdEvents]);


return (
  <>
          
            <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
              <div className="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
                Created Outreaches
              </div>
              <CustomButton
                label="Create New Outreach"
                className="text-right"
                name="buttondefaulticon"
                icon={icon}
                onClick={() => {
                  navigate("/createOutreach");
                }}
              />
            </div>
            <div className="pt-4">
              <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
                <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
                  View outreach events you have created here.
                </div>
              </div>
            </div>

            <div className="block overflow-x-auto overflow-y-hidden">
              {isLoading ? (
                <div className="flex justify-between items-center w-full h-fit gap-2">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : isError ? (
                <ErrorMessage displayName="Outreaches" />
              ) : createdEvents.length === 0 ? (
                <NoDisplayData
                  name="signedupoutreaches"
                  label="No outreach events created"
                />
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
                  {createdEvents.map((eventData) => (
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
                    />
                  ))}
                </div>
              )}
            </div>
          
        </>
);
};

export default CreatedOutreaches;
