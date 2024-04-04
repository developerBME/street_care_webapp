import React from "react";
import { useNavigate } from "react-router-dom";

function PanktiSample() {
 const navigate = useNavigate();
  return (
    <div className="flex py-16 flex-col items-center justify-center">
      <div className="w-full md:w-95p lg:max-w-screen-lg flex pt-28 justify-center">
        <div className="w-full bg-gradient-to-br from-[#FFF8BA] to-[#DDD] rounded-t-2xl px-8 py-10 flex-col justify-start items-start gap-4 inline-flex">
          <div className="text-2xl font-medium font-dmsans">
            Help Requests (6)
          </div>
          <div className="text-md font-normal font-dmsans pt-2">
            What are help requests and how can they help you? If you are ready
            to help people now, kindly sign up to outreaches
          </div>
        </div>
      </div>
      <div className="w-full md:w-95p lg:max-w-screen-lg flex justify-center">
        <div className="bg-[#F7F7F7] w-full rounded-b-2xl px-8 py-10 flex-col justify-start items-start inline-flex">
            <div className="w-full">
              <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
                <div className="flex relative">
                    <div className="flex text-center text-sm font-semibold font-opensans leading-normal">
                      <p className="rounded-lg bg-[#FFECF2] p-2 text-[#7E0025]">Need help</p> 
                      {/* <img className="h-25 w-25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFESURBVHgB7VTRTcMwEH3nUonPsEE+qMQWpBPABpARGAAUwQJsABsAE5QxivjxBuQTgWpzV8cSpGe3kaj60ydZie/uvbtLzgb2+E/cYOJlDeEYbBkrCRqclLIwECme6Qc5uJnDYjYkSY630gGFR7lpkigO+JIUP2kEzwTPBN5ag9G0wdxuIG5JiVX+wZwDzZRAVqtIqzAlHv1IVRfePluP8RPPZvWXSM+Erxo4LGJhqQKyuMbkkoMeNJ+HubrD232Ov/YccMBF96xv8U6yuJs62NzZOv6yA+10ilCDsnAYfwSx76MGtpV3zZ7SyHawwPi8q+I1iocEthXb75gUDmImzcnZT6UsB/PS94mN4CqJ4e1jRiOLZXUjnpi+I9p8F5NCMgGPacXkQmZcG8FgI7EXDY6rlI7a1tArOUL7TFu/rvfYPX4A21l9JwcDqfgAAAAASUVORK5CYII="/> */}
                    </div>
                    <div className="text-xs text-[#616161] m-3">
                      <p>Posted 30 mins ago by User K</p>
                    </div>
                    <div className="ml-auto text-sm text-[#FFF]">
                      <p className="bg-[#6840E0] rounded-xl p-2">Offer Help</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="text-xs text-[#616161] m-2">
                      <p>200 Eastern PKwy, Brooklyn, NY 11238</p>
                    </div>
                </div>
                <div className="flex relative">
                  <div className="text-2xl text-[#273164] m-2 font-medium">
                      <p>Homeless man needs immediate assistance</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="border-2 rounded-3xl text-xs text-[#616161] m-2 p-2">
                      <p>Childcare</p>
                    </div>
                    <div className="border-2 rounded-3xl text-xs text-[#616161] m-2 p-2">
                      <p>Counseling and Support</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="text-xs text-[#616161] m-2">
                      <p>Outreaches : No outreaches created</p>
                    </div>
                </div>
              </div>
            </div>

          

            <div className="w-full">
              <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
                <div className="flex relative">
                    <div className="flex text-center text-sm font-semibold font-opensans leading-normal">
                      <p className="rounded-lg bg-[#D4FFEC] p-2 text-[#004905]">Help Received</p> 
                      {/* <img className="h-25 w-25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFESURBVHgB7VTRTcMwEH3nUonPsEE+qMQWpBPABpARGAAUwQJsABsAE5QxivjxBuQTgWpzV8cSpGe3kaj60ydZie/uvbtLzgb2+E/cYOJlDeEYbBkrCRqclLIwECme6Qc5uJnDYjYkSY630gGFR7lpkigO+JIUP2kEzwTPBN5ag9G0wdxuIG5JiVX+wZwDzZRAVqtIqzAlHv1IVRfePluP8RPPZvWXSM+Erxo4LGJhqQKyuMbkkoMeNJ+HubrD232Ov/YccMBF96xv8U6yuJs62NzZOv6yA+10ilCDsnAYfwSx76MGtpV3zZ7SyHawwPi8q+I1iocEthXb75gUDmImzcnZT6UsB/PS94mN4CqJ4e1jRiOLZXUjnpi+I9p8F5NCMgGPacXkQmZcG8FgI7EXDY6rlI7a1tArOUL7TFu/rvfYPX4A21l9JwcDqfgAAAAASUVORK5CYII="/> */}
                    </div>
                    <div className="text-xs text-[#616161] m-2">
                      <p>Posted 30 mins ago by User K</p>
                    </div>
                    <div className="ml-auto text-sm text-[#1F0A58]">
                      <p className="rounded-3xl p-2 border-2">Reopen Help Request</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="text-xs text-[#616161] m-2">
                      <p>200 Eastern PKwy, Brooklyn, NY 11238</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="text-2xl text-[#273164] m-2 font-medium">
                      <p>Homeless man needs immediate assistance</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="border-2 rounded-3xl text-xs text-[#616161] m-2 p-2">
                      <p>Childcare</p>
                    </div>
                    <div className="border-2 rounded-3xl text-xs text-[#616161] m-2 p-2">
                      <p>Counseling and Support</p>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="text-xs text-[#616161] m-2">
                      <p>Outreaches : No outreaches created</p>
                    </div>
                </div>
              </div>
            </div>
            
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

export default PanktiSample;