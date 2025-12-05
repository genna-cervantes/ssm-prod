'use client';

import { ArrowDown, ChevronDown } from 'lucide-react'; 
import { useState } from 'react';


export default function CardBlock({
  cardPosition,
  title,
  description
}: {
  cardPosition: string | number;
  title?: string;
  description?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
             <div className="card-block flex flex-col bg-[#FFF3DF80]">
                <div className="flex">
                    <div className="card-position flex-1 min-h-full py-8 px-6 md:py-[30px] max-w-5 md:max-w-10 md:px-20 bg-green-6 flex items-center justify-center text-4xl md:text-[72px] text-white">
                        {cardPosition}
                    </div>
                    <div className="card-description flex-1 grow py-4 px-5 md:py-6 md:px-10 flex justify-center items-center lg:flex-col lg:justify-start lg:items-start">
                        <h1 className="text-[#1A2F1A] text-l flex-2 lg:text-xl md:text-[30px] font-bold lg:mb-2">{title}</h1>
                        <p className="lg:block hidden text-green-8 md:text-base">{description}</p>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className='text-black grow flex-1 w-20 text-5xl lg:hidden'
                            aria-label="Toggle description"
                        >
                            <ChevronDown 
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </button>
                    </div>
                </div>
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <p className="text-green-8 text-sm md:text-base px-5 pb-4 pt-6">{description}</p>
                </div>
             </div>
        </div>
    )
}