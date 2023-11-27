import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CustomButton from "../Buttons/CustomButton";
import help_announcement from "../../images/help_announcement.png";
import ConfirmationModal from "./ConfirmationModal";
import { fetchHelpReqById } from "../HelpRequestService";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";


const ICanHelpForm = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const result = await fetchHelpReqById(id);
            setData(result);
            console.log("Result");
            console.log(result);
          } catch (error) {
            console.error(error.message);
          }
        };
        console.log("DATA");
        console.log(data)
        getData(); // Invoke the async function
      }, []);

    const fAuth = getAuth();
    onAuthStateChanged(fAuth, (user) => {
        if (user) {
        console.log(user);
        } else {
        console.log("USER NOT FOUND!");
        }
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setSuccess(true);
          } catch (e) {
            console.log(e);
          }
    };

    return (
        <div className="relative flex flex-col items-center ">
          <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl text-black ">
            {/*  */}
            <div className=" absolute flex mt-[-50px] items-center cursor-pointer pl-3 lg:pl-40" onClick={() => { navigate(-1, { preventScrollReset: true }); }} >
              <IoIosArrowBack className=" w-6 h-6" />{" "}
              <p className=" font-bricolage text-xl font-bold leading-7">
                Return to Help Requests
              </p>
            </div>
            {/*  */}
            <div className="items-center justify-center mx-2 mb-32 lg:mx-40 p-4 lg:pt-[100px] lg:pb-[100px] lg:pr-[120px] lg:pl-[120px] rounded-2xl bg-[#F7F7F7] ">
                <h1 className=" font-opensans font-medium text-2xl md:text-[43px] text-[#212121] mb-6 leading-[55px]">
                    {" "}
                        Help request in 123 Plaza 
                        {/* {data.title} */}
                </h1>
                <div className="w-fit h-8 px-2 py-1 bg-[#FFECF2] rounded-lg justify-start items-start gap-2 inline-flex mb-4">
                    <div className="w-6 h-6 relative">
                        <img src={help_announcement}></img>
                    </div>
                    <div className="text-center text-[#7E0025] text-lg font-semibold font-opensans leading-normal">
                        Need Help
                    </div>
                </div>
                <p className="text-[#616161 font-opensans">Posted on July 23, 2023 by Jay K</p>
                {/* <p className="text-[#616161 font-opensans">{data.createdAt}</p> */}
                <div className="mt-16">
                    <p className="font-bricolage text-[#000] font-bold text-sm mb-2">Name</p>
                    <p className="font-normal text-sm text-[#616161]">Lucy</p>
                    {/* <p className="font-normal text-sm text-[#616161]">{data.userName}</p> */}
                </div>
                <div className="mt-8">
                    <p className="font-bricolage text-[#000] font-bold text-sm mb-2">What kind of help they need?</p>
                    <div className="overflow-x-scroll md:overflow-x-none">
                      <div className="justify-start items-start gap-2 inline-flex">
                          {/* {data.skills.map((item, index) => (
                          <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                              <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                              {item}
                              </div>
                          </div>
                          ))}  */}
                          <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                            <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                                Childcare
                            </div>
                          </div>
                          <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                            <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                              Counseling and Support
                            </div>
                          </div>
                          <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                            <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                              Clothing
                            </div>
                          </div>
                          <div className="w-fit px-3 py-1 bg-white rounded-xl border border-[#616161] justify-start items-center gap-4 flex">
                            <div className="opacity-90 justify-start items-center gap-1 flex text-[#616161] text-sm font-semibold font-opensans leading-tight">
                              Healthcare
                            </div>
                          </div>
                      </div>
                    </div>
                    <p className="font-normal text-sm text-[#616161] mt-2">Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling. </p>
                    {/* <p className="font-normal text-sm text-[#616161] mt-2">{data.identification}</p> */}
                </div>
                <div className="mt-8">
                    <p className="font-bricolage text-[#000] font-bold text-sm mb-2">How can other Volunteers find them?</p>
                    <p className="font-normal text-sm text-[#616161] mt-2">123 Plaza, New York She is around 5’3 tall, with blonde long hair and tattoos on her arm.</p>
                    {/* <p className="font-normal text-sm text-[#616161] mt-2">1{data.description}</p> */}
                </div>
                <div className="space-y-16 space-x-[15px]">
                    <CustomButton label="I can help" name="buttondefault" onClick={handleSubmit} />
                    <CustomButton label="Cancel" name="buttonborder" />
                </div>
                {success && (
                  <ConfirmationModal isOpen={true} />
                )}
            </div>
          </div>
        </div>
      );
    };
    
    export default ICanHelpForm;