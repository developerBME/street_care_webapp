import React from "react";

const CardTags = ({ tags }) => {
  let maxShown = 2;
  let moreCount = tags.length - maxShown;
  return (
    <div className="inline-flex items-center gap-2 flex-wrap">
      {tags.slice(0, maxShown).map((item, index) => (
        <div
          className={`py-1 px-3 border border-[#C8C8C8] rounded-xl text-[12px] text-[#444746] overflow-hidden text-ellipsis whitespace-nowrap max-w-fit ${
            moreCount > 0 ? "basis-1/3" : "basis-1/2"
          }`}
          key={item}
        >
          {item}
        </div>
      ))}
      {moreCount > 0 && (
        <div className="text-[12px] text-[#444746] overflow-hidden text-ellipsis whitespace-nowrap font-bold max-w-fit">
          +{moreCount} more
        </div>
      )}
    </div>
  );
};

export default CardTags;
