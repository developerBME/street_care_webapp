import React from 'react';

function CommunityHub() {
  return (
    <div className="community-section flex flex-col space-y-16 items-end justify-start absolute left-[78px] top-[184px] w-[1120px] h-[3602px]">
      <div className="community-info flex flex-col items-center justify-start relative w-[1120px] h-[666px]">
        <div className="community-description relative bg-white w-[1120px] h-[567px]">
          <div className="community-content-container inline-flex items-center justify-start absolute left-[72px] top-[72px] w-[1046px] h-[360px]">
            <div className="community-text-container inline-flex flex-col space-y-6 items-start justify-start relative w-[357px] h-[292px]">
              <div className="community-title-container flex flex-col items-start justify-end relative w-[357px] h-[52px]">
                <p className="community-title-text w-56 h-[52px] text-[45px] font-medium leading-[52px] text-[#6840e0]">Community</p>
              </div>
              <div className="community-details-container flex flex-col space-y-6 items-start justify-end relative w-[357px] h-[216px]">
                <p className="community-detail-text w-[371.61px] h-24 text-2xl font-medium leading-loose text-[#181818]">Participate in our outreaches to help those in need to become our superhero!</p>
                <p className="community-detail-text w-[371.61px] h-24 text-2xl font-medium leading-loose text-[#181818]">Or, know someone in need? Create a help request for others to help.</p>
              </div>
            </div>
            <div className="community-visuals relative w-[742px] h-[360px]">
              <div className="community-icon absolute left-[135.54px] top-[23.14px] bg-black w-[491.52px] h-[334.29px]"></div>
              <div className="community-shape absolute left-[110.66px] top-[0px] border-black w-[491.52px] h-[334.29px]">
                <div className="community-line absolute left-[0px] top-[0px] border-1 w-[552.16px] h-[375.66px]"></div>
              </div>
              <div className="community-rotate transform -rotate-[-43.064161941866146deg] absolute left-[650.86px] top-[-105.92px] w-[130.51px] h-[130.50px]">
                <div className="community-rotate-inner w-[130.49px] h-[130.49px] absolute left-[0.02px] top-[-0px]">
                  <div className="community-rotate-inner w-[130.49px] h-[130.49px] absolute left-[0px] top-[0px]">
                    <div className="community-rotate-inner w-[130.49px] h-[103.45px] absolute left-[0px] top-[0px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="statistics-container inline-flex space-x-1 items-center justify-center relative bg-white w-[1020px] h-[194px] px-16">
          <div className="statistic-container inline-flex flex-col space-y-6 items-center justify-start relative bg-white w-[217px] h-[194px] px-8 py-6">
            <p className="statistic-title w-[111px] h-7 text-[22px] font-bold leading-7 text-[#6840e0]">We helped</p>
            <div className="statistic-detail-container flex flex-col space-y-4 items-center justify-between relative w-[191px] h-[86px]">
              <div className="statistic-number-container relative w-[109px] h-[38px]">
                <p className="statistic-number w-[109px] h-[38px] text-[57px] font-medium leading-[64px] text-[#1f0a58]">1,031</p>
              </div>
              <p className="statistic-subtitle w-[191px] h-8 text-2xl font-medium leading-loose text-[#1f0a58]">homeless people</p>
            </div>
          </div>
          <div className="statistic-container inline-flex flex-col space-y-6 items-center justify-start relative bg-white w-[217px] h-[194px] px-10 py-6">
            <div className="statistic-title-container relative w-[105px] h-7">
              <p className="statistic-title w-[105px] h-7 text-[22px] font-bold leading-7 text-[#6840e0]">Helped by</p>
            </div>
            <div className="statistic-detail-container flex flex-col space-y-5 items-center justify-between relative w-[117px] h-[90px]">
              <p className="statistic-number w-[106px] h-[38px] text-[57px] font-medium leading-[64px] text-[#1f0a58]">264</p>
              <p className="statistic-subtitle w-[117px] h-8 text-2xl font-medium leading-loose text-[#1f0a58]">volunteers</p>
            </div>
          </div>
          <div className="statistic-container inline-flex flex-col space-y-6 items-center justify-between relative bg-white w-[217px] h-[194px] px-10 py-6">
            <p className="statistic-title w-[90px] h-7 text-[22px] font-bold leading-7 text-[#6840e0]">Donated</p>
            <div className="statistic-detail-container flex flex-col space-y-6 items-center justify-between relative w-[132px] h-[94px]">
              <div className="statistic-number-container relative bg-white w-[132px] h-[38px]">
                <p className="statistic-number w-[132px] h-[38px] text-[57px] font-medium leading-[64px] text-[#1f0a58]">11,752 </p>
              </div>
              <p className="statistic-subtitle w-[63px] h-8 text-2xl font-medium leading-loose text-[#1f0a58]">items</p>
            </div>
          </div>
          <div className="statistic-container inline-flex flex-col space-y-6 items-center justify-between relative bg-white w-[217px] h-[194px] px-10 py-6">
            <p className="statistic-title w-[149px] h-7 text-[22px] font-bold leading-7 text-[#6840e0]">Help Requests</p>
            <div className="statistic-detail-container flex flex-col space-y-6 items-center justify-between relative w-[97px] h-[94px]">
              <div className="statistic-number-container relative bg-white w-[50px] h-[38px]">
                <p className="statistic-number w-[50px] h-[38px] text-[57px] font-medium leading-[64px] text-[#1f0a58]">14</p>
              </div>
              <p className="statistic-subtitle w-[97px] h-8 text-2xl font-medium leading-loose text-[#1f0a58]">available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="help-container rounded-tl-3xl rounded-tr-3xl py-12"style={{ background: 'linear-gradient(139.36deg, #FFF8BA 12.78%, #EAE7DC 90.44%)'}}
>
          <div className="help-header flex justify-between items-center mb-6">
            <div className="help-title text-4xl px-10  font-bold text-black">Help Requests (6)</div>
            <div className="view-all text-xl font-medium text-yellow-800 cursor-pointer">View all</div>
          </div>
          <div className="help-description text-xl px-10  font-medium text-gray-800">
            What are help requests and how can they help you? If you are ready to help people now, kindly sign up to outreaches
          </div>
        </div>
        <div className="help-items bg-gray-200 rounded-bl-3xl rounded-br-3xl py-8 ">
          <div className="help-item bg-[#F7F7F7] w-full rounded-b-2xl px-8 flex-col justify-start items-start inline-flex">
            <div className="w-full">
              <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
                <div className="flex relative">
                  <div className="flex text-center text-sm font-semibold font-opensans leading-normal">
                    <p className="rounded-lg bg-[#FFECF2] p-2 text-[#7E0025]">Need help</p>
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
          </div>
          <div className="help-item bg-[#F7F7F7] w-full rounded-b-2xl px-8 flex-col justify-start items-start inline-flex">
            <div className="w-full">
              <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
                <div className="flex relative">
                  <div className="flex text-center text-sm font-semibold font-opensans leading-normal">
                    <p className="rounded-lg bg-[#FFF3C8] p-2 text-[#A66C00]">Help on the way</p>
                  </div>
                  <div className="text-xs text-[#616161] m-3">
                    <p>Posted 30 mins ago by User K</p>
                  </div>
                  <div className="ml-auto text-sm text-[#1F0A58]">
                    <p className="rounded-3xl p-2 border-2">Mark as help received</p>
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
                    <p>Outreaches: Brooklyn outreach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="help-item bg-[#F7F7F7] w-full rounded-b-2xl px-8 flex-col justify-start items-start inline-flex">
            <div className="w-full">
              <div className="p-4 sm:p-4 lg:p-8 gap-16 bg-white border-b border-[#C8C8C8] sm:justify-end">
                <div className="flex relative">
                  <div className="flex text-center text-sm font-semibold font-opensans leading-normal">
                    <p className="rounded-lg bg-[#D4FFEC] p-2 text-[#004905]">Help Received</p>
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
          <div className="outreaches py-8" />
            <div className="outreach-container rounded-tl-3xl rounded-tr-3xl py-8" style={{ background: 'linear-gradient(139.36deg, #D3C4FF 12.78%, #DEDCE4 90.44%)'}}>
            <div className="outreach-header flex justify-between items-center mb-6">
            <div className="outreach-title text-4xl px-10 font-bold text-black">Outreaches (12)</div>
          </div>
    <div className="outreach-description text-xl px-10 font-medium text-gray-800" style={{ background: 'linear-gradient(139.36deg, #D3C4FF 12.78%, #DEDCE4 90.44%)'}}>
      What are help requests and how can they help you? If you are ready to help people now, kindly sign up to outreaches
    </div>
  </div>
  {/* <div className="flex flex-col items-start justify-start absolute left-[-64px] top-[-64px] w-80 h-[268px]">
    <div className="flex flex-col space-y-5 items-start justify-start relative w-80 h-48 px-6 py-2">
      <div className="inline-flex space-x-4 items-start justify-between relative w-[272px] h-5">
        <div className="flex space-x-1 items-center justify-start relative w-[201px] h-5">
          <p className="w-[177px] h-5 text-sm font-medium leading-tight text-[#37168b]">03/12/2023 · 14:30</p>
        </div>
        <div className="flex space-x-1 items-center justify-start relative w-[98px] h-5">
          <p className="w-[76px] h-5 text-sm font-medium leading-tight text-[#37168b]">Queens, NY </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-start justify-start relative w-[272px] h-[84px]">
        <p className="w-[272px] h-8 text-2xl font-medium leading-loose text-[#212121]">Children Welfare in New York</p>
        <p className="w-[275px] h-11 text-sm leading-snug text-[#444746]">Tommy，a senior citizen in a wheelchair wearing a navy blue top and brown shoes.</p>
      </div>
      <div className="inline-flex space-x-2 items-center justify-start relative w-[272px] h-8">
        <div className="relative w-[88px] h-8"></div>
        <div className="relative w-[72px] h-8"></div>
        <p className="w-[51px] h-5 text-sm font-medium leading-tight text-[#444746]">+1 more</p>
      </div>
    </div>
  </div> */}
        </div>
      </div>
    </div>
  );
}

export default CommunityHub;
