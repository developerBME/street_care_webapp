import CustomButton from "../Buttons/CustomButton";
import DocVec from "../../images/DocVec.svg";
import { useNavigate } from "react-router-dom"; 

const NoOutreachDoc = ({ isPersonalVisitLog }) => {

    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col justify-start items-center gap-9">
            <div className="h-fit flex flex-col justify-center items-center">
                <img className="w-[260px] h-[250px] flex"
                    src={DocVec}
                    alt="HandshakeLogo"
                />
            </div>
            <div className="h-fit flex flex-col justify-center items-center gap-2">
                <div className="text-center text-neutral-900 text-[28px] font-medium font-['DM Sans'] leading-9">No Outreach documented yet</div>
                {/* <div className="text-center text-zinc-700 text-base font-normal font-['DM Sans'] leading-normal">Whoops... no internet connection found. Check your connection</div> */}
            </div>
            <div className="flex justify-center items-start gap-4">
                {isPersonalVisitLog ? (
                <CustomButton
                    label="Document Personal Visit Log"
                    name="buttondefault"
                    onClick={() => {
                    navigate("/profile/visitlogform");
                    window.scrollTo(0, 0);
                    }}
                />
                ) : (
                <CustomButton
                    label="Document Personal Outreach"
                    name="buttondefault"
                    onClick={() => {
                    navigate("/createOutreach");
                    window.scrollTo(0, 0);
                    }}
                />
                )}
                <CustomButton
                    label={isPersonalVisitLog ? "Explore Visit Logs" : "Explore Outreach Events"}
                    name="buttonlight"
                    onClick={() => {
                        navigate(isPersonalVisitLog ? "/allOutreachVisitLog" : "/allOutreachEvents");
                        window.scrollTo(0, 0);
                    }}
                />
            </div>
            {/* <div className="flex justify-center items-start gap-4">    
                <CustomButton
                label="Document Personal Outreach"
                name="buttondefault"
                onClick={() => {
                    navigate("/profile/visitlogform");
                    window.scrollTo(0, 0);
                  }}
                ></CustomButton>
                <CustomButton
                label="Explore Outreach Event"
                name="buttonlight"
                onClick={() => {
                    navigate("/allOutreachEvents");
                    window.scrollTo(0, 0);
                  }}
                ></CustomButton>

            </div> */}
        </div>
    );
};

export default NoOutreachDoc;

