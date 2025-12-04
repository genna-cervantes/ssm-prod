import React from 'react';

const StatisticsBar = () => {
  return (
    <div className="mx-auto left-0 right-0 w-[90%] md:w-3/4 px-4 mb-16 absolute -top-40 md:-top-32 z-20">
      <div className="max-w-[1200px] mx-auto bg-[#3E5C3E] rounded-[32px] p-6 md:py-16 md:px-12 grid grid-cols-2 md:flex justify-between items-start md:items-center gap-y-8 gap-x-4 md:gap-4 shadow-xl text-[#F2F0E9]">
        
        <div className="flex flex-col items-center gap-2 md:gap-4 col-span-1 flex-1 text-center">
          <div className="icon-container w-12 h-12 md:w-16 md:h-16 mb-1 md:mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#E8E6D9]">
              <path d="M11.25 4.5l-7.5 12h16.5l-3.75-6-3.75-6-1.5 0z" />
              <path opacity="0.6" d="M15.75 10.5l3.75 6h3.75l-7.5-12-2.25 3.6z" />
            </svg>
          </div>
          <p className="text-xs md:text-base font-medium tracking-wide opacity-90 h-8 md:h-auto flex items-center justify-center">Length of Sierra Madre</p>
          <h3 className="text-2xl md:text-6xl font-normal text-[#E8E6D9] mt-1">540km</h3>
        </div>

        <div className="hidden md:block w-px h-24 bg-[#E8E6D9]/20"></div>

        <div className="flex flex-col items-center gap-2 md:gap-4 col-span-1 flex-1 text-center">
          <div className="icon-container w-12 h-12 md:w-16 md:h-16 mb-1 md:mb-2 relative">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#E8E6D9]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.366-.366l-2.12 2.12M21 12h-3m.366 6.366l-2.12-2.12M12 21v-3m-6.366.366l2.12-2.12M3 12h3m-.366-6.366l2.12 2.12" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
          </div>
          <p className="text-xs md:text-base font-medium tracking-wide opacity-90 h-8 md:h-auto flex items-center justify-center max-w-[140px] md:max-w-none mx-auto leading-tight">Typhoon Winds Weakened by up to</p>
          <h3 className="text-2xl md:text-6xl font-normal text-[#E8E6D9] mt-1">13%</h3>
        </div>

        <div className="hidden md:block w-px h-24 bg-[#E8E6D9]/20"></div>

        <div className="flex flex-col items-center gap-2 md:gap-4 col-span-2 md:col-span-1 md:flex-1 text-center mt-2 md:mt-0">
          <div className="icon-container w-12 h-12 md:w-16 md:h-16 mb-1 md:mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#E8E6D9]">
              <circle cx="12" cy="12" r="10" className="opacity-30" />
              <path d="M12 7v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1.5" />
            </svg>
          </div>
          <p className="text-xs md:text-base font-medium tracking-wide opacity-90">Action Needed Now</p>
          <h3 className="text-3xl md:text-6xl font-normal text-[#A3D9A5] mt-1">Urgent!</h3>
        </div>

      </div>
    </div>
  );
};

export default StatisticsBar;