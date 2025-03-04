import React, { useState, useEffect } from "react";
import OutreachVisitLogProfileCard from "./OutreachVisitLogProfileCard";
import { useNavigate } from "react-router-dom";
import icon from "../../images/icon.png";
// import OutreachVisitLogCard from "./OutreachVisitLogCard";
// import { fetchEvents, formatDate } from "../EventCardService";
import { fetchPersonalVisitLogss } from "../VisitLogCardService";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import CustomButton from "../Buttons/CustomButton";
import NoOutreachDoc from "./NoOutreachDoc";
import { auth } from "../firebase";
import NoDisplayData from "../UserProfile/NoDisplayData";
import ErrorMessage from "../ErrorMessage";

const OutreachVisitLogProfile = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  const navigate = useNavigate();
  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const logsPerPage = 3;
  const [cursorFields,setCursorFields] = useState({"lastVisible":null,"pageSize" : logsPerPage,"direction":"next","pageHistory":[]})
  
  const fetchData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const logs = await fetchPersonalVisitLogss(
          user.uid,
          cursorFields.pageSize,
          cursorFields.lastVisible,
          cursorFields.direction,
          cursorFields.pageHistory
        );
        console.log(logs)
        setCursorFields((prev)=>({...prev,lastVisible:logs.lastVisible,pageHistory:logs.pageHistory}))
        setVisitLogs(logs.visitLogs);
      } catch (error) {
        setIsError(true);
        setVisitLogs([]);
      }
    } else {
      console.log("No user is signed in.");
      setVisitLogs([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.currentUser,cursorFields.direction]);

  useEffect(() => {
    if (Array.isArray(visitLogs)) {
      setIsLoading(false);
    }
  }, [visitLogs]);

  const handleRefresh = () => {
    fetchData();
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

          { visitLogs?.length > logsPerPage && (
              <div className="">
          <CustomButton
            label="More of My Visit Logs"
            name="buttondefault"
            onClick={() => {
              navigate("/myvisitlogs");
            }}
          />
        </div>
            
          )}

          {/* {visitLogs.length == 0 && <NoOutreachDoc isPersonalVisitLog={true} />} */}
          {visitLogs.length === 0 && (
            <NoDisplayData name="visitlog" label="No visit logs created" />
          )}
        </>
      )}
    </>
  );
};

export default OutreachVisitLogProfile;
