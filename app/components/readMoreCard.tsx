import { ChevronRight } from 'lucide-react';
import React from 'react';

export default function ReadMoreCard({
    backgroundImg, 
    hoverBackgroundImg,
    title = "Water source", 
    description = "Provides clean water to millions of Filipinos...",
    classCss
} : {
    backgroundImg?: string;
    hoverBackgroundImg?: string;
    title?: string;
    description?: string;
    classCss?: string;
}){
    const defaultBgStyle = backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : undefined;
    const hoverBgStyle = hoverBackgroundImg ? { backgroundImage: `url(${hoverBackgroundImg})` } : undefined;

    return (
        <div className={`card-container group relative flex-1 h-[500px] md:h-[506px] rounded-4xl overflow-hidden shadow-lg ${classCss || ''}`}>

            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                style={defaultBgStyle} 
            />
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" 
                style={hoverBgStyle} 
            />

            <div className="readMoreCard-description relative z-10 h-full flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 pb-8 transition-all duration-300">
                <h1 className="text-2xl font-semibold drop-shadow-lg text-white text-center">{title}</h1>
                <p className="mt-2 text-center drop-shadow-md text-gray-200 line-clamp-2">{description}</p>
                <button className="mt-4 px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors w-full cursor-pointer flex items-center justify-center gap-1">
                    Read More <ChevronRight/>
                </button>
            </div>
        </div>
    );
}