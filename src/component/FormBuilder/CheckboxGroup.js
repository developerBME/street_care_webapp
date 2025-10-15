import { useState, useRef, useEffect } from "react";
import Checkbox from "./Checkbox";
import InputLabel from "../Inputs/InputLabel";
import TextInput from "../Inputs/TextInput";

// Here we should have the CheckBox group layout with validation and error handling.
// Need to uplift the info of the checkboxGroup to the parent component
// Need to collect all the selections and send them up to the parent for collection

const CheckboxGroup = ({
  error,
  errorImg,
  onUpdate = () => {},
  groupkey,
  interaction = 0,
}) => {
  const [checkboxItems, setCheckboxItems] = useState([]);
  const options = [
    "Food and Drink",
    "Clothing",
    "Hygiene Products",
    "Wellness/ Emotional Support",
    "Medical Help",
    "Social Worker/ Psychiatrist",
    "Legal/Lawyer",
    "Other",
  ];
  const handleCheckboxItems = (e) => {
    setCheckboxItems((prev) =>
      // if checkbox is checked add its value to the checkboxItems array else remove that particular value if present
      e.target.checked
        ? [...prev, e.target.value]
        : prev.filter((item) => item !== e.target.value)
    );
  };

  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [otherHelp, setOtherHelp] = useState("");

  useEffect(() => {
    //console.log(checkboxItems); // For checking if it actually works
    onUpdate([...checkboxItems]);
  }, [checkboxItems]);

  useEffect(() => {
    if (!isOtherChecked) {
      setOtherHelp("");
      const filteredItems = checkboxItems.filter((item) =>
        options.includes(item)
      );
      setCheckboxItems(filteredItems);
    } else {
      setCheckboxItems((prev) => {
        const filtered = prev.filter((item) => options.includes(item));
        return otherHelp ? [...filtered, otherHelp] : filtered;
      });
    }
  }, [isOtherChecked, otherHelp]);

  return (
    <>
      {/* Grid Start */}
      <div className="self-stretch w-full h-fit grid md:grid-cols-4 grid-cols-2 gap-2 ">
        {options.map((option, index) => {
          return (
            <Checkbox
              key={index}
              name={option}
              index={index}
              groupkey={groupkey}
              interaction={interaction}
              SetIsOtherChecked={setIsOtherChecked}
              callbackFn={handleCheckboxItems}
            />
          );
        })}
      </div>
      {/* Error rendering Here */}
      {error?.checkboxesError && (
        <div className="inline-flex items-center">
          <img alt="" src={errorImg} className="w-3 h-3" />
          <p className="text-red-600 text-xs ml-1">{error.checkboxesError}</p>
        </div>
      )}
      {/* If other checkbox is checked conditionally render input field Other to type out
      {/* Check other option */}
      {/* //Make Sure Other Checkbox is always at Last since input for Other would always render after the last Checkbox. */}
      {isOtherChecked && (
        <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
          {/* ToDo Add Logic to give Error is Other is checked but input is not filled. */}
          <TextInput
            type="full-single-text-input"
            label="Other"
            placeholder="Kind of Help"
            value={otherHelp}
            onChange={(e) => setOtherHelp(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default CheckboxGroup;
