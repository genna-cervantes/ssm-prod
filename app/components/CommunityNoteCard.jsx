import React from 'react';

const CommunityNoteCard = ({ quote, author, date }) => {
  return (
    <div className="bg-[#F2EFE5] p-6 rounded-xl shadow-lg flex flex-col gap-4 h-full border border-transparent hover:border-green-6/30 transition-all duration-300 hover:shadow-xl">
      
      {/* Header: Quote Icon & Date */}
      <div className="flex justify-between items-start text-green-6">
         <span className="text-4xl font-serif leading-none">❝</span>
         <span className="text-[10px] uppercase tracking-widest opacity-60 font-sans mt-2">{date}</span>
      </div>

      {/* Quote Body */}
      {/* flex-grow ensures the footer is pushed to the bottom if text length varies */}
      <div className="grow">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-serif italic">
           "{quote}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-2">
        <div className="w-full h-px bg-green-6/20 mb-3"></div>
        <p className="text-center text-green-6 font-serif text-sm font-semibold">
          - {author}
        </p>
      </div>

    </div>
  );
};

export default CommunityNoteCard;