import React from 'react';

const CardInfo = ({ children, bgColor, className = "" }) => {
  return (
    <div className={`p-6 shadow-md rounded-[30px] ${bgColor} ${className}`}>
      {children}
    </div>
  );
}

export default CardInfo;