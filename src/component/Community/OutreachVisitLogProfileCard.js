import React from "react";
import location from "../../images/location_on.svg";
import calender from "../../images/calendar_month.svg";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const OutreachVisitLogProfileCard = ({ visitLogCardData }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F5EEFE] rounded-[30px] flex flex-col h-full">
      <div className="flex-1 px-4 xl:py-1.5 lg:py-4 py-3">
        <div className="space-y-4">
          <div className="mt-2">
            <div className="flex xl:justify-between xl:mt-5 mt-0 flex-col xl:flex-row">
              <div className="text-violet-900 text-[12px] font-medium font-bricolage leading-tight flex flex-row">
                <div>{<img alt="" className="w-4 h-4" src={calender} />}</div>
                <div className="px-1">
                  {visitLogCardData.date || ""} · {visitLogCardData.time}
                </div>
              </div>
              <div className="text-violet-900 text-[12px] font-medium font-bricolage leading-tight flex flex-row mt-2 xl:mt-0">
                <div>{<img alt="" className="w-4 h-4" src={location} />}</div>
                <div className="pt-0.5">
                  {visitLogCardData?.city || ""},{" "}
                  {visitLogCardData?.state || ""}
                </div>
                <div className="px-1">
                  <CustomButton
                    label="Edit"
                    name="buttonlightsmall"
                    onClick={() => {
                      navigate(`/profile/personaloutform/${visitLogCardData.id}`);
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="text-zinc-700 text-[12px] font-normal font-bricolage leading-snug mt-2 mb-2 px-1">
              {visitLogCardData.description || ""}
            </div>
            <div className="flex justify-between mt-2 mb-2 px-1">
              <div className="text-neutral-900 text-[12px]  font-bold font-bricolage leading-tight text-left">
                People Helped
              </div>
              <div className="text-neutral-900 text-[18px] mt-[-5px] font-bold font-bricolage leading-tight text-right">
                {visitLogCardData.numberPeopleHelped || ""}{" "}
              </div>
            </div>
            <div className="flex justify-between mt-2 mb-2 px-1">
              <div className="text-neutral-900 text-[12px]  font-bold font-bricolage leading-tight text-left">
                Items Donated
              </div>
              <div className="text-neutral-900 text-[18px]  mt-[-5px] font-bold font-bricolage leading-tight text-right">
                {visitLogCardData.itemQty || ""}{" "}
              </div>
            </div>
            <div className="px-1">
              <div className="inline-flex items-center gap-2 flex-wrap mt-2">
                {visitLogCardData?.whatGiven.map((item, index) => (
                  <div className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2 px-4 pb-6 space-x-2">
        <CustomButton
          label="View Details"
          name="buttonlightsmall"
          onClick={() => {
            navigate(`/PersonalVisitLogDetails/${visitLogCardData.id}`);
          }}
        />
      </div>
    </div>
  );
};

export default OutreachVisitLogProfileCard;
