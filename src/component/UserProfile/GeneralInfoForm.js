import { useState, useEffect, useRef } from "react";
import CheckboxGroup from "../FormBuilder/CheckboxGroup";
import TextInput from "../Inputs/TextInput";
import InlineWrapper from "../Inputs/InlineWrapper";
import InputLabel from "../Inputs/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import AddressAutofill from "../FormBuilder/AddressAutofill";

// Utility function to get current timezone abbreviation
const getCurrentTimezone = () => {
  return new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value || "";
};

export default function GeneralInfoForm({ onUpdate = () => {} }) {
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

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [generalInfoData, setGeneralInfoData] = useState({
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
  });

  const mergeDateTime = (startTime, endTime, interactionDate) => {
    if (!startTime || !endTime || !interactionDate) return;

    const date = dayjs(interactionDate); // ensure it's a Day.js object

    const mergedDateStartTime = date
      .hour(dayjs(startTime, "hh:mm A").hour())
      .minute(dayjs(startTime, "hh:mm A").minute())
      .second(0);

    const mergedDateEndTime = date
      .hour(dayjs(endTime, "hh:mm A").hour())
      .minute(dayjs(endTime, "hh:mm A").minute())
      .second(0);

    console.log(mergedDateEndTime, mergedDateStartTime);
    setGeneralInfoData((prev) => ({
      ...prev,
      startTimestamp: mergedDateStartTime,
      endTimestamp: mergedDateEndTime,
    }));
  };

  const handleAddressChange = (addressData) => {
    setGeneralInfoData((prev) => ({
      ...prev,
      ...addressData,
    }));
  };

  useEffect(() => {
    onUpdate(generalInfoData);
  }, [generalInfoData]);

  return (
    <>
      <InlineWrapper>
        <TextInput
          type="full-single-text-input"
          label="First Name"
          placeholder="John"
          onChange={(e) => {
            setGeneralInfoData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }));
          }}
          value={generalInfoData.firstName}
        />

        <TextInput
          type="full-single-text-input"
          label="Last Name"
          placeholder="Doe"
          onChange={(e) => {
            setGeneralInfoData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }));
          }}
          value={generalInfoData.lastName}
        />
      </InlineWrapper>

      <InlineWrapper>
        <TextInput
          type="full-single-text-input"
          label="Email"
          placeholder="vinayakkiranji@brightmindenrichment.org"
          onChange={(e) => {
            setGeneralInfoData((prev) => ({ ...prev, email: e.target.value }));
          }}
          value={generalInfoData.email}
        />

        <TextInput
          type="full-single-text-input"
          label="Phone Number"
          placeholder="+1((123)-34-1234"
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 10 && /^\d*$/.test(value)) {
              //Only allow nums and less than 10 digits
              setGeneralInfoData((prev) => ({ ...prev, phoneNumber: value }));
            }
          }}
          value={generalInfoData.phoneNumber}
        />
      </InlineWrapper>

      <InlineWrapper>
        <InputLabel label={`Date (${getCurrentTimezone()})`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={generalInfoData.interactionDate}
              onChange={(newValue) => {
                setGeneralInfoData((prev) => ({
                  ...prev,
                  interactionDate: newValue,
                }));
                mergeDateTime(
                  startTime,
                  endTime,
                  generalInfoData.interactionDate
                );
              }}
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
      </InlineWrapper>

      <InlineWrapper>
        <InputLabel label={`Start Time (${getCurrentTimezone()})`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={
                startTime
                  ? dayjs(startTime, "hh:mm A") //Converts dayjs object to string value
                  : null
              }
              onChange={(newValue) => {
                const formatted = newValue?.format("hh:mm:A");
                setStartTime(formatted);
                mergeDateTime(
                  formatted,
                  endTime,
                  generalInfoData.interactionDate
                );
              }}
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
                  placeholder: "hh:mm:aa",
                  label: "",
                  InputLabelProps: { shrink: false },
                  sx: sxTheme,
                },
              }}
            />
          </LocalizationProvider>
        </InputLabel>

        <InputLabel label={`End Time (${getCurrentTimezone()})`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={
                endTime
                  ? dayjs(endTime, "hh:mm A") //Converts dayjs object to string value
                  : null
              }
              onChange={(newValue) => {
                const formatted = newValue?.format("hh:mm:A");
                setEndTime(formatted);
                mergeDateTime(
                  startTime,
                  formatted,
                  generalInfoData.interactionDate
                );
              }}
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
                  placeholder: "hh:mm:aa",
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
          label="What kind of support did you provide?"
          className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7"
        />

        <CheckboxGroup
          groupkey={"support-provided"}
          onUpdate={(array) => {
            setGeneralInfoData((prev) => ({
              ...prev,
              listOfSupportsProvided: array,
            }));
          }}
        />
      </div>

      <TextInput
        type="full-single-text-input"
        label="Number of people helped"
        placeholder="e.g. 1"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 10 && /^\d*$/.test(value)) {
            setGeneralInfoData((prev) => ({
              ...prev,
              numPeopleHelped: Number(value),
            }));
          }
        }}
        value={generalInfoData.numPeopleHelped}
      />

      <TextInput
        type="full-single-text-input"
        label="Number of care packages given out"
        placeholder="e.g. 1"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 10 && /^\d*$/.test(value)) {
            setGeneralInfoData((prev) => ({
              ...prev,
              carePackagesDistributed: Number(value),
            }));
          }
        }}
        value={generalInfoData.carePackagesDistributed}
      />

      <TextInput
        type="full-single-text-input"
        label="What items were included in the care package?"
        placeholder="e.g. Blankets, Socks"
        onChange={(e) => {
          setGeneralInfoData((prev) => ({
            ...prev,
            carePackageContents: e.target.value,
          }));
        }}
        value={
          generalInfoData.carePackageContents
            ? generalInfoData.carePackageContents
            : ""
        }
      />

      <TextInput
        type="full-single-text-input"
        label="How many people joined you?"
        placeholder="e.g. 1"
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 10 && /^\d*$/.test(value)) {
            setGeneralInfoData((prev) => ({
              ...prev,
              numPeopleJoined: Number(value),
            }));
          }
        }}
        value={generalInfoData.numPeopleJoined}
      />

      <InputLabel
        label="Location"
        className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7"
      />

      <AddressAutofill onAddressChange={handleAddressChange} />
    </>
  );
}
