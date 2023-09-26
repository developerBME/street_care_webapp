import React from "react";

import Chip from "../Community/Chip"
import arrowDown from "../../images/arrowDown.png"

const chipList = ['Clothing','Education','Personal Care','Employment and Training','Food and water','Healthcare','Chinese','Spanish','Language(please specify)','Legal','Shelter','Transportation','LGBTQ Support','Technology Access','Social Integration','Pet Care']

const Form = ()=>{
    return(
        <div>
            <form className="space-y-6">
                <div>
                    <div className="lg:text-5xl text-3xl font-medium font-bricolage pb-4 lg:pb-16">Create Outreach Event</div>
                    <div className="space-y-4">
                        <div className="font-semibold font-bricolage text-[22px]">Event Information</div>
                        <div className="space-y-1.5">
                            <p className="font-semibold font-['Inter'] text-[15px]">Event Name*</p>
                            <input type="text" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " placeholder="Use Location by default for group meetup" />
                        </div>
                        <div className="space-y-1.5">
                            <p className="font-semibold font-['Inter'] text-[15px]">Event Description</p>
                            <input type="text" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " placeholder="Details" />
                        </div>
                        <div className="space-y-1.5">
                            <p className="font-semibold font-['Inter'] text-[15px]">Maximum capacity of participants allowed</p>
                            <input type="text" className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " />
                            <p className="font-normal font-['Inter'] text-xs">Please provide a numerical value.</p>
                        </div>
                        <div className="text-[22px] font-semibold font-bricolage">Meet up Details</div>
                        <div className="space-y-1.5">
                            <p className="font-semibold font-['Inter'] text-[15px]">Street*</p>
                            <input type="text" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "  placeholder="Street"/>
                        </div>
                        <div className="inline-flex grid grid-cols-2 space-x-4">
                            <div className="space-y-1.5">
                                <p className="font-semibold font-['Inter'] text-[15px]">State*</p>
                                <input type="text" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " placeholder="New York"/>
                            </div>
                            <div className="space-y-1.5">
                                <p className="font-semibold font-['Inter'] text-[15px]">Zipcode*</p>
                                <input type="text" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " placeholder="11201"/>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-1.5">
                                <p className="font-semibold font-['Inter'] text-[15px]">Date*</p>
                                <input type="date" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " />
                                <p className="font-normal font-['Inter'] text-xs">Please follow the format mm/dd/yyyy</p>
                            </div>
                        </div>
                        <div className="inline-flex space-x-4 grid grid-cols-2">
                            <div className="space-y-1.5">
                                <p className="font-semibold font-['Inter'] text-[15px]">Start Time*</p>
                                <input type="time" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "/>
                            </div>
                            <div className="space-y-1.5">
                                <p className="font-semibold font-['Inter'] text-[15px]">End Time*</p>
                                <input type="time" className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 " />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="font-semibold font-bricolage text-[22px]">What kind of help they need?</div>
                        <div className="space-y-1.5 relative">
                            <p className="font-semibold font-['Inter'] text-[15px]">Is this Event related to any Help Request?</p>
                            <select
                            className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring focus:ring-indigo-400 appearance-none"
                            defaultValue=""
                            >
                                <option value="" disabled>Select Help Request</option>
                                <option value="helpRequest1">Help Request 1</option>
                                <option value="helpRequest2">Help Request 2</option>
                            </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                            <img src={arrowDown}/>
                        </div>
                    </div>
  
                    <div className="font-semibold font-bricolage text-[15px]">Select skills it would require to provide the help</div>
                    <div className="lg:w-[587px] space-y-2">
                        {chipList.map((value, index) => (
                            <Chip key={index} val={value} />
                        ))}
                    </div>
                </div>
                <div className="space-y-16 space-x-[15px]">
                    <button className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700">Cancel</button>
                    <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default Form;