import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsFlag, BsFlagFill } from "react-icons/bs"; // Flag icons
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import { fetchPersonalVisitLogs } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import NoDisplayData from "../UserProfile/NoDisplayData";
import ErrorMessage from "../ErrorMessage";
import { auth } from "../firebase";


import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  updateDoc,
  status
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const MoreVisitLogs = () => {
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 6;

  const navigate = useNavigate();

  const fetchData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const logs = await fetchPersonalVisitLogs(user.uid);
        // Add a 'flagged' property to each log
        const logsWithFlags = logs.map((log) => ({
          ...log,
          flagged: false,
        }));
        setVisitLogs(logsWithFlags);
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

  const updateFlagStatusInFirebase = async (id, flagged) => {
    try {
      const logRef = doc(db, "personalvisitlog", id); // Correct Firestore reference
      await updateDoc(logRef, { flagged });
      console.log(`Flag status updated for log ID: ${id}, flagged: ${flagged}`);
    } catch (error) {
      console.error("Error updating flag status in Firebase:", error);
    }
  };
  
  const toggleFlag = (id) => {
    const logToUpdate = visitLogs.find((log) => log.id === id);
    if (!logToUpdate) {
      console.error("Log not found:", id);
      return;
    }
    const newFlaggedStatus = !logToUpdate.flagged;
  
    setVisitLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === id ? { ...log, flagged: newFlaggedStatus } : log
      )
    );
  
    updateFlagStatusInFirebase(id, newFlaggedStatus);
  };
  

  // Get current logs based on pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = visitLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Color variables for pagination
  const inactiveBgColor = "bg-white";
  const inactiveTextColor = "text-black";
  const inactiveBorderColor = "border-[#9B82CF]";
  const activeBgColor = "bg-[#E0D7EC]";
  const activeTextColor = "text-black";
  const activeBorderColor = "border-[#1F0A58]";

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
            <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
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
                    <div className="flex w-full justify-between items-center">
                      <OutreachVisitLogProfileCard
                        visitLogCardData={visitLogData}
                        onRefresh={fetchData}
                      />
                      <button
                        className="text-xl text-gray-500"
                        onClick={() => toggleFlag(visitLogData.id)}
                      >
                        {visitLogData.flagged ? <BsFlagFill className="text-red-500" /> : <BsFlag />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {visitLogs.length === 0 && (
                <NoDisplayData name="visitlog" label="No visit logs created" />
              )}
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                {[...Array(Math.ceil(visitLogs.length / logsPerPage)).keys()].map((i) => (
                  <button
                    key={i + 1}
                    className={`mx-2 px-4 py-2 border rounded-full ${
                      currentPage === i + 1
                        ? `${activeBgColor} ${activeTextColor} ${activeBorderColor}`
                        : `${inactiveBgColor} ${inactiveTextColor} ${inactiveBorderColor}`
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreVisitLogs;
