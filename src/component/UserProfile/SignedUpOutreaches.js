import React, { useState, useEffect } from "react";
import NoDisplayData from "./NoDisplayData";
import icon from "../../images/icon.png";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import { formatDate, fetchUserSignedUpOutreaches } from "../EventCardService";
import { useNavigate } from "react-router-dom";

const SignedUpOutreaches = () => {
  const [signedUpEvents, setSignedUpEvents] = useState([]);
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
        const signedUpEventsData = await fetchUserSignedUpOutreaches(uid);
        signedUpEventsData.sort((a, b) => a.eventData - b.eventData);

        setSignedUpEvents(signedUpEventsData);
      } else {
        console.log("No user is signed in.");
        setSignedUpEvents([]);
      }
    } catch (error) {
      setIsError(true);
      setSignedUpEvents([]);
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
    if (Array.isArray(signedUpEvents)) {
      setIsLoading(false);
    }
  }, [signedUpEvents]);

  return (
    <>
      <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
        <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
          Signed Up Outreaches
        </div>
        <CustomButton
          label="Sign Up To An Outreach"
          className="text-right"
          name="buttondefaulticon"
          icon={icon}
          onClick={() => {
            navigate("/allOutreachEvents");
          }}
        />
      </div>
      <div className="pt-4">
        <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
          <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
            View outreach events you have signed up for here.
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
          <div className="text-center text-neutral-900 text-[20px] leading-9">
            {errorMsg}
          </div>
        ) : signedUpEvents.length === 0 ? (
          <NoDisplayData
            name="signedupoutreaches"
            label="No outreach events created"
          />
        ) : (
          <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
              {signedUpEvents.slice(0, 3).map((eventData) => (
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
            <div>
            <CustomButton
              label="More Signed Up Outreaches"
              name="buttondefault"
              onClick={() => {
                navigate("/profile/allSignedUpOutreaches");
              }}
            />
          </div>
          </div>
          
        )}
      </div>
    </>
  );
};

export default SignedUpOutreaches;
