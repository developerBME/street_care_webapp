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

  //TODO: Also implement Remove Fn for Interactions including removing the respective data from the field

  useEffect(() => {
    console.log("Interactions:", interactions);
    onUpdate(interactions);
  }, [interactions]);
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
          />
        );
      })}
    </>
  );
};

export default DynamicSubSection;
