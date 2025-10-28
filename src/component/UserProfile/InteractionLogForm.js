import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { Info } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import ConfirmationModal from "./ConfirmationModal";
import { emailConfirmation } from "../EmailService";
import { fetchPersonalVisitLogById } from "../VisitLogCardService";
import UpdateVisitLogConfirmationModal from "./UpdateVisitLogConfirmationModal";
import { Timestamp } from "firebase/firestore";
import { areObjectsEqual } from "../../utils/helperFns";
import { fetchUserTypeDetails } from "../EventCardService";
import GeneralInfoForm from "./GeneralInfoForm";
import DynamicSubSection from "../FormBuilder/DynamicSubsection";
import collectionMapping from "../../utils/firestoreCollections";
import ConfirmationModalInteractionLog from "./ConfirmationModalInteractionLog";

const interactionLog_collection = collectionMapping.interactionLog;
const helpRequest_collection = collectionMapping.helpRequestsInteractionLog;

export const obj1 = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  startTimestamp: "",
  endTimestamp: "",
  interactionDate: "",
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "USA",
  listOfSupportsProvided: [],
  numPeopleHelped: 1,
  numPeopleJoined: 0,
  carePackagesDistributed: 0,
  carePackageContents: null,
  helpRequestCount: 0,
  helpRequestDocIds: [],
  isPublic: true,
  status: "Pending",
  lastModifiedTimestamp: null,
  lastActionPerformed: null,
};

export const obj2 = {
  interactionLogFirstName: "",
  interactionLogDocId: "",
  firstName: "",
  locationLandmark: "",
  timestampOfInteraction: "",
  helpProvidedCategory: [],
  furtherHelpCategory: [],
  followUpTimestamp: "",
  additionalDetails: "",
  isPublic: true,
  status: "pending",
  lastModifiedTimestamp: null,
  lastActionPerformed: null,
  completedTimestamp: "",
  isCompleted: false,
};

function InteractionLogForm() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  // const [interactions, setInteractions] = useState([1]); //Needed
  const [provideInteractionDetail, setProvideInteractionDetail] = //Needed
    useState("No");
  const [emptyError, setEmptyError] = useState(false);
  const [errors, setErrors] = useState({
    numberHelpedError: "",
    cityError: "",
    stateError: "",
    checkboxesError: "",
    itemQtyError: "",
    dateError: "",
    timeError: "",
    dateTimeError: "",
    optDescError: "",
    optLandmarkError: "",
    infoShareCheckboxError: "",
    idError: "",
    streetError: "",
    zipError: "",
  });
  const dynamicRef = useRef();
  const generalInfoRef = useRef();

  //   const { id } = useParams();

  /* Firebase */

  const handleSubmmit = async () => {
    let interactionLogData, helpRequestData;
    let interactionLogDocId = "";
    let interactionLogFirstName = "";
    let helpRequestDocIds = [];
    // console.log("interactionLog_collection:", interactionLog_collection);
    // console.log("helpRequest_collection:", helpRequest_collection);

    try {
      //---- Form Validation Starts -----
      //Checking if with no interactionData is GeneralInfo Empty?
      if (provideInteractionDetail === "No") {
        if (generalInfoRef.current.checkIsEmpty()) {
          setEmptyError(true);
          return;
        } else {
          interactionLogData = generalInfoRef.current.getGeneralInfoData(); // get data if its not empty
        }
      }

      // Checking if with interactionData, are GeneralInfo and DynamicSubsection both Empty?
      if (
        generalInfoRef.current.checkIsEmpty() &&
        provideInteractionDetail == "Yes" &&
        dynamicRef.current.checkIsEmpty()
      ) {
        // console.log("Form is Empty.");
        setEmptyError(true);
        //Here add stuff to notify user/ setErrorState
        return;
      }
      interactionLogData = generalInfoRef.current.getGeneralInfoData(); // get data if not got it previously.
      if (provideInteractionDetail == "Yes") {
        if (dynamicRef.current.checkIsEmpty()) {
          setEmptyError(true);
          return;
        }
        helpRequestData = dynamicRef.current.getHelpRequestData(); //get HelpRequest Data from the component.
      }

      setEmptyError(false);

      //---- Form Validation Ends -----

      // STEP 1: Augment interactionLogData

      if (!generalInfoRef.current.checkIsEmpty()) {
        // Checking here if user has changed anything at all in GeneralInfoForm Data
        const nativeStartDate =
          interactionLogData.startTimestamp?.toDate?.() ?? new Date();
        const nativeEndDate =
          interactionLogData.endTimestamp?.toDate?.() ?? new Date();
        const nativeDate =
          interactionLogData.interactionDate?.toDate?.() ?? new Date();

        const augmentedInteractionLog = {
          ...interactionLogData,
          outreachId: "",
          lastActionPerformed: null,
          lastModifiedTimestamp: Timestamp.now(),
          isPublic: isPublic,
          helpRequestCount: null,
          startTimestamp: Timestamp.fromDate(nativeStartDate), //nativeStartDate
          endTimestamp: Timestamp.fromDate(nativeEndDate), //nativeEndDate
          interactionDate: Timestamp.fromDate(nativeDate), //nativeDate
        };
        // console.log(
        //   "InteractionLog Data just before send:",
        //   augmentedInteractionLog
        // );
        //Handle if the individual interaction is empty should not throw error.

        // STEP 2: Add to interactionLog collection
        const interactionLogRef = await addDoc(
          collection(db, interactionLog_collection),
          augmentedInteractionLog
        );

        interactionLogDocId = interactionLogRef.id;
        interactionLogFirstName = augmentedInteractionLog.firstName;
      } else {
        // console.log("Same");
      }

      // STEP 3: Add each helpRequest entry individually

      if (provideInteractionDetail === "Yes") {
        const helpRequestDataWithoutKeys = helpRequestData;
        // console.log("HelpRequestData:", helpRequestData);
        // console.log("HelpRequestDataWihoutKeys:", helpRequestDataWithoutKeys);
        helpRequestDocIds = [];

        const enrichedHelpEntry = helpRequestDataWithoutKeys.map(
          (helpEntry) => ({
            ...helpEntry,
            interactionLogDocId: interactionLogDocId,
            lastModifiedTimestamp: Timestamp.now(),
            timestampOfInteraction:
              helpEntry.timestampOfInteraction == ""
                ? null
                : Timestamp.fromDate(
                    helpEntry.timestampOfInteraction?.toDate?.() ?? new Date()
                  ),
            followUpTimestamp:
              helpEntry.followUpTimestamp == ""
                ? null
                : Timestamp.fromDate(
                    helpEntry.followUpTimestamp?.toDate?.() ?? new Date()
                  ),
            interactionLogFirstName: interactionLogFirstName,
            isPublic: isPublic,
          })
        );

        // console.log(
        //   "HelpReques Data just Before sending it:",
        //   enrichedHelpEntry
        // );
        for (const entry of enrichedHelpEntry) {
          const helpRef = await addDoc(
            collection(db, helpRequest_collection),
            entry
          );
          helpRequestDocIds.push(helpRef.id);
        }
      }

      if (
        !generalInfoRef.current.checkIsEmpty() &&
        provideInteractionDetail === "Yes"
      ) {
        // STEP 4: Patch helpRequestDocIds into interactionLog entry
        await updateDoc(
          doc(db, interactionLog_collection, interactionLogDocId),
          {
            helpRequestDocIds: helpRequestDocIds,
            helpRequestCount: helpRequestDocIds.length,
          }
        );
      }

      console.log("✅ Submission complete");
      setSuccess(true);
    } catch (error) {
      console.error("❌ Submission failed:", error);
    }
  };
  //use For debugging
  // useEffect(() => {
  //   // console.log("interactionLogData:", interactionLogData);
  //   // console.log("HelpRequest:", helpRequestData);
  //   // console.log("currentUserId", fAuth?.currentUser?.id);
  // }, [interactionLogData, helpRequestData]);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-[930px] mx-2    mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black ">
          <div className="items-center justify-center  h-full w-full mx-auto rounded-2xl ">
            {/*  */}
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
            {/*  */}
            <div className="w-fit h-fit md:px-[108px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-4 md:gap-16 flex px-4 py-4 md:px-0 md:py-0">
                <div className="w-fit text-neutral-800 md:text-[57px] font-medium font-bricolage md:leading-[64px] text-[32px] leading-[40px]">
                  Thanks for helping out!
                </div>
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[24px] flex">
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    <div className="self-stretch text-neutral-800 text-[14px] font-[400] leading-[22px] tracking-[0%] font-dm-sans">
                      Each entry helps us understand community needs better.
                      It’s really helpful if you can document interactions with
                      each homeless person you meet—just a quick log per person
                      goes a long way in helping us better understand community
                      needs.
                    </div>

                    <GeneralInfoForm ref={generalInfoRef} />
                  </div>

                  <div className="mb-6">
                    <div className="text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]">
                      Would you like to provide details for each person you
                      supported?
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-[14px] font-[500] font-dm-sans text-zinc-700">
                        <input
                          type="radio"
                          name="genericQuestion"
                          value={"Yes"}
                          className="accent-black"
                          checked={provideInteractionDetail === "Yes"}
                          onChange={(e) =>
                            setProvideInteractionDetail(e.target.value)
                          }
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-[14px] font-[500] font-dm-sans text-zinc-700">
                        <input
                          type="radio"
                          name="genericQuestion"
                          value={"No"}
                          className="accent-black"
                          checked={provideInteractionDetail === "No"}
                          onChange={(e) =>
                            setProvideInteractionDetail(e.target.value)
                          }
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Dynamic Form Section Here */}
                  {/*Help Requested Form Here*/}
                  {provideInteractionDetail === "Yes" && (
                    <>
                      <DynamicSubSection ref={dynamicRef} />{" "}
                    </>
                  )}

                  {/* Toggle public form */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={isPublic}
                      onChange={() => setIsPublic((prev) => !prev)}
                      className="w-[18px] h-[18px] bg-violet-700 rounded-sm cursor-pointer mt-[2px]"
                    />
                    <span className="ml-2 font-dm-sans text-[12px] leading-[18px]">
                      By selecting this checkbox, I consent to sharing my
                      contact details and event address publicly on this
                      platform / community space to facilitate participation in
                      the outreach event. I understand that this information
                      will be visible to others and acknowledge the associated
                      privacy considerations.
                    </span>
                  </div>
                </div>

                {/* Toggle public form end */}
                <div className="justify-start items-start gap-4 inline-flex flex-col">
                  {emptyError && (
                    <div className="text-red-500 text-sm font-medium -mt-5">
                      Please fill out the Form, Entire Form cannot be empty.
                    </div>
                  )}
                  <div className="justify-start items-start gap-4 flex">
                    <CustomButton
                      label="Submit"
                      name="buttondefault"
                      onClick={handleSubmmit}
                    />
                  </div>
                </div>
                {/*  */}
                {success && <ConfirmationModalInteractionLog isOpen={true} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractionLogForm;
