import React, { useEffect } from "react";
import CustomButton from "../../Buttons/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
const DeleteAccConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const queryParameters = new URLSearchParams(window.location.search)
  // const acc = queryParameters.get("acc")
  if (!state) {
    navigate("/pagenotfound")
  }
  useEffect(() => { console.log(state) }, [])
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="bg-[#f7f7f7] rounded-l-2xl">
            <div className="w-full h-full px-4 py-6 md:p-12 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                We are sorry to you see you go :(
              </div>
              <div className="text-black text-base font-normal">
                Thank you for being part of this wonderful community. Your
                account -{" "}
                <span className="text-[#6840E0]">
                  {state?.email}
                </span>
                , has been successfully deleted. You will be redirected to the
                StreetCare homepage shortly.{" "}
              </div>
              <CustomButton
                label="Back to Homepage"
                name="buttondefault"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccConfirmation;
