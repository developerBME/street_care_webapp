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
import { fetchUserTypeDetails } from "../EventCardService";
import GeneralInfoForm from "./GeneralInfoForm";
import DynamicSubSection from "../FormBuilder/DynamicSubsection";
import collectionMapping from "../../utils/firestoreCollections";

const users_collection = collectionMapping.users;
const visitLogsBookNew_collection = collectionMapping.visitLogsBookNew;

function InteractionLogForm() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [interactions, setInteractions] = useState([1]); //Needed
  const [provideInteractionDetail, setProvideInteractionDetail] = //Needed
    useState("No");
  const [interactionLogData, setInteractionLogData] = useState();
  const [helpRequestData, setHelpRequestData] = useState();

  const [error, setError] = useState({
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

  //   const { id } = useParams();

  /* Firebase */
  const fAuth = getAuth();

  const handleSubmit = async (e) => {
    let setReturn = false;

    e.preventDefault();

    // Form Validation Start
    // Needed Here

    if (setReturn) {
      return;
    }

    const userDetails = await fetchUserTypeDetails(fAuth.currentUser.uid);

    let obj1 = {
      uid: fAuth.currentUser.uid,
      //Here Goes General INfo Data
    };

    console.log(obj1);
  };

  const clearFields = () => {
    // date.current.value = "";
    //Clear Fields Fn Here
  };

  const handleInteractionLog = (data) => {
    setInteractionLogData(data);
  };

  const handleHelpRequest = (data) => {
    setHelpRequestData(data);
  };

  const handleSubmmit = async () => {
    //PUT InteractionLog

    try {
      // STEP 1: Augment interactionLogData
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
        helpRequestCount: 0,
        startTimestamp: Timestamp.fromDate(nativeStartDate), //nativeStartDate
        endTimestamp: Timestamp.fromDate(nativeEndDate), //nativeEndDate
        interactionDate: Timestamp.fromDate(nativeDate), //nativeDate
      };
      console.log(
        "InteractionLog Data just before send:",
        augmentedInteractionLog
      );

      // STEP 2: Add to interactionLog collection
      const interactionLogRef = await addDoc(
        collection(db, "InteractionLog"),
        augmentedInteractionLog
      );
      const interactionLogDocId = interactionLogRef.id;

      console.log(interactionLogDocId);
      // STEP 3: Add each helpRequest entry individually

      // if(helpRequestData){

      // }
      const helpRequestDataWithoutKeys = Object.values(helpRequestData);
      console.log("HelpRequestData:", helpRequestData);
      console.log("HelpRequestDataWihoutKeys:", helpRequestDataWithoutKeys);
      const helpRequestDocIds = [];

      const enrichedHelpEntry = helpRequestDataWithoutKeys.map((helpEntry) => ({
        ...helpEntry,
        interactionLogDocId: interactionLogDocId,
        lastModifiedTimestamp: Timestamp.now(),
        timestampOfInteraction: Timestamp.fromDate(
          helpEntry.timestampOfInteraction?.toDate?.() ?? new Date()
        ),
        followUpTimestamp: Timestamp.fromDate(
          helpEntry.followUpTimestamp?.toDate?.() ?? new Date()
        ),
        firstName: interactionLogData.firstName,
        isPublic: isPublic,
      }));

      console.log("HelpReques Data just Before sending it:", enrichedHelpEntry);
      for (const entry of enrichedHelpEntry) {
        const helpRef = await addDoc(collection(db, "HelpRequest"), entry);
        helpRequestDocIds.push(helpRef.id);
      }

      // STEP 4: Patch helpRequestDocIds into interactionLog entry
      await updateDoc(doc(db, "InteractionLog", interactionLogDocId), {
        helpRequestDocIds: helpRequestDocIds,
      });

      console.log("✅ Submission complete");
    } catch (error) {
      console.error("❌ Submission failed:", error);
    }
  };

  useEffect(() => {
    // console.log("interactionLogData:", interactionLogData);
    // console.log("HelpRequest:", helpRequestData);
    // console.log("currentUserId", fAuth?.currentUser?.id);
  }, [interactionLogData, helpRequestData]);

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

                    <GeneralInfoForm onUpdate={handleInteractionLog} />
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
                      <div className="flex-col justify-start items-start gap-4 md:gap-5 flex px-4 py-4 md:px-0 md:py-0">
                        <DynamicSubSection
                          interactionsSetterArray={interactions}
                          onUpdate={handleHelpRequest}
                        />{" "}
                        {/*Here Using interactionsSetterArray we manipulate the number of Individual Interactions we want to fill out*/}
                      </div>

                      <div className="flex items-center gap-1">
                        <CustomButton
                          label="Add More"
                          name="buttondefaultinverttransicon"
                          icon={<Plus size={10} strokeWidth={5} />}
                          onClick={() => {
                            setInteractions((prev) => {
                              const last = prev[prev.length - 1];
                              return [...prev, last + 1];
                            });
                          }}
                        />

                        <div className="relative group">
                          <Info size={14} color="#000000" />

                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#D9D9D9] text-black text-[12px] font-[500] px-3 h-[22px] rounded-[10px] whitespace-nowrap z-10 w-fit font-dmSans flex items-center">
                            Clicking this allows repeating the same set of
                            fields for additional individuals.
                          </div>
                        </div>
                      </div>
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
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-start gap-4 flex">
                    <CustomButton
                      label="Submit"
                      name="buttondefault"
                      onClick={handleSubmmit}
                    />
                  </div>
                </div>
                {/*  */}
                {success && <ConfirmationModal isOpen={true} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractionLogForm;
