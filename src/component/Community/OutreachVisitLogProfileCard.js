import React, { useState, useEffect } from "react";
import location from "../../images/location_on.svg";
import calendar from "../../images/calendar_month.svg";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { formatDate } from "../EventCardService";
import DeleteModal from "./DeleteModal";

const USERS_COLLECTION = "users";

const OutreachVisitLogProfileCard = ({ visitLogCardData, onRefresh }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fAuth = getAuth();

  // Function to delete visit log
  const deleteVisitLog = async () => {
    try {
      const visitLogDoc = doc(db, "personalVisitLog", visitLogCardData.id);

      const userQuery = query(
        collection(db, USERS_COLLECTION),
        where("uid", "==", fAuth?.currentUser?.uid)
      );
      const userDocRef = await getDocs(userQuery);

      const userDocID = userDocRef.docs[0].id;
      // reference for the userdoc
      const userRef = doc(db, USERS_COLLECTION, userDocID);
      // outreach event collection
      const docSnap = await getDoc(userRef);
      let personalVisitLogs = docSnap.data().personalVisitLogs || [];
      personalVisitLogs = personalVisitLogs.filter(
        (x) => x != visitLogCardData.id
      );

      await deleteDoc(visitLogDoc);
      await updateDoc(userRef, {
        personalVisitLogs: personalVisitLogs,
      });
      alert("Log deleted successfully");
      onRefresh();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle clicks outside dropdown menu to close it
  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".dropdown-menu") &&
      !event.target.closest(".menu-button")
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Event listener for handling clicks outside dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-[#F5EEFE] rounded-[30px] flex flex-col h-full w-[245px] xl:w-[320px] 2xl:w-[354px] md:flex-1 items-start relative">
      <div className="flex flex-col h-full w-full px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="text-violet-900 text-[12px] font-medium font-bricolage leading-tight flex flex-row">
            <img alt="" className="w-4 h-4" src={calendar} />
            <div className="px-1">
              {formatDate(new Date(visitLogCardData?.dateTime?.seconds * 1000))}
            </div>
            <img alt="" className="w-4 h-4" src={location} />
            <div className="pt-0">
              {visitLogCardData?.city || ""}, {visitLogCardData?.stateAbbv || visitLogCardData?.state || ""}
            </div>
          </div>
          <div className="relative ml-4">
            <button
              className="menu-button inline-flex justify-center w-full h-full rounded-md border border-[#F5EEFE] shadow-sm px-2  bg-[#F5EEFE] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="h-8 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="dropdown-menu origin-top-right absolute right-0 mt-2 w-18 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
              >
                <ul className="py-2">
                  <li>
                    <a
                      label="Edit"
                      name="buttonlightsmall"
                      onClick={() => {
                        navigate(
                          `/profile/personaloutform/${visitLogCardData.id}`
                        );
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      label="Delete"
                      name="buttonlightsmall"
                      onClick={() => setShowDeleteModal(true)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >
                      Delete
                    </a>
                  </li>
                  {showDeleteModal && (
                  <DeleteModal
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={deleteVisitLog}
                    modalMsg={`Are you sure you want to delete this visit log?`}
                  />
                )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="text-zinc-700 text-[12px] font-normal font-bricolage leading-snug mt-2 mb-2 px-1">
          {visitLogCardData.description || ""}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between mt-2 mb-2 px-1">
            <div className="text-neutral-900 text-[14px] font-bold font-bricolage leading-tight text-left">
              People Helped
            </div>
            <div className="text-neutral-900 text-[18px] mt-[-5px] font-bold font-bricolage leading-tight text-right">
              {visitLogCardData.numberPeopleHelped || ""}
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 px-1">
            <div className="text-neutral-900 text-[14px] font-bold font-bricolage leading-tight text-left">
              Items Donated
            </div>
            <div className="text-neutral-900 text-[18px] mt-[-5px] font-bold font-bricolage leading-tight text-right">
              {visitLogCardData.itemQty || ""}
            </div>
          </div>
        </div>
        <div className="px-1">
          <div className="inline-flex items-center gap-2 flex-wrap mt-2">
            {visitLogCardData?.whatGiven.map((item, index) => (
              <div
                className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2 px-4 pb-6 space-x-2">
        <CustomButton
          label="View Details"
          name="buttonlightsmall"
          onClick={() => {
            navigate(`/PersonalVisitLogDetails/${visitLogCardData.id}`);
          }}
        />
      </div>
    </div>
  );
};

export default OutreachVisitLogProfileCard;
