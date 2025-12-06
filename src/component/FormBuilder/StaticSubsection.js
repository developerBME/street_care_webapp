import { useState, useEffect } from "react";
import CheckboxGroup from "./CheckboxGroup";
import TextInput from "../Inputs/TextInput";
import InlineWrapper from "../Inputs/InlineWrapper";
import InputLabel from "../Inputs/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

const sxTheme = {
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e5e7eb", // base border
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e5e7eb !important", // disables hover highlight
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black !important", // force black on focus
    },
    "&.Mui-focused": {
      color: "black", // optional: input text color on focus
    },
  },
};

const StaticSubsection = ({ index, interaction, onUpdate, handleRemove }) => {
  const [selectedDate, setSelectedDate] = useState(null); //For FollowUp Date
  const [selectedTime, setSelectedTime] = useState(null); //For Followup Time
  const [interactionData, setInteractionData] = useState({
    interactionLogFirstName:
      interaction.formData?.interactionLogFirstName || "",
    interactionLogDocId: interaction.formData?.interactionLogDocId || "",
    firstName: interaction.formData?.firstName || "",
    locationLandmark: interaction.formData?.locationLandmark || "",
    timestampOfInteraction: interaction.formData?.timestampOfInteraction || "",
    helpProvidedCategory: interaction.formData?.helpProvidedCategory || [],
    furtherHelpCategory: interaction.formData?.furtherHelpCategory || [],
    followUpTimestamp: interaction.formData?.followUpTimestamp || "",
    additionalDetails: interaction.formData?.additionalDetails || "",
    isPublic: interaction.formData?.isPublic ?? true,
    status: interaction.formData?.status || "pending",
    lastModifiedTimestamp: interaction.formData?.lastModifiedTimestamp ?? null,
    lastActionPerformed: interaction.formData?.lastActionPerformed ?? null,
    completedTimestamp: interaction.formData?.completedTimestamp || "",
    isCompleted: interaction.formData?.isCompleted ?? false,
  }); // Centrailized State for easier and manageable state upliftment
  const handleDateTimeMerge = (selectedDate, selectedTime) => {
    // // merges the FollowUp Date and FollowUp Time
    if (!selectedDate || !selectedTime) return;
    const merged = selectedDate
      .hour(selectedTime.hour())
      .minute(selectedTime.minute())
      .second(selectedTime.second());
    setInteractionData((prev) => ({
      ...prev,
      followUpTimestamp: dayjs(merged, "YYYY-MM-DD hh:mm:A"),
    }));
  };
  useEffect(() => {
    // console.log(`Date:`, selectedDate);
    // console.log(`Time:`, selectedTime);
    // console.log(`InteractionData ${interaction} Updated:`, interactionData);
    onUpdate({
      id: interaction.id,
      formData: interactionData,
      errors: interaction.errors,
    }); //This Function uplifts the data from this component to its parent component essentially making all Individual Interactions Data available to a single obj like key:value pairs.
    //e.g. {1:{firstName:John,dateOfInteraction:xyz},2:{firstName:Adam,dateOfInteraction:abc}}
  }, [interactionData]);

  return (
    <>
      <div className="w-full flex items-center justify-between mb-4 px-4 py-2 bg-gray-50 rounded-md border border-gray-200">
        <div className="text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
          Individual Interaction {index + 1}
        </div>
        {index !== 0 && (
          <button
            type="button"
            className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded transition duration-150 ease-in-out hover:bg-red-600 hover:text-white"
            onClick={() => {
              handleRemove(interaction.id);
            }}
          >
            Remove
          </button>
        )}
      </div>

      <TextInput
        type="full-single-text-input"
        label="First Name"
        placeholder="John"
        value={interactionData.firstName}
        onChange={(e) =>
          setInteractionData((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
        // required={true}
      />

      <InlineWrapper>
        {/* Used to wrap 2 text inputs into a single row */}
        <TextInput
          type="full-single-text-input"
          label="Location or Landmark"
          placeholder="Brooklyn"
          value={interactionData.locationLandmark}
          onChange={(e) =>
            setInteractionData((prev) => ({
              ...prev,
              locationLandmark: e.target.value,
            }))
          }
        />

        <InputLabel label="Time">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={
                interactionData.timestampOfInteraction
                  ? dayjs(interactionData.timestampOfInteraction, "hh:mm A") //Converts dayjs object to string value
                  : null
              }
              onChange={(newValue) =>
                setInteractionData((prev) => ({
                  ...prev,
                  timestampOfInteraction: newValue?.format("hh:mm:A") || "", //This returns only the date from the daysjs obj
                }))
              }
              variant="desktop"
              views={["hours", "minutes"]}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: false,
                  placeholder: "hh:mm",
                  label: "",
                  InputLabelProps: { shrink: false },
                  sx: sxTheme,
                },
              }}
            />
          </LocalizationProvider>
        </InputLabel>
      </InlineWrapper>

      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
        <InputLabel
          label="What kind of help was provided?"
          className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7"
        />

        <CheckboxGroup
          groupkey={"provided"}
          onUpdate={(array) => {
            setInteractionData((prev) => ({
              ...prev,
              helpProvidedCategory: array,
            }));
          }}
          interaction={interaction.id}
        />
      </div>

      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
        <InputLabel
          label="What kind of further help is needed?"
          className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7"
        />

        <CheckboxGroup
          groupkey={"need"}
          onUpdate={(array) => {
            setInteractionData((prev) => ({
              ...prev,
              furtherHelpCategory: array,
            }));
          }}
          interaction={interaction.id}
        />
      </div>
      {/* Inline Wrapper wraps 2 text inputs to render inline next to each other */}
      <InlineWrapper>
        <InputLabel label="Follow-up Date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
                handleDateTimeMerge(newValue, selectedTime);
              }}
              minDate={dayjs().startOf("day")}
              slotProps={{
                textField: {
                  required: false,
                  fullWidth: true,
                  variant: "outlined",
                  sx: sxTheme,
                },
              }}
            />
          </LocalizationProvider>
        </InputLabel>

        <InputLabel label="Follow-up Time">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newValue) => {
                setSelectedTime(newValue);
                handleDateTimeMerge(selectedDate, newValue);
              }}
              variant="desktop"
              views={["hours", "minutes"]}
              minTime={dayjs().hour(9).minute(0)} // ⏰ Earliest selectable time: 9:00 AM
              maxTime={dayjs().hour(19).minute(0)} // ⏰ Latest selectable time: 7:00 PM
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: false,
                  placeholder: "hh:mm",
                  label: "",
                  InputLabelProps: { shrink: false },
                  sx: sxTheme,
                },
              }}
            />
          </LocalizationProvider>
        </InputLabel>
      </InlineWrapper>

      <TextInput
        type="full-single-text-input"
        label="Any Additional Details"
        placeholder="eg.notes about interaction"
        onChange={(e) =>
          setInteractionData((prev) => ({
            ...prev,
            additionalDetails: e.target.value,
          }))
        }
      />
    </>
  );
};

export default StaticSubsection;
