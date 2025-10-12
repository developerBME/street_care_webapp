import { useState, useEffect, useRef } from "react";
import CheckboxGroup from "./CheckboxGroup";
import StaticSubsection from "./StaticSubsection";

const DynamicSubSection = ({
  interactionsSetterArray,
  onUpdate = () => {},
}) => {
  const [interactions, setInteractions] = useState({});
  const pullData = (dataObj) => {
    const [key] = Object.keys(dataObj);
    const value = dataObj[key];
    setInteractions((prev) => ({ ...prev, [key]: value })); //This Fn sets the respective interaction number with its interaction details.Basically pulls the respective interaction data from interaction number/child component(StaticSubSection) into this component(DynamicSubsection).
  };

  // TODO: Add handleCancel Logic here
  // const handleCancel = (key) => {
  //   console.log("Key", key);
  //   console.log(typeof key);
  //   interactionsSetterArray.pop();
  //   console.log(interactionsSetterArray);
  //   setInteractions((prev) => {
  //     const updated = { ...prev };

  //     // Clear the current key
  //     updated[key] = {};

  //     // Shift values from key+1 onward
  //     let current = key;
  //     while (updated[current + 1] !== undefined) {
  //       updated[current] = updated[current + 1];
  //       current++;
  //     }

  //     // Remove the last key
  //     delete updated[current];
  //     console.log(updated);

  //     return updated;
  //   });
  // };

  useEffect(() => {
    // console.log("Interactions:", interactions);
    onUpdate(interactions);
  }, [interactions, interactionsSetterArray]);
  // need to have a static Subsection
  return (
    <>
      {interactionsSetterArray.map((interactionNumber, index) => {
        return (
          <StaticSubsection
            key={index}
            index={index}
            interaction={interactionNumber}
            onUpdate={pullData}
            // handleCancel={handleCancel}
          />
        );
      })}
    </>
  );
};

export default DynamicSubSection;
