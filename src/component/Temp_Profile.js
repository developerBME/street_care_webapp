import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import defaultImage from "../images/default_avatar.svg";
import crown from "../images/crown.png";
import notes from "../images/notes.png";
import announcement from "../images/announcement.png";
import neighborhood from "../images/neighboorhood.png";
import information from "../images/information.png";
import star from "../images/star.png";
import edit from "../images/edit.png";
import tickMark from "../images/tickMark.svg";
import Profieimage from "../images/user.png";


//import SuperpowerModal from "./SuperpowerModal";




const Temp_Profile = () => {
    return (

        <div className="xl:px-24 xl:py-12  ">
            <div className="mx-auto w-[1580px] h-[1154px] p-[128px] gap-[64px] bg-white rounded-lg mt-20">
                <div className="flex flex-col pt-0 px-0 pb-2 md:flex md:flex-row md:px-8  md:pb-8 xl:px-0  xl:pb-12 md:gap-x-6 xl:gap-x-12">
                    <div className="pr-0 bg-gradient-to-tr from-[#C0F4FF] from-10% via-[#C0F4FF] via-60% to-[#DDD] to-90% bg-fixed rounded-t-2xl md:bg-none relative">
                        <img
                            src={Profieimage}

                            className="rounded-full md:w-64 md:h-48 lg:w-72 lg:h-56 border-none md:mt-16 lg:mt-20 h-32 w-32 mx-auto mt-8 mb-4 "
                        />

                    </div>
                    <div className="w-[99%] py-4 md:mt-16 lg:mt-20">
                        <div className="px-4">
                            <h1 className="font-bricolage md:text-[54px] font-medium md:h-16 text-[#212121] h-12 text-4xl ">
                                Mandy Klose
                            </h1>
                            <h3 className="py-4 text-[#212121] font-opensans font-medium text-sm pt-0">
                                Joined 12/20/2023
                            </h3>
                        </div>

                        {/* <div className=" w-full px-4 pb-2 flex overflow-x-auto md:grid md:grid-cols-2 md:gap-y-2 lg:flex lg:flex-wrap"> */}
                        <div className=" w-full px-4 pb-2 flex overflow-x-auto md:flex md:flex-wrap md:gap-y-2">
                            {
                                <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold whitespace-nowrap flex justify-center items-center">
                                    <h6 className="text-[#212121] w-fit text-[14px] font-opensans">
                                        Spanish
                                    </h6>
                                </div>
                            }
                            {
                                <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold whitespace-nowrap flex justify-center items-center">
                                    <h6 className="text-[#212121] w-fit text-[14px] font-opensans">
                                        Healthcare
                                    </h6>
                                </div>
                            }
                            <button
                                className="px-2 py-2 mr-2 h-10 rounded-md border border-[#CACACA] hover:bg-[#DEF6EB] font-semibold font-opensans">
                                <h6 className="text-[#273164] w-[160px] text-[14px]">
                                    Add my superpower
                                </h6>
                            </button>

                        </div>
                    </div>
                </div>

                <div className="px-4 pb-4 grid grid-flow-col overflow-x-auto gap-2 md:px-8 md:pb-12 md:grid md:grid-rows-2 md:grid-cols-2 md:gap-y-4 md:gap-x-6 xl:px-0 xl:pb-16 xl:grid xl:grid-rows-1 xl:grid-cols-3 xl:gap-4">
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[17px] h-[17px] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121] self-stretch">
                                Community Leader

                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Led Community Outreach
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[17px] h-[17px] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121] self-stretch">
                                Volunteer Trainers

                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Led Community Orientation
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                            <img
                                className="w-[17px] h-[17px] absolute bottom-0 right-0"
                                src={tickMark}
                                alt="..."
                            ></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121] self-stretch">
                                Ambassdor

                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Had invited friend to join
                            </h3>
                        </div>
                    </div>



                </div>
                <div className="px-4 pb-4 grid grid-flow-col overflow-x-auto gap-2 md:px-8 md:pb-12 md:grid md:grid-rows-2 md:grid-cols-2 md:gap-y-4 md:gap-x-6 xl:px-0 xl:pb-16 xl:grid xl:grid-rows-1 xl:grid-cols-3 xl:gap-4">

                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-2 pb-1 font-bricolage text-[#212121] self-stretch">
                                Neighborhood Leader

                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Joined 3 Outreach in the same neighborhood.
                            </h3>
                        </div>
                    </div>


                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16" src={star} alt="..."></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-1 pb-1 font-bricolage text-[#212121] self-stretch">
                                Information sharer
                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Finish the 10 min how to Streetcare program.
                            </h3>
                        </div>
                    </div>

                    <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA] w-[265px] md:w-auto gap-4">
                        <div className="relative inline-block">
                            <img className="w-16 h-16 grayscale" src={star} alt="..."></img>
                        </div>
                        <div className="grow shrink basis-0 flex flex-col">
                            <h1 className="text-sm font-bold mt-1 pb-1 font-bricolage text-[#212121] self-stretch">
                                Seasoned Volunteer
                            </h1>
                            <h3 className="text-[11px] mb-2 font-opensans font-normal text-[#616161] self-stretch">
                                Joined more than 4 outreaches or has helped more than 8 people.
                            </h3>
                        </div>
                    </div>


                </div>
                {/* Impact */}
                <div className="">
                    <p className="text-[#212121] pl-4 pt-4 text-3xl md:pl-8 md:pt-0 xl:pl-0 xl:pt-0 sm:text-4xl font-medium font-dmsans leading-9">
                        My Impact
                    </p>

                    <div className="w-full h-fit justify-center items-center lg:justify-start lg:items-start  grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 font-bricolage py-6 px-4 md:px-8 xl:px-0 md:pt-8 md:pb-8  lg:pt-16 lg:pb-12">
                        <div className=" sm:flex grow rounded-l-2xl sm:rounded-t-2xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-l-2xl shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-center items-center sm:justify-start sm:items-end gap-6 ">
                            <div className=" w-full sm:w-fit flex-col  justify-center items-center sm:justify-start sm:items-start sm:gap-6 inline-flex">
                                <div className="text-violet-950 text-xs sm:text-2xl font-semibold leading-loose font-inter">
                                    Helped
                                </div>

                                <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full">
                                    <span className="text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px]">
                                        12
                                    </span>
                                </div>
                            </div>
                            <div className="w-full  justify-center sm:justify-start text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-8px] inline-flex">
                                Homeless People
                            </div>
                        </div>

                        <div className=" sm:flex grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-center items-center sm:justify-start sm:items-end gap-6 ">
                            <div className=" w-full sm:w-fit flex-col justify-center items-center sm:justify-start sm:items-start  sm:gap-6 inline-flex">
                                <div className="text-violet-950 text-xs sm:text-2xl  font-semibold leading-loose font-inter">
                                    Participated
                                </div>
                                <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full">
                                    <div className="text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px]">
                                        8
                                    </div>
                                </div>
                            </div>

                            <div className="w-full justify-center sm:justify-start text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-12px] inline-flex ">
                                Outreaches
                            </div>
                        </div>

                        <div className=" sm:flex grow sm:rounded-br-2xl rounded-bl-none sm:rounded-b-2xl rounded-r-2xl sm:rounded-r-none lg:rounded-r-2xl  lg:rounded-bl-none shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start items-end gap-6 ">
                            <div className=" w-full sm:w-fit flex-col justify-center items-center sm:justify-start sm:items-start sm:gap-6 inline-flex">
                                <div className="text-violet-950 text-xs sm:text-2xl font-semibold leading-loose font-inter">
                                    Donated
                                </div>
                                <div className="flex justify-center items-center w-20 h-20 bg-white rounded-full">
                                    <div className="text-violet-950 font-bricolage text-3xl sm:text-5xl font-normal leading-[64px]">
                                        32
                                    </div>
                                </div>
                            </div>
                            <div className="w-full justify-center sm:justify-start  text-violet-950 text-xs sm:text-xl font-semibold sm:py-2 md:ml-[-8px] inline-flex">
                                Items
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*Outreaches*/}
            <div className="mx-auto w-[1580px] h-[1154px] p-[128px] flex flex-col gap-[64px] bg-white rounded-lg mt-20">
                <p className="text-[#212121] pl-4 pt-4 text-3xl md:pl-8 md:pt-0 xl:pl-0 xl:pt-0 sm:text-4xl font-medium font-dmsans leading-9">
                    My Outreaches
                </p>

                <div
                    style={{ backgroundColor: '#F2F6D8' }}
                    className="w-full max-w-[1324px] h-[88px] py-[32px] px-[32px] border border-solid border-gray-300 rounded-[30px] flex items-center justify-between mx-auto">
                    <div className="flex flex-col gap-[16px]">
                        <p className="text-lg font-semibold text-grey-800">
                            Congratulations! You have attended more than 1 outreach event. Now you can host your own.
                        </p>
                    </div>
                    <button className="bg-[#6840E0] hover:bg-[#6840E0] text-white font-bold py-2 px-4 rounded-[100px] focus:outline-none focus:shadow-outline">
                        Create Outreach
                    </button>
                </div>


                <div className="flex justify-center items-center gap-4">
                <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px]">
                    <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                    <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                    <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                    <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">
                        
                        <span className="text-black text-sm">Childcare specialist needed</span>
                    </div>
                    <div>
                        <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                        Edit
                        </button>
                    </div>
                </div>
                <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                    <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                    <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                    <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                    <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                        <span className="text-black text-sm">Childcare specialist needed</span>
                    </div>
                    <div>
                        <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                            Edit
                        </button>
                    </div>
                    </div>
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>               
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="bg-[#F1EEFE] rounded-[30px] shadow p-6 w-[317.5px] h-[274px] gap-[16px]">
                        <h3 className="text-lg font-medium font-bold gap-2 ">BK Fort Green Outreach</h3>
                        <p className="text-sm text-[#37168B] mt-4">Sept 9, 2023 SAT 12:00pm</p>
                        <p className="text-sm text-gray-600 mt-4">200 Eastern Pkwy, Brooklyn, NY 11238</p>
                        <div className="flex items-center gap-2 mt-4 bg-white rounded-[16px] p-2">

                            <span className="text-black text-sm">Childcare specialist needed</span>
                        </div>
                        <div>
                            <button className="mt-4 bg-[#E6DCFF] hover:bg-indigo-300  text-sm font-medium rounded-[100px] p-2 w-[75px] h-[40px]">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};
export default Temp_Profile;
