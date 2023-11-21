import React, { useState } from "react";
import add2 from "../../images/add2.png";
import close from "../../images/close.png";
import { useEffect } from "react";

const Chip = (props) => {
  const [clicked, setClicked] = useState(false);
  //   console.log(props.val + ":" + clicked);
  useEffect(() => {
    if (props.clear) {
      setClicked(false);
    }
  }, [props.clear]);
  const handleClick = () => {
    props.setter(props.val, !clicked);
    setClicked(!clicked);
  };
 
  return (
    <div
      onClick={handleClick}
      className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 mr-1 
        ${
          clicked
            ? "bg-[#F5EDFA] border border-[#4F35D5]"
            : "bg-white border border-[#CACACA] text-[#616161]"
        }`}
    >
      <div
        className={`text-sm font-semibold font-['Open Sans'] ${
          clicked ? "text-[#4F35D5]" : "text-[#616161]"
        }`}
      >
        <input
          type="checkbox"
          id={props.val}
          value=""
          class="hidden"
          required=""
          checked={clicked}
        ></input>
        {props.val}
      </div>

      {clicked ? (
        <img src={close} className={`w-6 h-6`} />
      ) : (
        <img src={add2} className="w-6 h-6" />
      )}
    </div>
    
    // <div onClick = {handleClick} className={`inline-flex cursor-pointer items-center gap-1 bg-white border border-[#CACACA] rounded-full px-3 py-1 mr-1
    // ${clicked ? "bg-[#F4ECF9] border-[#5F35D5]"
    // :"bg-white border border-[#CACACA] text-[#616161]"}`}>
    //     <div className={`text-sm font-semibold font-['Open Sans'] ${clicked? "text-[#4F35D5]": "text-[#616161]"}`}>{props.val}</div>
    //     {/*<div className={`text-[20px] ${clicked ? "rotate-45 text-[#5F35D5]":"rotate-0"}`}>+</div>  ${clicked ? "rotate-45 bg-[#5F35D5]":"rotate-0"}*/}
    //     {
    //         clicked ? <img src={close} className={`w-6 h-6`} />
    //                 : <img src={add2} className="w-6 h-6"/>
    //     }

    // </div>
  );
};

export default Chip;
