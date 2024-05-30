import CustomButton from "../../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const EmailUpdateConfirmation = () => {
  const navigate = useNavigate();

  const fAuth = getAuth();

  const handleLogOut = async () => {
    await signOut(fAuth);
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className=" w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="bg-[#f7f7f7] rounded-l-2xl">
            <div className="w-full h-full px-4 py-6 md:p-12 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                Your email has been successfully updated.
              </div>
              <div className="text-black text-base font-normal">
                You can now login with{" "}
                <span className="text-[#6840E0]">
                  {fAuth.currentUser.email}
                </span>{" "}
                and current password. Click the button below to log back into your account.
              </div>
              <CustomButton
                label="Login"
                name="buttondefault"
                onClick={handleLogOut}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailUpdateConfirmation;
