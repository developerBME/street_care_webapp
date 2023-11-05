import React, { useState, useEffect } from "react";
import userImg from "../../images/user.jpeg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import { handleRsvp } from "../EventCardService";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";

const OutreachEventCard = ({ cardData, isProfilePage, refresh }) => {
  const {
    id,
    label,
    userName,
    title,
    eventDate,
    location,
    helpType,
    totalSlots,
    interests,
    nop,
  } = cardData;
  const navigate = useNavigate();
  const [label2, setLabel2] = useState(label);
  console.log(label2);

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#F5EEFE] w-[350px] lg:w-full rounded-2xl mb-4">
      {!isProfilePage ? (
        <div className="inline-flex items-center px-5 pt-6 pb-3 space-x-2">
          <img src={userImg} className="w-8 h-8 rounded-full" />
          <div className="font-normal font-['Inter'] text-[13px] ">
            {userName}
          </div>
          <img src={verifiedImg} className="w-5 h-5" />
        </div>
      ) : (
        <div></div>
      )}

      {isProfilePage ? (
        <div className="px-5 py-2 space-y-4 pt-4 w-full">
          <div className="font-medium text-[22px] font-bricolage">{title}</div>
          <div className="font-semibold font-['Inter'] text-[13px] text-[#37168B]">
            {eventDate}
          </div>
          <div className="font-normal font-['Inter'] text-[#444746] text-[13px]">
            {location.street}, {location.city}, {location.state},{" "}
            {location.zipcode}
          </div>
          <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
            <img src={wavingHand} />
            <div className="font-normal font-['Inter'] text-[13px] text-[#181818]">
              {helpType}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-2 space-y-2 w-full">
          <div className="font-medium text-[16px] font-bricolage">{title}</div>
          <div className="font-semibold font-['Inter'] text-[12px] text-[#37168B]">
            {eventDate}
          </div>
          <div className="font-normal font-['Inter'] text-[#444746] text-[12px]">
            {location.street}, {location.city}, {location.state},{" "}
            {location.zipcode}
          </div>
          <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
            <img src={wavingHand} />
            <div className="font-normal font-['Inter'] text-[12px] text-[#181818]">
              {helpType}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between px-5 pt-2 pb-4 gap-16">
        {isProfilePage ? (
          <div class="group relative">
            {/* <button class="bg-violet-200 text-[#181818] text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300">
              Edit
            </button> */}
            <button
              className="bg-violet-200 text-[#181818] text-[14px] font-medium py-[10px] px-[24px] rounded-full hover:bg-violet-300 transition ease-in-out delay-300"
              onClick={handleEditClick}
            >
              Edit
            </button>
            {/* <nav
              tabindex="0"
              class="border-2 text-[12px]  hover:bg-violet-300 bg-violet-200 shadow invisible border-violet-300 rounded-2xl w-32 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
            >
              <ul class="py-1">
                <li>
                  <a
                    href="#"
                    class=" px-4 py-2  rounded-2xl  flex-col justify-center items-start flex"
                    onClick={(e) =>
                      handleRsvp(
                        e,
                        id,
                        label,
                        navigate,
                        label2,
                        setLabel2,
                        false,
                        refresh
                      )
                    }
                  >
                    Remove RSVP
                  </a>
                </li>
              </ul>
            </nav> */}
            {showModal && (
              <EditModal
                handleClose={handleCloseModal}
                id={id}
                label={label}
                navigate={navigate}
                label2={label2}
                setLabel2={setLabel2}
                refresh={refresh}
                title={title}
                eventDate={eventDate}
                location={location}
              />
            )}
          </div>
        ) : (
          <div class="group relative">
            <CustomButton
              label={label2}
              name="buttonlight"
              // onClick={(e) =>
              //   handleRsvp(
              //     e,
              //     id,
              //     label,
              //     navigate,
              //     label2,
              //     setLabel2,
              //     false,
              //     refresh
              //   )
              // }
              onClick={() => {
                navigate(`/outreachsignup/${id}`);
                {
                  console.log("Outreach event ID in HomePage : " + id);
                }
              }}
            />
            {/*<nav tabindex="0" class="border-2 text-[12px]  hover:bg-violet-300 bg-violet-200 shadow invisible border-violet-300 rounded-2xl w-32 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
                      <ul class="py-1">
                          <li>
                              <a href="#" class=" px-4 py-2  rounded-2xl  flex-col justify-center items-start flex" onClick={(e) =>
                                handleRsvp(
                                  e,
                                  id,
                                  label,
                                  navigate,
                                  label2,
                                  setLabel2,
                                  false,
                                  refresh
                                )
                              }>
                                  Remove RSVP
                              </a>
                          </li>
                      </ul>
                            </nav>*/}
          </div>
        )}

        {!isProfilePage ? (
          <div className="font-normal font-['Inter'] text-[12px]">
            Open Spots: {totalSlots - nop}/{totalSlots}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {/*<div className="flex items-center justify-between px-5 pt-2 pb-4 gap-16">
        {isProfilePage ? (
          <CustomButton
            label="Edit"
            name="buttonlight"
            onClick={(e) =>
              handleRsvp(
                e,
                id,
                label,
                navigate,
                label2,
                setLabel2,
                false,
                refresh
              )
            }
          />
        ) : (
          <CustomButton
            label={label2}
            name="buttonlight"
            onClick={(e) =>
              handleRsvp(
                e,
                id,
                label,
                navigate,
                label2,
                setLabel2,
                false,
                refresh
              )
            }
          />
        )}

        {!isProfilePage ? (
          <div className="font-normal font-['Inter'] text-[12px]">
            Open Spots: {totalSlots - nop}/{totalSlots}
          </div>
        ) : (
          <div></div>
        )}
        </div>*/}
    </div>
  );
};

export default OutreachEventCard;
