import React from 'react';

const CommunityNoteCard = ({ quote, author, date, isActive = true }) => {
  return (
    <div className={`
      bg-[#F2EFE5] flex-1 grow h-[350px] p-5 lg:p-6 rounded-xl 
      flex flex-col gap-4 border border-transparent 
      transition-all duration-300
      ${isActive ? 'bg-[#F2EFE5] border-green-6/10' : 'bg-[#F2EFE5]/90'}
    `}>
      
      <div className="flex justify-between items-start text-green-6">
         <span className="text-4xl font-serif leading-none">❝</span>
         <span className="text-[10px] uppercase tracking-widest opacity-60 font-sans mt-2">{date}</span>
      </div>

      <div className="grow overflow-hidden">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed font-serif italic line-clamp-6">
           "{quote}"
        </p>
      </div>

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