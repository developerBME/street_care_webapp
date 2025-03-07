import React, { useState, useEffect } from "react";
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
// import OutreachVisitLogCard from "./OutreachVisitLogCard";
// import { fetchEvents, formatDate } from "../EventCardService";
import { fetchPersonalVisitLogss,PersonalVisitLogsCount } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import CustomButton from "../Buttons/CustomButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { auth } from "../firebase";
import NoDisplayData from "../UserProfile/NoDisplayData";
import ErrorMessage from "../ErrorMessage";

const OutreachVisitLogProfile = () => {

  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const logsPerPage = 3;
  let [cursorFields,setCursorFields] = useState({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[]})
  let [currentPageLength,setCurrentPageLength] = useState(0)
  const [totalPages,setTotalPages] = useState(0)
  const fetchData = async () => {
    if(!cursorFields.direction)return
    const user = auth.currentUser;
    setIsLoading(true);
    if (user) {
      try {
        const logs = await fetchPersonalVisitLogss(
          user.uid,
          cursorFields.pageSize,
          cursorFields.lastVisible,
          cursorFields.direction,
          cursorFields.pageHistory
        );
        setCursorFields((prev)=>({...prev,lastVisible:logs.lastVisible,pageHistory:logs.pageHistory}))
        setVisitLogs(logs.visitLogs);
        if(cursorFields.direction ==="next")setCurrentPageLength((prev)=>prev+logs.visitLogs.length)
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setVisitLogs([]);
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  const fetchTotalRecords = async() =>{
    const user = auth.currentUser;
    if(user){
      const totalRecords = await PersonalVisitLogsCount(user.uid)
      setTotalPages(totalRecords)
    }else {
      console.log("No user is signed in.");
    }
  }

  useEffect(() => {
    fetchData();
  }, [auth.currentUser,cursorFields.direction]);
  //On Page Load is enough
  useEffect(()=>{
    fetchTotalRecords()
  },[])

  //removed because the useEffect checks a value is changed by value type while the array is reference type.
  // useEffect(() => {
  //   if (Array.isArray(visitLogs)) {
  //     setIsLoading(false);
  //   }
  // }, [visitLogs]);

  //Calling this function when a record is deleted. Since the setState updates after the rerender we are setting the state values locally and using those to fetch the data. Using await to aviod race conditions.
  const handleRefresh = async() => {
    cursorFields = {"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[]}
    setCursorFields(cursorFields);
    currentPageLength = 0
    setCurrentPageLength(0)
    await fetchTotalRecords();
    await fetchData();
  };

  const handleNext = () =>{
    // Reset direction to force an update
  setCursorFields((prev) => ({ ...prev, direction: "" })); 

  // Set it to 'next' after a slight delay
  setTimeout(() => {
    setCursorFields((prev) => ({ ...prev, direction: "next" }));
  }, 0); 
  }
  const handlePrev=()=>{
    //Handling here since I need length of the records one render before
    setCurrentPageLength((prev)=>(prev-visitLogs.length))
    //Reset direction to force an update
    setCursorFields((prev) => ({ ...prev, direction: "" })); 
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0); 
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPageLength > logsPerPage) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePrev()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
      );
    }

    if (currentPageLength < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handleNext()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      );
    }

    return buttons;
  };


  return (
    <>
      <div className="inline-flex flex-col sm:flex-row sm:space-x-16 justify-between gap-2">
        <div className="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage text-left leading-[52px]">
          My Visit Logs
        </div>
        <CustomButton
          label="Document New Visit Log"
          className="text-right"
          name="buttondefaulticon"
          icon={icon}
          onClick={() => {
            navigate("/profile/personaloutform");
          }}
        />
      </div>
      <div className="pt-4">
        <div className="w-full flex flex-col sm:flex-row bg-[#F2F6D8] p-4 rounded-xl gap-4 justify-between">
          <div className="text-neutral-800  text-[20px] font-medium font-bricolage leading-loose">
            View your documented visit logs here.
          </div>
        </div>
      </div>

      {isLoading ? (
          <div className="flex md:justify-between md:items-center w-full h-fit gap-2 grid-flow-col overflow-x-auto">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) :  (
          <>
            {visitLogs?.length > 0 && (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visitLogs.map((visitLogData) => (
            <div key={visitLogData.id} className="bg-[#F5EEFE] w-full rounded-[30px] mb-4 flex flex-col justify-between p-6">
              <div className="flex w-full">
                <OutreachVisitLogProfileCard
                  visitLogCardData={visitLogData}
                  onRefresh={handleRefresh}
                />
              </div>
            </div>
          ))}
        </div>
          )}

          {/* { visitLogs?.length > logsPerPage && (
              <div className="">
          <CustomButton
            label="More of My Visit Logs"
            name="buttondefault"
            onClick={() => {
              navigate("/myvisitlogs");
            }}
          />
        </div>
            
          )} */}

          {/* {visitLogs.length == 0 && <NoOutreachDoc isPersonalVisitLog={true} />} */}
          {visitLogs.length === 0 && (
            <NoDisplayData name="visitlog" label="No visit logs created" />
          )}
          <div className="flex justify-between items-center mt-8 w-full">
                <p className="text-gray-600">
                  Showing {currentPageLength} of {totalPages}{" "}
                  events
                </p>
          <div>{renderPaginationButtons()}</div>
          </div>
        </>
      )}
    </>
  );
};

export default OutreachVisitLogProfile;
