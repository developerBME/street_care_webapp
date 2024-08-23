import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Import both icons
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import NoDisplayData from "../UserProfile/NoDisplayData";
import ErrorMessage from "../ErrorMessage";
import { auth } from "../firebase";

const MoreVisitLogs = () => {
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10; // Number of logs per page

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

  // Get current logs based on pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = visitLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                {currentLogs.map((visitLogData) => (
                  <div
                    key={visitLogData.id}
                    className="bg-[#F5EEFE] w-full rounded-[30px] mb-4 flex flex-col justify-between p-6"
                  >
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
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === 1 ? "bg-gray-300" : "bg-[#1F0A58] text-white"
                  }`}
                >
                  <IoIosArrowBack />
                </button>
                <div className="flex items-center gap-2 mx-4">
                  {Array.from({
                    length: Math.ceil(visitLogs.length / logsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-full ${
                        currentPage === index + 1
                          ? "bg-[#1F0A58] text-white"
                          : "bg-white text-[#1F0A58] border border-[#1F0A58]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(visitLogs.length / logsPerPage)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === Math.ceil(visitLogs.length / logsPerPage)
                      ? "bg-gray-300"
                      : "bg-[#1F0A58] text-white"
                  }`}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreVisitLogs;
