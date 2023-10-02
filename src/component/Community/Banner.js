import React from "react";
import '../../App.css';

import banner from "../../images/community_banner.png";
import one from "../../images/community_bg1.png";



function Banner() {
    return(
        <div className="items-center justify-center h-full w-full rounded-2xl bg-[#F7F7F7] bg-pattern banner2 bg-[left_bottom_-100px] bg-no-repeat relative">
            <div className="absolute bottom-0 right-0 z-[9]">
                <img src={one} className="" />
            </div>
            <div className="p-6 lg:px-24 lg:py-[55px] md:px-[25px] md:py-[25px] bg-[right_bottom_-150px] bg-no-repeat relative">
                <div className="lg:items-start md:items-center justify-center h-full w-full grid md:grid-cols-4 lg:grid-cols-5 gap-2 mb-[70px]">
                    <div className="lg:col-span-2 md:col-span-2 lg:mt-[30px]">
                        <p className="font-bricolage lg:text-[44px] text-[38px]">Community Hub</p>
                        <p className=" lg:text-[28px]">Join us today to make meaningful impact.</p>
                    </div>
                    <div className="lg:col-span-3 md:col-span-2 z-0">
                        <img src={banner} className=" h-full lg:max-w-[120%] lg:w-[120%] lg:-ml-[50px] md:w-fit mx-auto"></img>
                    </div>
                </div>
                <div className="bg-white rounded-3xl text-[18px] relative z-[9]">
                    <div className="flex flex-wrap">
                    {/* Column 1 */}
                    <div className="w-full md:w-1/3 lg:w-1/3 lg:px-[36px] lg:py-[28px] md:p-[18px] p-[18px]">
                        {/* Column content */}
                        <p className="font-bold text-violet-800 lg:mb-[24px] md:mb-[10px] sm:mb-[15px]">We helped</p>
                        <p><span className="text-xl font-bold lg:text-[38px] md:text-[28px] sm:text-[38px]">1,031</span> homeless people</p>
                    </div>

                    {/* Column 2 */}
                    <div className="w-full md:w-1/3 lg:w-1/3 lg:px-[36px] lg:py-[28px] md:p-[18px] p-[18px] middle border-y-2 border-[#F2F2F2]">
                        {/* Column content */}
                        <p className="font-bold text-violet-800 mb-[24px] md:mb-[10px] sm:mb-[15px]">Helped by</p>
                        <p><span className="text-xl font-bold lg:text-[38px] md:text-[28px] sm:text-[38px]">264</span> volunteers</p>
                    </div>

                    {/* Column 3 */}
                    <div className="w-full md:w-1/3 lg:w-1/3 lg:px-[36px] lg:py-[28px] md:p-[18px] p-[18px]">
                        {/* Column content */}
                        <p className="font-bold text-violet-800 mb-[24px] md:mb-[10px] sm:mb-[15px]">Donated</p>
                        <p><span className="text-xl font-bold lg:text-[38px] md:text-[28px] sm:text-[38px]">11,752</span> items</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;