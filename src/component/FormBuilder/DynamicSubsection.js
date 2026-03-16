import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Info } from "lucide-react";
import CustomButton from "../Buttons/CustomButton";
import StaticSubsection from "./StaticSubsection";
import { areObjectsEqual } from "../../utils/helperFns";
import { obj2 } from "../UserProfile/InteractionLogForm";

const DynamicSubSection = forwardRef(({ onUpdate = () => {} }, ref) => {
  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const [interactions, setInteractions] = useState([
    { id: generateId(), formData: {}, errors: {} },
  ]);
  const pullData = (dataObj) => {
    const id = dataObj.id;
    const formData = dataObj.formData;
    const errors = dataObj.errors;
    // this Fn maps over each interaction and updates it only if its interaction.id matches.
    setInteractions((prev) =>
      prev.map((interaction) =>
        interaction.id === id
          ? {
              id: id,
              formData: formData,
              errors: errors,
            }
          : { ...interaction }
      )
    );
  };

  const handleRemove = (id) => {
    setInteractions((prev) =>
      prev.filter((interaction) => interaction.id !== id)
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      checkIsEmpty() {
        return interactions.some((interaction) =>
          areObjectsEqual(interaction.formData, obj2)
        );
      },
      getHelpRequestData() {
        return interactions.map((interaction) => interaction.formData);
      },
    }),
    [interactions]
  );

  // Use incase of Debugging.
  // useEffect(() => {
  //   console.log("Interactions:", interactions);
  // }, [interactions]);

  return (
    <>
      <div className="flex-col justify-start items-start gap-4 md:gap-5 flex px-4 py-4 md:px-0 md:py-0">
        {interactions.map((interaction, index) => {
          return (
            <StaticSubsection
              key={interaction.id}
              index={index}
              interaction={interaction}
              onUpdate={pullData}
              handleRemove={handleRemove}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        <CustomButton
          label="Click to Add More Interactions"
          name="buttondefaultinverttransicon"
          onClick={() => {
            setInteractions((prev) => [
              ...prev,
              { id: generateId(), formData: {}, errors: {} },
            ]);
          }}
        />

        <div className="relative group">
          <Info size={14} color="#000000" />

          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#D9D9D9] text-black text-[12px] font-[500] px-3 h-[22px] rounded-[10px] whitespace-nowrap z-10 w-fit font-dmSans flex items-center">
            Clicking this allows repeating the same set of fields for additional
            individuals.
          </div>
        </div>
      </div>
    </>
  );
});

export default DynamicSubSection;
