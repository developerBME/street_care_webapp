import React from "react";
import img from "../../images/img0.png"
import img1 from "../../images/img12.png"
import img2 from "../../images/img123.png"
import imgBME from "../../images/imgBME.png"
import { Button } from "react-bootstrap";

const BMEcardnew = () => {
  return (
    <div className=" w-[340px] lg:w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
            
                        <div className=" grow shrink basis-0 bg-sky-100 rounded-3xl flex-col justify-start items-start inline-flex">
                            <img className=" self-stretch h-56 rounded-t-3xl" src={img} />
                            <div className=" self-stretch px-6 pt-6 pb-3 justify-start items-center gap-2 inline-flex">
                            <div className="justify-start items-start gap-px flex">
                                <img className="w-10 h-10 left-[6.34px] top-[9.19px]" src={imgBME}/>
                            </div>
                            <div className="text-black text-sm font-normal font-['DM Sans'] leading-snug">Bright Mind Official</div>
                            </div>
                            <div className=" h-32 px-6 py-2 flex-col justify-start items-start gap-4 flex">
                            <div className=" text-neutral-800 text-2xl font-medium font-['DM Sans'] leading-loose">Community Connection Night</div>
                            <div className=" text-cyan-700 text-sm font-medium font-['DM Sans'] leading-tight">Oct 12, 2023 THU 5:30pm</div>
                            <div className=" h-5 flex-col justify-start items-start gap-1 flex">
                                <div className=" self-stretch text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">One Pace Plaza, West 2nd Fl, NY 10038</div>
                            </div>
                            </div>
                            <div className="self-stretch h-20 px-6 pt-4 pb-6 flex-col justify-start items-start gap-2.5 flex">
                                <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                                    <Button className="h-10 bg-cyan-200 px-6 py-2.5 rounded-full flex-col justify-center items-center gap-2 inline-flex text-center text-neutral-900 text-sm font-medium font-['DM Sans'] leading-tight">
                                        RSVP
                                    </Button>
                                    <div className="grow shrink basis-0 text-right text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">Open Spots: 39/100</div>
                                </div>
                            </div>
                        </div>


                        <div className="grow shrink basis-0 bg-sky-100 rounded-3xl flex-col justify-start items-start inline-flex">
                            <img className="self-stretch h-56 rounded-t-3xl" src={img1} />
                            <div className="self-stretch px-6 pt-6 pb-3 justify-start items-center gap-2 inline-flex">
                            <div className="justify-start items-start gap-px flex">
                                <img className="w-10 h-10 left-[6.34px] top-[9.19px]" src={imgBME}/>
                            </div>
                            <div className="text-black text-sm font-normal font-['DM Sans'] leading-snug">Bright Mind Official</div>
                            </div>
                            <div className="self-stretch h-32 px-6 py-2 flex-col justify-start items-start gap-4 flex">
                            <div className="self-stretch text-neutral-800 text-2xl font-medium font-['DM Sans'] leading-loose">Volunteer November Meetup</div>
                            <div className="self-stretch text-cyan-700 text-sm font-medium font-['DM Sans'] leading-tight">Nov 1, 2023 THU 6:00pm</div>
                            <div className="self-stretch h-5 flex-col justify-start items-start gap-1 flex">
                                <div className="self-stretch text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">Online</div>
                            </div>
                            </div>
                            <div className="self-stretch h-20 px-6 pt-4 pb-6 flex-col justify-start items-start gap-2.5 flex">
                            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                              <div className="h-10 rounded-full flex-col justify-center items-center gap-2 inline-flex">
                                <div className="self-stretch grow shrink basis-0 px-6 py-2.5 bg-zinc-300 justify-center items-center gap-2 inline-flex">
                                    <div className="opacity-40 text-center text-neutral-600 text-sm font-medium font-['DM Sans'] leading-tight">Stay Tuned</div>
                                </div>
                              </div>
                                <div className="grow shrink basis-0 text-right text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">Open Spots: Unlimited</div>
                            </div>
                            </div>
                        </div>



                        <div className="grow shrink basis-0 bg-sky-100 rounded-3xl flex-col justify-start items-start inline-flex">
                                <img className="self-stretch h-56 rounded-t-3xl" src={img2} />
                                <div className="self-stretch px-6 pt-6 pb-3 justify-start items-center gap-2 inline-flex">
                                <div className="justify-start items-start gap-px flex">
                                    <img className="w-10 h-10 left-[6.34px] top-[9.19px]" src={imgBME}/>
                                </div>
                                <div className="text-black text-sm font-normal font-['DM Sans'] leading-snug">Bright Mind Official</div>
                                </div>
                                <div className="self-stretch h-32 px-6 py-2 flex-col justify-start items-start gap-4 flex">
                                <div className="self-stretch text-neutral-800 text-2xl font-medium font-['DM Sans'] leading-loose">Volunteer December Meetup</div>
                                <div className="self-stretch text-cyan-700 text-sm font-medium font-['DM Sans'] leading-tight">Dec 1, 2023 THU 6:00pm</div>
                                <div className="self-stretch h-5 flex-col justify-start items-start gap-1 flex">
                                    <div className="self-stretch text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">Online</div>
                                </div>
                                </div>
                                <div className="self-stretch h-20 px-6 pt-4 pb-6 flex-col justify-start items-start gap-2.5 flex">
                                <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                                    <div className="h-10 rounded-full flex-col justify-center items-center gap-2 inline-flex">
                                    <div className="self-stretch grow shrink basis-0 px-6 py-2.5 bg-zinc-300 justify-center items-center gap-2 inline-flex">
                                        <div className="opacity-40 text-center text-neutral-600 text-sm font-medium font-['DM Sans'] leading-tight">Stay Tuned</div>
                                    </div>
                                    </div>
                                    <div className="grow shrink basis-0 text-right text-zinc-700 text-sm font-normal font-['DM Sans'] leading-snug">Open Spots: Unlimited</div>
                                </div>
                                </div>
                            </div>

     </div>
  );
};

export default BMEcardnew;
