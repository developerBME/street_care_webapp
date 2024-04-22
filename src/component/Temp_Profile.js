import React, { } from "react";
import star from "../images/star.png";
import tickMark from "../images/tickMark.svg";
import Profieimage from "../images/user.png";
import location from "../images/location.png";
import date from "../images/date.png";

const Temp_Profile = () => {
    return (

        <div className="px-4 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 xl:px-24 xl:py-12 2xl:px-32 2xl:py-16">
            <div className="mx-auto max-w-[98.75rem] w-full p-8 gap-4 bg-white  rounded-t-lg md:rounded-b-none rounded-b-lg mt-20">
                <div className="flex flex-col mb-4 md:flex-row md:gap-x-6 xl:gap-x-12 md:mb-8 lg:mb-12 xl:mb-16 max-w-[87rem] mx-auto">
                    <div className="pr-0 bg-gradient-to-tr from-[#C0F4FF] from-10% via-[#C0F4FF] via-60% to-[#DDD] to-90% bg-fixed rounded-t-2xl md:bg-none relative">
                        <img
                            src={Profieimage}
                            className="rounded-full w-32 h-32 mx-auto mt-8 mb-4 md:w-64 md:h-48 lg:w-72 lg:h-56" />
                    </div>
                    <div className="w-full lg:w-11/12 py-4 md:mt-16 lg:mt-20 mx-auto">
                        <div>
                            <h1 className="font-bricolage text-3xl md:text-5xl lg:text-6xl text-[#212121] leading-tight">
                                Mandy Klose
                            </h1>
                            <h3 className="text-[#212121] font-opensans font-medium text-sm lg:text-base pt-4">
                                Joined 12/20/2023
                            </h3>
                        </div>


                        <div className="w-full flex flex-wrap gap-2 overflow-x-auto md:flex-nowrap pt-4">
                            <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold whitespace-nowrap flex justify-center items-center">
                                <h6 className="text-[#212121] text-[0.875rem] font-opensans">
                                    Spanish
                                </h6>
                            </div>
                            <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold whitespace-nowrap flex justify-center items-center">
                                <h6 className="text-[#212121] text-[0.875rem] font-opensans">
                                    Healthcare
                                </h6>
                            </div>
                            <button className="px-2 py-2 mr-2 h-10 rounded-md border border-[#CACACA] hover:bg-[#DEF6EB] font-semibold font-opensans">
                                <h6 className="text-[#273164] text-[0.875rem] w-[10rem] md:w-auto">
                                    Add my superpower
                                </h6>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="px-4 pb-4 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 flex gap-4 max-w-[87rem] mx-auto overflow-x-auto">
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[1.0625rem] h-[1.0625rem] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121] break-words">
                                Community Leader
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Led Community Outreach
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[1.0625rem] h-[1.0625rem] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121] break-words">
                                Volunteer Trainers
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Led Community Orientation
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[1.0625rem] h-[1.0625rem] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121]">
                                Ambassador
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Had invited friend to join
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121] break-words">
                                Neighborhood Leader
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Joined 3 Outreach in the same neighborhood.
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121] break-words">
                                Information Sharer
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Finish the 10 min how to Streetcare program.
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] gap-4 min-w-[18rem]">
                        <div className="relative inline-block min-w-[4rem]">
                            <img className="w-16 h-16 grayscale" src={star} alt="..."></img>
                        </div>
                        <div className="flex-grow flex flex-col justify-between overflow-hidden">
                            <h1 className="text-xs sm:text-sm font-bold mt-2 font-bricolage text-[#212121] break-words">
                                Seasoned Volunteer
                            </h1>
                            <h3 className="text-[0.625rem] sm:text-[0.6875rem] font-opensans font-normal text-[#616161] break-words">
                                Joined more than 4 outreaches or has helped more than 8 people.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* Impact */}
            <div className="mx-auto max-w-[98.75rem] w-full p-8 bg-white  rounded-t-lg md:rounded-t-none rounded-b-lg mt-8 md:mt-0 ">
                <div className="max-w-[87rem] mx-auto mt-4">
                    <p className="text-[#212121] text-3xl sm:text-4xl font-medium font-dmsans leading-9 md:px-0 px-4">
                        My Impact
                    </p>

                    <div className="w-full h-fit justify-center items-center grid grid-cols-3 font-bricolage py-6 px-4 md:px-8 xl:px-0 md:pt-8 md:pb-8 lg:pt-16 lg:pb-12">
                        <div className="flex flex-col grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-green-200 to-zinc-200 justify-center items-center gap-4 rounded-tl-2xl rounded-bl-2xl xl:justify-start xl:items-start">
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold leading-loose font-inter text-center xl:text-left">
                                Helped
                            </div>
                            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-white rounded-full">
                                <div className="text-violet-950 font-bricolage text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal flex justify-center items-center">
                                    12
                                </div>
                            </div>
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold inline-flex">
                                Homeless
                            </div>
                        </div>

                        <div className="flex flex-col grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-center items-center gap-4 xl:justify-start xl:items-start">
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold leading-loose font-inter text-center xl:text-left">
                                Participated                       
                            </div>
                            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-white rounded-full">
                                <div className="text-violet-950 font-bricolage text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal flex justify-center items-center">
                                    8
                                </div>
                            </div>
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold inline-flex">
                                Outreaches
                            </div>
                        </div>

                        <div className="flex flex-col grow sm:rounded-br-2xl rounded-bl-none sm:rounded-b-none rounded-r-2xl lg:rounded-r-2xl lg:rounded-bl-none shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-center items-center gap-4 xl:justify-start xl:items-start">
                            
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold leading-loose font-inter text-center xl:text-left">
                                Donated
                            </div>
                            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-white rounded-full">
                                <div className="text-violet-950 font-bricolage text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal flex justify-center items-center">
                                    32
                                </div>
                            </div>
                            <div className="text-violet-950 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold inline-flex">
                                Items
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            

            {/*Outreaches*/}
            <div className="mx-auto max-w-[98.75rem] p-8 lg:p-24 bg-white rounded-lg mt-8 ">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-12 mb-16">
                    <p className="text-[#212121] text-3xl sm:text-4xl font-medium font-dmsans leading-9 ">
                        My Outreaches
                    </p>
                    <button className="bg-[#6840E0] hover:bg-[#6840E0] text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        Document Personal Outreach
                    </button>
                </div>

                <div style={{ backgroundColor: '#F2F6D8' }}
                    className="w-full max-w-[87rem] h-auto py-8 px-8 border border-solid border-gray-300 rounded-2xl flex items-center justify-between mx-auto mb-16">
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-semibold text-grey-800">
                            Congratulations! You have attended more than 1 outreach event. Now you can host your own.
                        </p>
                    </div>
                    <button className="bg-[#6840E0] hover:bg-[#6840E0] text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline min-w-[9.9375rem]">
                        Create Outreach
                    </button>
                </div>

                <div className="lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="bg-[#F1EEFE] rounded-2xl shadow p-4 min-w-[10.5rem] ">
                            <div className="flex items-center mt-2">
                                <img src={date} className=" mr-2" alt="date" />
                                <p className="text-sm text-[#37168B]">03/12/2023 - 14:30</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <img src={location} className=" mr-2" alt="Location" />
                                <p className="text-sm text-[#37168B]">Queens, NY</p>
                            </div>
                            <h3 className="text-lg font-bold mt-4">Children Welfare in New...</h3>
                            <p className="text-sm text-gray-600 mt-2">Tommy, a senior citizen in a wheelchair wearing a navy blue top and brown shoes.</p>
                            <div className="flex flex-row">
                                <div className="flex items-center mt-4 bg-[#F1EEFE] rounded-full p-2 max-w-[5.5rem] border border-[#C8C8C8]">
                                    <span className="text-black text-xs lg:w-auto">Childcare</span>
                                </div>
                                <div className="flex items-center mt-4 bg-[#F1EEFE] rounded-full p-2 max-w-[5.5rem] border border-[#C8C8C8] ml-2">
                                    <span className="text-black text-xs lg:w-auto">Shelter</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-6 ml-1 font-bold">+1</p>
                                <p className="text-sm text-gray-600 mt-6  font-bold hidden lg:block">more</p>


                            </div>
                            <div>
                                <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300 text-xs font-medium rounded-full px-6 py-2 w-18.625 h-8">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>




        </div>
    );
};
export default Temp_Profile;