import React from "react";

const CardTags = ({ tags, maxShown = 4 }) => {
  let moreCount = tags.length - maxShown;
  return (
    <div className="inline-flex w-full items-center gap-2 flex-wrap min-w-0">
      {tags.slice(0, maxShown).map((item, index) => (
        <div
          className="py-1 px-3 border border-[#C8C8C8] rounded-xl text-[12px] text-[#444746] overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
          key={item}
          title={item}
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
