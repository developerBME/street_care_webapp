import React, { useState, useEffect } from "react";
import imgBME from "../../images/imgBME.png";
import CustomButton from "../Buttons/CustomButton";
import { handleRsvp } from "../EventCardService";
import { useNavigate } from "react-router-dom";

{/* Vedant */}
const BMEofficialCard = ({BMEcardData}) => {

  const { id, label, title, eventDate, location, totalSlots, interests, img, nop} = BMEcardData;
  const navigate = useNavigate();
  const [label2, setLabel2] = useState(label);
  return (
    
      <div className=" grow shrink basis-0 bg-sky-100 rounded-3xl flex-col justify-start items-start inline-flex">
        <img className=" self-stretch h-56 rounded-t-3xl" src={img} />
        <div className=" self-stretch px-6 pt-6 pb-3 justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-start gap-px flex">
            <img
              className="w-10 h-10 left-[6.34px] top-[9.19px]"
              src={imgBME}
            />
          </div>
          <div className="text-black text-sm font-normal font-['DM Sans'] leading-snug">
            Bright Mind Official
          </div>
        </div>
        <div className=" h-32 px-6 py-2 flex-col justify-start items-start gap-4 flex">
          <div className=" text-neutral-800 text-2xl font-medium font-['DM Sans'] leading-loose">
            {title}
          </div>
          <div className=" text-cyan-700 text-sm font-medium font-['DM Sans'] leading-tight">
            {eventDate}
          </div>
          <div className=" h-5 flex-col justify-start items-start gap-1 flex">
            <div className=" self-stretch text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">
              {location.street}, {location.city}, {location.state}, {location.zipcode}
            </div>
          </div>
        </div>
        <div className="self-stretch h-20 px-6 pt-4 mt-10 lg:mt-20 xl:mt-0  lg:py-20 xl:py-15 2xl:py-0 2xl:mt-0 flex-col justify-start items-start gap-2.5 flex">
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            {<CustomButton label={label} name="buttonlight" onClick = {(e) => handleRsvp(e, id, label, navigate, label2, setLabel2, true)} />}
            <div className="grow shrink basis-0 text-right text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">
               Open Spots: {totalSlots - nop}/{totalSlots}
            </div>
          </div>
        </div>
      </div>
    
  );
};
{/* Vedant */}
export default BMEofficialCard;
