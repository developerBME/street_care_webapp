import React from "react";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import verifiedPurple from "../images/verified_purple.png";
import verifiedGreen from "../images/verified.png";
import verifiedBlue from "../images/verified_blue.png";
import verifiedYellow from "../images/verified_yellow.png";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
    fontSize: theme.typography.pxToRem(12),
    borderRadius: "0.375rem",
    padding: "0.25rem 0.5rem",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#1f2937",
  },
}));

const UserTypeInfo = () => {
  const userTypes = [
    {
      src: verifiedGreen,
      alt: "Chapter Leader",
      text: "Chapter Leader",
      tooltip: "Grass roots team lead",
    },
    {
      src: verifiedBlue,
      alt: "Street Care Hub Leader",
      text: "Street Care Hub Leader",
      tooltip:
        "Leader of one of Street Care Flagship Chapters/Internal Member/BME Volunteer",
    },
    {
      src: verifiedPurple,
      alt: "Chapter Member",
      text: "Chapter Member",
      tooltip: "Person registered with BME as a Chapter Member",
    },
    {
      src: verifiedYellow,
      alt: "Account holder",
      text: "Account holder",
      tooltip: "Person with a login but not a Chapter Member",
    },
  ];

  return (
    <div className="flex items-center justify-start space-x-4 mt-4">
      {userTypes.map((userType, index) => (
        <CustomTooltip
          title={userType.tooltip}
          placement="right"
          key={index}
          arrow
        >
          <div className="flex items-center space-x-2">
            <img src={userType.src} alt={userType.alt} className="w-6 h-6" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {userType.text}
            </span>
          </div>
        </CustomTooltip>
      ))}
    </div>
  );
};

export default UserTypeInfo;
