import React from 'react';

const Card = ({ children, bgColor }) => {
  return (
    <div className={`p-6 shadow-md rounded-[30px] ${bgColor}`}>
      {children}
    </div>
  );
}

export default Card;