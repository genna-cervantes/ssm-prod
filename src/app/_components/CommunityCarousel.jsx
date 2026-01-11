'use client';
import React, { useState } from 'react';
import CommunityNoteCard from './CommunityNoteCard';

export default function CommunityCarousel({ notes }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getWrappedIndex = (index) => {
    const len = notes.length;
    return ((index % len) + len) % len;
  };

//   for future purposes just incase
  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const positions = [-2, -1, 0, 1, 2];

  return (
    <div className="relative w-full max-w-[1200px] h-[450px] mx-auto flex items-center justify-center">
      


      {/* The Carousel Track */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {positions.map((offset) => {
          const itemIndex = getWrappedIndex(activeIndex + offset);
          const note = notes[itemIndex];
          

          const isCenter = offset === 0;
          const dist = Math.abs(offset); 


          const zIndex = 30 - dist * 10;
          
          const scale = 1 - dist * 0.1;
          
          const opacity = 1 - dist * 0.25; 
          
          const translateX = offset * 180; 

          const blur = dist === 0 ? 'blur-none' : dist === 1 ? 'blur-[1px]' : 'blur-[2px]';

          return (
            <div
              key={itemIndex + '-' + offset} 
              onClick={() => setActiveIndex(activeIndex + offset)} 
              className={`absolute top-1/2 left-1/2 w-full max-w-[250px] md:max-w-[350px] transition-all duration-500 ease-in-out cursor-pointer ${blur}`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
              }}
            >

              <div className={`${isCenter ? 'shadow-2xl' : 'shadow-lg pointer-events-none'}`}>
                 <CommunityNoteCard 
                    date={note.date} 
                    quote={note.quote} 
                    author={note.author} 
                    isActive={isCenter} 
                 />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}