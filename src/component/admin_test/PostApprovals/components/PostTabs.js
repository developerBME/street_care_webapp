import React from "react";

export default function PostTabs({ tabs, activeTab, onTabChange }) {
  const tabGroupClass =
    "inline-flex w-max items-start rounded-2xl bg-[#EEEEEE] h-12";
  const tabBaseClass =
    "flex items-center justify-center h-12 px-4 min-w-36 rounded-2xl font-medium shrink-0 whitespace-nowrap";
  const tabActiveClass = "bg-[#fbed4f] text-dark";
  const tabInactiveClass = "bg-transparent text-black";

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div role="tablist" aria-label="Post tabs" className={tabGroupClass}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-label={tab.ariaLabel || tab.label}
                disabled={tab.disabled}
                onClick={() => onTabChange(tab.key)}
                className={`${tabBaseClass} ${
                  activeTab === tab.key ? tabActiveClass : tabInactiveClass
                } ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}`.trim()}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <h3 className="hidden sm:block ml-6 font-dm-sans text-base font-bold text-[#fbed4f] whitespace-normal break-normal">
          Select Items
        </h3>
      </div>
    </div>
  );
}
