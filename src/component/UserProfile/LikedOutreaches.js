import React, { useState, useEffect } from "react";
import NoDisplayData from "./NoDisplayData";
import icon from "../../images/icon.png";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import OutreachEventCard from "../Community/OutreachEventCard";
import { auth } from "../firebase";
import CustomButton from "../Buttons/CustomButton";
import { fetchLikedOutreaches} from "../EventCardService";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./../HelperFunction";

const LikedOutreaches = () => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const likedEventsData = await fetchLikedOutreaches(uid);
        likedEventsData.sort((a, b) => a.eventData - b.eventData);

        setLikedEvents(likedEventsData);
      } else {
        setLikedEvents([]);
      }
    } catch (error) {
      setIsError(true);
      setLikedEvents([]);
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
    if (Array.isArray(likedEvents)) {
      setIsLoading(false);
    }
  }, [likedEvents]);

  return (
    <>
      <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
        <div className="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
          Liked Outreaches
        </div>
        <CustomButton
          label="Like An Outreach"
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
            View outreach events you have liked here.
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
        ) : likedEvents.length === 0 ? (
          <NoDisplayData
            name="likedoutreaches"
            label="No outreach events created"
          />
        ) : (
          <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 mb-6">
              {likedEvents.slice(0, 3).map((eventData) => (
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
              label="More Liked Outreaches"
              name="buttondefault"
              onClick={() => {
                navigate("/profile/allLikedOutreaches");
              }}
            />
          </div>
          </div>
          
        )}
      </div>
    </>
  );
};

export default LikedOutreaches;
