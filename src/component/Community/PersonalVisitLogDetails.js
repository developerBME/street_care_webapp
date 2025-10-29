import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { fetchPersonalVisitLogById } from "../VisitLogCardService";
import date from "../../images/date.png";
import locate from "../../images/location.png";
import CustomButton from "../Buttons/CustomButton";
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

import collectionMapping from "../../utils/firestoreCollections";

const users_collection = collectionMapping.users;
//const visitLogs_collection = collectionMapping.visitLogs;
const visitLogsNew_collection = collectionMapping.visitLogsBookNew;

const PersonalVisitLogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const fAuth = getAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPersonalVisitLogById(id);
        setData(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData(); // Invoke the async function
  }, [id]);

  const deleteVisitLog = async () => {
    try {
      const visitLogDoc = doc(db, visitLogsNew_collection, id);

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
      <div className="mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black w-full md:w-fit">
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/profile");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Profile
          </p>
        </div>
        <div className="md:px-[150px] md:py-[100px] px-[20px] py-[15px]">
          <div className="md:space-y-[64px] space-y-[32px]">
            <div className="font-medium font-dmsans text-[45px] text-neutral-800 leading-[52px]">
              Interaction Log Details
            </div>
            <div className="bg-[#F5EEFE] rounded-2xl ">
              {/* <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                <img src={profilePic} className="w-6 h-6 rounded-full" />
                <div>{data?.userName}</div>
                <img src={verifiedImg} className="w-5 h-5" />
              </div> */}
              <div className="px-6 py-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[13px] h-[15px] my-[3px]" src={date} alt="date" />
                    <div className="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight pt-0.5">
                      {data?.timeStamp.toDate().toLocaleString().toString()}
                    </div>
                  </div>
                  <div className="flex flex-row justify-normal items-center space-x-2">
                    <img className="w-[12px] h-[15px]" src={locate} alt = "location" />
                    <div className="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight">
                      {data?.city || ""}, {data?.stateAbbv || data?.state || ""}
                    </div>
                  </div>
                  <div className="text-zinc-700 text-[16px] font-normal font-['DM Sans'] leading-snug max-w-3xl">
                    {data?.peopleHelpedDescription || ""}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    {data?.whatGiven.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      People Helped
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.numberOfHelpers}
                    </div>
                  </div>

                  <div className="flex flex-row space-x-5">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      Items Donated
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.itemQty}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-[10px] inline-flex mt-6">
            <CustomButton
              label="Edit"
              name="editButton"
              onClick={() => {
                navigate(`/profile/visitlogform/${id}`);
              }}
            />
            <CustomButton
              label="Delete"
              name="deleteButton"
              onClick={() => setShowDeleteModal(true)}
            />
            {showDeleteModal && (
              <DeleteModal
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={deleteVisitLog}
                modalMsg={`Are you sure you want to delete this interaction log?`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalVisitLogDetails;
