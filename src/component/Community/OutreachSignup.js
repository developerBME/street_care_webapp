import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import {
  fetchEventById,
  handleRsvp,
  fetchUserSignedUpOutreaches,
  isUserParticipantInEvent
} from "../EventCardService";
import { fetchUserName } from "../HelperFunction";
import { Co2Sharp } from "@mui/icons-material";
import defaultImage from "../../images/default_avatar.svg";
import RSVPConfirmationModal from "../UserProfile/RSVPConfirmationModal";
import userSlots from "../../images/userSlots.png";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import phone from "../../images/phone.png";
import email from "../../images/email.png";
import { useLocation } from "react-router-dom";
import EditModal from "./EditModal";
import verifiedPurple from "../../images/verified_purple.png";
import verifiedGreen from "../../images/verified.png";
import verifiedBlue from "../../images/verified_blue.png";
import verifiedYellow from "../../images/verified_yellow.png";
import DeleteModal from "./DeleteModal";

import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { isPast } from "date-fns";
import flagSvg from "../../images/flag.svg"; // Flag icon
import { useUserContext } from "../../context/Usercontext.js";
import collectionMapping from "../../utils/firestoreCollections.js";

const users_collection = collectionMapping.users;
const outreachEvents_collection = collectionMapping.outreachEvents;

const OutreachSignup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [label2, setLabel2] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const [success, setSuccess] = useState(false);
  const fAuth = getAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hasCreated, setHasCreated] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);

  const location = useLocation();
  const { label } = location.state || {};
  const isProfilePage = location?.state?.isProfilePage || false;

  const eventDetails = [
    {
      time: "12/12/2023 SAT 12:00pm",
      location: "200 Eastern Pkwy, Brooklyn, NY 11238",
    },
  ];

  const [data, setData] = useState(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Add near your other useState hooks
  const [isFlagged, setIsFlagged] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEventById(id);
        setData(result);
        console.log(result)
      } catch (error) {
        console.error(error.message);
      }
    };
    //  console.log('ProfilePage status'+isProfilePage);

    getData(); // Invoke the async function
  }, [label2]);
  useEffect(() => {
    const fetchFlagStatus = async () => {
      try {
        if (!id) {
          console.error("Invalid id:", id);
          return;
        }
        const docRef = doc(db, outreachEvents_collection, id);
        const currentDoc = await getDoc(docRef);
        if (currentDoc.exists()) {
          const { isFlagged } = currentDoc.data();
          setIsFlagged(isFlagged || false);
        } else {
          console.error("Document does not exist:", id);
        }
      } catch (error) {
        console.error("Error fetching flag status:", error);
      }
    };
    fetchFlagStatus();
  }, [id]);

  const handleFlag = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!fAuth.currentUser) {
      alert("Please log in to flag or unflag the Outreach Event.");
      console.error("User is not logged in.");
      return;
    }
    try {
      if (!id) {
        console.error("Invalid id:", id);
        return;
      }
      const userRef = doc(db, users_collection, fAuth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        console.error("User document does not exist:", fAuth.currentUser.uid);
        return;
      }
      const { Type: userType } = userDoc.data();
      const docRef = doc(db, outreachEvents_collection, id);
      const currentDoc = await getDoc(docRef);
      if (!currentDoc.exists()) {
        console.error("Outreach document does not exist:", id);
        return;
      }
      const { isFlagged: currentStatus, flaggedByUser } = currentDoc.data();
      const canUnflag =
        flaggedByUser === fAuth.currentUser.uid ||
        userType === "Street Care Hub Leader";
      if (currentStatus) {
        if (!canUnflag) {
          alert(
            "Only the user who flagged this event or a Street Care Hub Leader can unflag it."
          );
          // console.error("Only the user who flagged this event or a Street Care Hub Leader can unflag it.");
          return;
        }
        await updateDoc(docRef, { isFlagged: false, flaggedByUser: null });
        setIsFlagged(false);
      } else {
        await updateDoc(docRef, {
          isFlagged: true,
          flaggedByUser: fAuth.currentUser.uid,
        });
        setIsFlagged(true);
      }
    } catch (error) {
      console.error("Error toggling document flag status:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getUserSignedUpOutreaches = async () => {
      try {
        const result = await isUserParticipantInEvent(
          id,
          fAuth?.currentUser?.uid
        );
        // setUserSignedUpOutreaches(result);
        // console.log("Result in OS: ", result);
        
        // const eventIds = result?.map((event) => event.id);
        // // console.log(eventIds);
        // console.log("Event Ids: ", eventIds);

        // const isSignedUp = eventIds?.includes(id);
        // console.log(isSignedUp);
        if (result) {
          setLabel2("EDIT");
        } else {
          setLabel2("RSVP");
        }

      } catch (error) {
        console.error(error.message);
      }
    };
    getUserSignedUpOutreaches();
    // console.log(fAuth.currentUser.uid);

    if (data?.uid === fAuth?.currentUser?.uid) {
      setHasCreated(true);
    } else {
      setHasCreated(false);
    }

    const timestamp =
      data?.eventStartTime.seconds * 1000 +
      data?.eventStartTime.nanoseconds / 1000000;
    if (timestamp < Date.now()) {
      setIsPastEvent(true);
    } else {
      setIsPastEvent(false);
    }
  }, [data]);

  // console.log(isPastEvent)

  let verifiedImg;
  if (data) {
    switch (data.userType) {
      case "Chapter Leader":
        verifiedImg = verifiedGreen;
        break;
      case "Chapter Member":
        verifiedImg = verifiedPurple;
        break;
      case "Street Care Hub Leader":
        verifiedImg = verifiedBlue;
        break;
      default:
        verifiedImg = verifiedYellow;
        break;
    }
  }

  const deleteVisitLog = async () => {
    try {
      const visitLogDoc = doc(db, outreachEvents_collection, id);

      const userQuery = query(
        collection(db, users_collection),
        where("uid", "==", fAuth?.currentUser?.uid)
      );

      const userDocRef = await getDocs(userQuery);

      const userDocID = userDocRef.docs[0].id;
      // reference for the userdoc
      const userRef = doc(db, users_collection, userDocID);
      // outreach event collection
      const docSnap = await getDoc(userRef);
      let personalVisitLogs = docSnap.data().personalVisitLogs || [];
      personalVisitLogs = personalVisitLogs.filter((x) => x !== id);

      await deleteDoc(visitLogDoc);
      await updateDoc(userRef, {
        personalVisitLogs: personalVisitLogs,
      });
      alert("Log deleted successfully");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex flex-col items-center ">
      <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
        <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
          <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
            <div className="w-fit text-[#212121] text-[45px] font-medium font-inter leading-[52px]">
              Sign Up For Community Outreach
            </div>
            <div className="self-stretch h-fit bg-[#F5EDFA] rounded-[30px] flex-col justify-start items-start flex">
              <div className="self-stretch h-fit px-6 pt-9 pb-3 flex-col justify-start items-start gap-2.5 flex">
                {/* <div className="justify-start items-center gap-2 inline-flex">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={data?.photoUrl || defaultImage}
                  />
                  <div className="justify-start items-center gap-1 flex">
                    {data ? (
                      <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                        {data.userName}
                      </div>
                    ) : (
                      <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                    <img src={verifiedImg} className="w-6 h-6" />
                  </div>
                  <div className="relative group">
                    <img
                      onClick={handleFlag}
                      src={flagSvg}
                      alt="flag"
                      className={`w-8 h-8 cursor-pointer rounded-full p-1 ${
                        isFlagged ? "bg-red-500" : "bg-transparent hover:bg-gray-200"
                      }`}
                    />
                    <div
                      className="absolute top-full right-0 mt-1 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                      style={{ minWidth: "150px", maxWidth: "200px", textAlign: "center" }}
                    >
                      {!isFlagged ? "Flag the Outreach Event?" : "Unflag the Outreach Event?"}
                    </div>
                  </div>  

                </div> */}
                <div className="w-full flex items-center justify-between px-6 pt-9 pb-3">
                  {/* Left side: User info */}
                  <div className="flex items-center gap-2">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={data?.photoUrl || defaultImage}
                      alt="User"
                    />
                    <div className="flex items-center gap-1">
                      {data ? (
                        <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                          {data.userName}
                        </div>
                      ) : (
                        <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                          Loading...
                        </div>
                      )}
                      <img
                        src={verifiedImg}
                        className="w-6 h-6"
                        alt="Verified"
                      />
                    </div>
                  </div>
                  {/* Right side: Flag icon */}
                  <div className="relative group">
                    <img
                      onClick={handleFlag}
                      src={flagSvg}
                      alt="flag"
                      className={`w-8 h-8 cursor-pointer rounded-full p-1 ${
                        isFlagged
                          ? "bg-red-500"
                          : "bg-transparent hover:bg-gray-200"
                      }`}
                    />
                    <div
                      className="absolute top-full right-0 mt-1 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                      style={{
                        minWidth: "150px",
                        maxWidth: "200px",
                        textAlign: "center",
                      }}
                    >
                      {!isFlagged
                        ? "Flag the Outreach Event?"
                        : "Unflag the Outreach Event?"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-fit px-6 py-2 flex-col justify-start items-start gap-2 flex">
                <div className="flex flex-col justify-between space-y-3">
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                    {data ? (
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {data.eventDate}
                      </div>
                    ) : (
                      <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                        Loading...
                      </div>
                    )}
                  </div>
                  {data && data.consentStatus && (
                     <div className="flex flex-row justify-normal space-x-2">
                      <img className="w-[12px] h-[15px] my-[3px]" src={phone} alt="Phone Icon" />
                        <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                           {data.contactNumber}
                        </div>
                     </div>
                  )}
                  {data && data.consentStatus && data.emailAddress && (
                     <div className="flex flex-row justify-normal space-x-2">
                      <img className="w-[12px] h-[15px] my-[3px]" src={email} alt="Email Icon" />
                        <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                           {data.emailAddress}
                        </div>
                     </div>
                  )}
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
                    {data ? (
                      <div className="font-medium font-dmsans text-[14px] text-[#37168B]">
                        {data.consentStatus
                          ? [data.location.street, data.location.city, data.location.stateAbbv, data.location.zipcode]
                              .filter(Boolean)
                              .join(", ")
                          : `${data.location.city}, ${data.location.stateAbbv}`}
                      </div>
                    ) : (
                      <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                  </div>
                </div>

                {data ? (
                  <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                    {data.title}
                  </div>
                ) : (
                  <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                    Loading...
                  </div>
                )}

                {data ? (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    {data.description}
                  </div>
                ) : (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    Loading...
                  </div>
                )}

                {/* <div className="self-stretch px-4 py-2 bg-white rounded-2xl justify-center items-center gap-2.5 inline-flex">
                  <img src={wavingHand} className="w-6 h-6" />

                  {data ? (
                    <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                      {data.helpType}
                    </div>
                  ) : (
                    <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                      Loading...
                    </div>
                  )}
                </div> */}

                {data ? (
                  <div className="inline-flex items-center gap-2 flex-wrap">
                    {data.skills.map((item) => (
                      <div
                        key={item}
                        className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[12px] text-[#444746]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="self-stretch text-[#444746] text-[14px] font-medium font-dmsans leading-loose">
                    Loading...
                  </div>
                )}
              </div>
              <div className="self-stretch px-6 pt-4 pb-6 justify-between items-center inline-flex">
                {data ? (
                  // <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                  //   {/* Open Spots: {data.interests}/{data.totalSlots} */}
                  //   Open Spots: {data.totalSlots - data.nop}/{data.totalSlots}
                  // </div>
                  <div className="flex flex-row space-x-2">
                    <img
                      className="w-[20px] h-[14px] my-1"
                      src={userSlots}
                    ></img>
                    <div className="font-normal font-dmsans text-[14px]">
                      {/* Open Spots: {totalSlots - nop}/{totalSlots} */}
                      {/* {data.totalSlots - data.nop}/{data.totalSlots} */}
                      {/* {data.nop} */}
                      {data.nop}/{data.totalSlots}
                    </div>
                  </div>
                ) : (
                  <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                    Loading...
                  </div>
                )}
              </div>
            </div>

            {data && !isPastEvent ? (
              <div className="justify-start items-start gap-[15px] inline-flex">
                <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                  {label2 === "EDIT" ? (
                    <>
                      <CustomButton
                        label="Withdraw"
                        name="buttondefault"
                        onClick={(e) => {
                          handleRsvp(
                            e,
                            id,
                            "EDIT",
                            navigate,
                            "EDIT",
                            setLabel2,
                            false
                          );
                          // setSuccess(true);
                          setModalLabel("RSVP");
                          handleShowModal();
                        }}
                      />

                      {/* <CustomButton
                          label="Delete"
                          name="deleteButton"
                          onClick={() => setShowDeleteModal(true)}
                        />
                        {showDeleteModal && (
                          <DeleteModal
                            handleClose={() => setShowDeleteModal(false)}
                            handleDelete={deleteVisitLog}
                            modalMsg={`Are you sure you want to delete this visit log?`}
                          />
                        )} */}
                    </>
                  ) : (
                    <CustomButton
                      label="Sign Up"
                      name="buttondefault"
                      onClick={(e) => {
                        handleRsvp(
                          e,
                          id,
                          "RSVP",
                          navigate,
                          "RSVP",
                          setLabel2,
                          false
                        );
                        // console.log(data);
                        // setSuccess(true);
                        setModalLabel("EDIT");
                        handleShowModal();
                      }}
                    />
                  )}
                </div>

                <div
                  className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <button className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight">
                      Cancel
                    </button>
                  </div>
                </div>
                {hasCreated && (
                  <CustomButton
                    label="Delete"
                    name="deleteButton"
                    onClick={() => setShowDeleteModal(true)}
                  />
                )}
                {showDeleteModal && (
                  <DeleteModal
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={deleteVisitLog}
                    modalMsg={`Are you sure you want to delete this interaction log?`}
                  />
                )}
                {showModal && (
                  <RSVPConfirmationModal
                    closeModal={handleCloseModal}
                    type={modalLabel}
                  />
                )}
              </div>
            ) : (
              <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                <div
                  className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <button className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachSignup;
