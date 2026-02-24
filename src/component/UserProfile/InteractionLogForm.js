import { useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

import CustomButton from "../Buttons/CustomButton";
import GeneralInfoForm from "./GeneralInfoForm";
import DynamicSubSection from "../FormBuilder/DynamicSubsection";
import collectionMapping from "../../utils/firestoreCollections";
import ConfirmationModalInteractionLog from "./ConfirmationModalInteractionLog";

const interactionLog_collection = collectionMapping.interactionLog;
const helpRequest_collection = collectionMapping.helpRequestsInteractionLog;

function InteractionLogForm() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [provideInteractionDetail, setProvideInteractionDetail] = useState("No");
  const [emptyError, setEmptyError] = useState(false);

  const dynamicRef = useRef(null);
  const generalInfoRef = useRef(null);

  const handleSubmmit = async () => {
    let interactionLogData, helpRequestData;
    let interactionLogDocId = "";
    let interactionLogFirstName = "";
    let helpRequestDocIds = [];

    try {
      // ---- Form Validation Starts ----
      if (provideInteractionDetail === "No") {
        if (generalInfoRef.current?.checkIsEmpty?.()) {
          setEmptyError(true);
          return;
        } else {
          interactionLogData = generalInfoRef.current?.getGeneralInfoData?.();
        }
      }

      if (
        generalInfoRef.current?.checkIsEmpty?.() &&
        provideInteractionDetail === "Yes" &&
        dynamicRef.current?.checkIsEmpty?.()
      ) {
        setEmptyError(true);
        return;
      }

      interactionLogData = generalInfoRef.current?.getGeneralInfoData?.();

      if (provideInteractionDetail === "Yes") {
        if (dynamicRef.current?.checkIsEmpty?.()) {
          setEmptyError(true);
          return;
        }
        helpRequestData = dynamicRef.current?.getHelpRequestData?.();
      }

      setEmptyError(false);
      // ---- Form Validation Ends ----

      // STEP 1: Augment interactionLogData and write InteractionLog
      if (!generalInfoRef.current?.checkIsEmpty?.()) {
        const nativeStartDate =
          interactionLogData?.startTimestamp?.toDate?.() ?? new Date();
        const nativeEndDate =
          interactionLogData?.endTimestamp?.toDate?.() ?? new Date();
        const nativeDate =
          interactionLogData?.interactionDate?.toDate?.() ?? new Date();

        const augmentedInteractionLog = {
          ...interactionLogData,
          outreachId: "",
          lastActionPerformed: null,
          lastModifiedTimestamp: Timestamp.now(),
          isPublic,
          helpRequestCount: null,
          startTimestamp: Timestamp.fromDate(nativeStartDate),
          endTimestamp: Timestamp.fromDate(nativeEndDate),
          interactionDate: Timestamp.fromDate(nativeDate),
        };

        const interactionLogRef = await addDoc(
          collection(db, interactionLog_collection),
          augmentedInteractionLog
        );

        interactionLogDocId = interactionLogRef.id;
        interactionLogFirstName = augmentedInteractionLog.firstName;
      }

      // STEP 2: Add each helpRequest entry individually
      if (provideInteractionDetail === "Yes") {
        const helpRequestDataWithoutKeys = helpRequestData || [];
        helpRequestDocIds = [];

        const enrichedHelpEntry = helpRequestDataWithoutKeys.map((helpEntry) => ({
          ...helpEntry,
          interactionLogDocId,
          lastModifiedTimestamp: Timestamp.now(),
          timestampOfInteraction:
            helpEntry.timestampOfInteraction === ""
              ? null
              : Timestamp.fromDate(
                  helpEntry.timestampOfInteraction?.toDate?.() ?? new Date()
                ),
          followUpTimestamp:
            helpEntry.followUpTimestamp === ""
              ? null
              : Timestamp.fromDate(
                  helpEntry.followUpTimestamp?.toDate?.() ?? new Date()
                ),
          interactionLogFirstName,
          isPublic,
        }));

        for (const entry of enrichedHelpEntry) {
          const helpRef = await addDoc(
            collection(db, helpRequest_collection),
            entry
          );
          helpRequestDocIds.push(helpRef.id);
        }
      }

      // STEP 3: Patch helpRequestDocIds into interactionLog entry
      if (
        !generalInfoRef.current?.checkIsEmpty?.() &&
        provideInteractionDetail === "Yes"
      ) {
        await updateDoc(doc(db, interactionLog_collection, interactionLogDocId), {
          helpRequestDocIds,
          helpRequestCount: helpRequestDocIds.length,
        });
      }

      console.log("✅ Submission complete");
      setSuccess(true);
    } catch (error) {
      console.error("❌ Submission failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      {/* Keep content centered but allow full width on mobile */}
      <div className="relative flex w-full flex-col items-stretch">
        {/* Card wrapper: full width on mobile, capped and centered on md+ */}
        <div className="w-full px-2 sm:px-4 mt-32 sm:mt-36 md:mt-48 mb-16">
          <div className="w-full max-w-[930px] mx-auto rounded-2xl bg-[#F8F9F0] text-black">
            {/* Inner container: remove w-fit so it can stretch */}
            <div className="relative w-full rounded-2xl">
              {/* Back button */}
              <div
                className="absolute -top-12 left-0 flex items-center cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <IoIosArrowBack className="w-6 h-6" />
                <p className="ml-1 font-bricolage text-xl font-bold leading-7">
                  Return to Profile
                </p>
              </div>

              {/* Content padding: full width on mobile, spacious on desktop */}
              <div className="w-full px-4 py-6 sm:px-6 md:px-[108px] md:py-[100px]">
                <div className="flex w-full flex-col gap-4 md:gap-16">
                  {/* Title should wrap and not force fit-width */}
                  <div className="w-full text-neutral-800 text-[32px] leading-[40px] md:text-[57px] md:leading-[64px] font-medium font-bricolage">
                    Thanks for helping out!
                  </div>

                  <div className="flex w-full flex-col gap-6">
                    <div className="text-neutral-800 text-[14px] font-[400] leading-[22px] tracking-[0%] font-dm-sans">
                      Each entry helps us understand community needs better. It’s
                      really helpful if you can document interactions with each
                      homeless person you meet—just a quick log per person goes a
                      long way in helping us better understand community needs.
                    </div>

                    <GeneralInfoForm ref={generalInfoRef} />

                    <div className="mb-6">
                      <div className="text-zinc-700 text-[14px] font-[500] leading-[20px] tracking-[0%] font-dm-sans mb-[9px]">
                        Would you like to provide details for each person you supported?
                      </div>

                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-[14px] font-[500] font-dm-sans text-zinc-700">
                          <input
                            type="radio"
                            name="genericQuestion"
                            value="Yes"
                            className="accent-black"
                            checked={provideInteractionDetail === "Yes"}
                            onChange={(e) => setProvideInteractionDetail(e.target.value)}
                          />
                          Yes
                        </label>

                        <label className="flex items-center gap-2 text-[14px] font-[500] font-dm-sans text-zinc-700">
                          <input
                            type="radio"
                            name="genericQuestion"
                            value="No"
                            className="accent-black"
                            checked={provideInteractionDetail === "No"}
                            onChange={(e) => setProvideInteractionDetail(e.target.value)}
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {provideInteractionDetail === "Yes" && (
                      <DynamicSubSection ref={dynamicRef} />
                    )}

                    {/* Public toggle */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={isPublic}
                        onChange={() => setIsPublic((prev) => !prev)}
                        className="mt-[2px] h-[18px] w-[18px] cursor-pointer rounded-sm bg-violet-700"
                      />
                      <span className="ml-2 font-dm-sans text-[12px] leading-[18px]">
                        By selecting this checkbox, I consent to sharing my contact
                        details and event address publicly on this platform / community
                        space to facilitate participation in the outreach event. I
                        understand that this information will be visible to others and
                        acknowledge the associated privacy considerations.
                      </span>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-3">
                      {emptyError && (
                        <div className="text-red-500 text-sm font-medium">
                          Please fill out the Form, Entire Form cannot be empty.
                        </div>
                      )}

                      <div className="flex">
                        <CustomButton
                          label="Submit"
                          name="buttondefault"
                          onClick={handleSubmmit}
                        />
                      </div>
                    </div>

                    {success && <ConfirmationModalInteractionLog isOpen={true} />}
                  </div>
                </div>
              </div>
              {/* End inner */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractionLogForm;
