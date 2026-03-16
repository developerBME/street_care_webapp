import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../images/arrowRight.png";
import OutreachVisitLogCard from "../Community/OutreachVisitLogCard";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import { fetchHomeVisitLogs } from "../VisitLogCardService";
import ErrorMessage from "../ErrorMessage";
import CustomButton from "../Buttons/CustomButton";
import UserTypeInfo from "../UserTypeInfo";

import collectionMapping from "../../utils/firestoreCollections";
import DisplayInteractionLogCard from "../Community/DisplayInteractionLogCard";
import PopUpModal from "../PopUpModal";
import { VisitLogExpandedView } from "../admin_test/PostApprovals/components/VisitLogExpandedView";

const HomePageVisitlog = () => {
  const navigate = useNavigate();

  const [visitLogs, setVisitLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedPost, setIsSelectedPost] = useState(null);

  const handleOpenPopUpModal = (CardData) => {
    setIsSelectedPost(CardData);
    setIsModalOpen(true);
  };

  const handleClosePopUpModal = () => {
    setIsSelectedPost(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const visitLogsData = await fetchHomeVisitLogs();
        setVisitLogs(visitLogsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching interaction logs:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("InteractionLogData", visitLogs);
  // }, [visitLogs]);

  return (
    <div>
      <div className="bg-[#F7F7F7] flex-col justify-start items-start gap-4 w-full">
        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between">
              <div
                className="flex flex-row cursor-pointer gap-2 items-center"
                onClick={() => {
                  navigate("/allOutreachVisitLog");
                }}
              >
                <div className="font-medium text-2xl md:text-[45px] text-[#1F0A58] font-dmsans">
                  Latest Actions - Interaction Log
                </div>

                <img src={arrowRight} className="w-6 h-6 lg:w-10 lg:h-10 " />
              </div>
            </div>
            <UserTypeInfo />
          </div>
        </div>

        <div className="pt-8">
          {isLoading ? (
            // <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : isError ? (
            <ErrorMessage displayName="Interaction Logs" />
          ) : visitLogs?.length > 0 ? (
            // <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
              {visitLogs.map((visitLogData) => (
                <DisplayInteractionLogCard
                  key={visitLogData.id}
                  interactionLogCardData={visitLogData}
                  openPopUpModal={() => {
                    handleOpenPopUpModal(visitLogData);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
              No interaction logs found.
            </div>
          )}
        </div>
        <div className="mt-16">
          <CustomButton
            label="More Interaction Logs"
            name="buttondefault"
            onClick={() => {
              navigate("/allOutreachVisitLog");
            }}
          />
        </div>
      </div>
      {isModalOpen && (
        <PopUpModal onClose={handleClosePopUpModal}>
          <VisitLogExpandedView postData={isSelectedPost} />
        </PopUpModal>
      )}
    </div>
  );
};

export default HomePageVisitlog;
