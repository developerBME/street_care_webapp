import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io"; // Import the IoIosArrowBack icon
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import CustomButton from "../Buttons/CustomButton";
import NoDisplayData from "../UserProfile/NoDisplayData";
import ErrorMessage from "../ErrorMessage";
import { auth } from "../firebase";

const MoreVisitLogs = () => {
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const logs = await fetchPersonalVisitLogs(user.uid);
        setVisitLogs(logs);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setVisitLogs([]);
        setErrorMsg("Visit logs could not be loaded. Please try again later.");
      }
    } else {
      console.log("No user is signed in.");
      setVisitLogs([]);
      setIsError(true);
      setErrorMsg("User not authenticated.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(visitLogs)) {
      setIsLoading(false);
    }
  }, [visitLogs]);

  return (
    <div className="relative flex flex-col items-center ">
  <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black">
    <div
      className="absolute flex mt-[-50px] items-center cursor-pointer"
      onClick={() => {
        navigate("/profile");
      }}
    >
      <IoIosArrowBack className="w-6 h-6" />
      <p className="font-bricolage text-xl font-bold leading-7">Return to Profile</p>
    </div>
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
        My Visit Logs
      </p>
      <div className="pt-4 pb-3">
        <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between ">
          <div className="text-neutral-800 text-[20px] font-medium font-bricolage leading-loose">
            View your documented visit logs here.
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : isError ? (
        <ErrorMessage message={errorMsg} />
      ) : (
        <>
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visitLogs.map((visitLogData) => (
              
              <div key={visitLogData.id} className="bg-[#F5EEFE] w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
              <div className="flex w-full">
                <OutreachVisitLogProfileCard
                  visitLogCardData={visitLogData}
                  onRefresh={fetchData}
                />
              </div>
            </div>
            ))}
          </div>
          {visitLogs.length === 0 && (
            <NoDisplayData name="visitlog" label="No visit logs created" />
          )}
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default MoreVisitLogs;
