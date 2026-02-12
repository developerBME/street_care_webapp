import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import collectionMapping from "../../utils/firestoreCollections";
import DynamicSubSection from "../FormBuilder/DynamicSubsection";
import CustomButton from "../Buttons/CustomButton";

const helpRequest_collection = collectionMapping.helpRequestsInteractionLog;

const hasHelpRequestInput = (entry = {}) => {
  const hasText = [
    entry?.firstName,
    entry?.locationLandmark,
    entry?.timestampOfInteraction,
    entry?.additionalDetails,
  ].some((value) => String(value || "").trim() !== "");

  const hasSelections =
    (entry?.helpProvidedCategory || []).length > 0 ||
    (entry?.furtherHelpCategory || []).length > 0;

  const hasFollowUpDate = Boolean(entry?.followUpTimestamp);

  return hasText || hasSelections || hasFollowUpDate;
};

const toFirestoreTimestamp = (value) => {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    const date = value.toDate();
    if (date instanceof Date && !isNaN(date.getTime())) {
      return Timestamp.fromDate(date);
    }
  }

  if (value instanceof Date && !isNaN(value.getTime())) {
    return Timestamp.fromDate(value);
  }

  return null;
};

function HelpRequestForm() {
  const navigate = useNavigate();
  const dynamicRef = useRef();
  const [isPublic, setIsPublic] = useState(true);
  const [emptyError, setEmptyError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const helpRequestData = dynamicRef.current?.getHelpRequestData?.() || [];
    const filledRequests = helpRequestData.filter(hasHelpRequestInput);

    if (filledRequests.length === 0) {
      setEmptyError(true);
      setSubmitError("");
      return;
    }

    setEmptyError(false);
    setSubmitError("");
    setIsSubmitting(true);

    try {
      for (const entry of filledRequests) {
        await addDoc(collection(db, helpRequest_collection), {
          interactionLogFirstName: "",
          interactionLogDocId: "",
          firstName: entry?.firstName || "",
          locationLandmark: entry?.locationLandmark || "",
          timestampOfInteraction: entry?.timestampOfInteraction || "",
          helpProvidedCategory: entry?.helpProvidedCategory || [],
          furtherHelpCategory: entry?.furtherHelpCategory || [],
          followUpTimestamp: toFirestoreTimestamp(entry?.followUpTimestamp),
          additionalDetails: entry?.additionalDetails || "",
          isPublic: isPublic,
          status: "pending",
          lastModifiedTimestamp: Timestamp.now(),
          lastActionPerformed: null,
          completedTimestamp: null,
          isCompleted: false,
        });
      }

      setSuccess(true);
    } catch (error) {
      setSubmitError("Could not submit help request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="w-fit md:w-[930px] mx-2 mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black">
          <div className="items-center justify-center h-full w-full mx-auto rounded-2xl">
            <div
              className="absolute flex mt-[-50px] items-center cursor-pointer"
              onClick={() => {
                navigate("/allHelpRequests");
              }}
            >
              <IoIosArrowBack className="w-6 h-6" />
              <p className="font-bricolage text-xl font-bold leading-7">
                Return to Help Requests
              </p>
            </div>

            <div className="w-fit h-fit md:px-[108px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-6 md:gap-10 flex px-4 py-4 md:px-0 md:py-0">
                <div className="w-fit text-neutral-800 md:text-[57px] font-medium font-bricolage md:leading-[64px] text-[32px] leading-[40px]">
                  Create a Help Request
                </div>

                <div className="self-stretch text-neutral-800 text-[14px] font-[400] leading-[22px] tracking-[0%] font-dm-sans">
                  Add details about the person and support needed. This follows
                  the same individual-entry format as interaction logs.
                </div>

                <DynamicSubSection ref={dynamicRef} />

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={() => setIsPublic((prev) => !prev)}
                    className="w-[18px] h-[18px] bg-violet-700 rounded-sm cursor-pointer mt-[2px]"
                  />
                  <span className="ml-2 font-dm-sans text-[12px] leading-[18px]">
                    Make this help request visible to the community.
                  </span>
                </div>

                {emptyError && (
                  <div className="text-red-500 text-sm font-medium">
                    Please fill at least one help request entry before
                    submitting.
                  </div>
                )}

                {submitError && (
                  <div className="text-red-500 text-sm font-medium">
                    {submitError}
                  </div>
                )}

                {success && (
                  <div className="text-green-700 text-sm font-medium">
                    Help request submitted successfully.
                  </div>
                )}

                <div className="justify-start items-start gap-4 flex">
                  <CustomButton
                    label={isSubmitting ? "Submitting..." : "Submit"}
                    name="buttondefault"
                    onClick={handleSubmit}
                  />
                  {success && (
                    <CustomButton
                      label="View Help Requests"
                      name="buttondefault"
                      onClick={() => navigate("/allHelpRequests")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpRequestForm;
