"use client"; // Required for state (useState) in Next.js

import React, { useState } from 'react';
import Image from 'next/image';

export const Header = ({ 
  variant = 'transparent', 
  logoText = "Save Sierra Madre",
  links = ["About SSMNAI", "Publications", "Signee Notes"] 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isFilled = variant === 'filled';

  const containerClasses = isFilled 
    ? "bg-[#386641] text-white" 
    : "bg-white text-[#487948]";
    
  const buttonClasses = isFilled
    ? "bg-[#e9f5db] text-[#1a2e1c] hover:bg-white"
    : "bg-[#457b4d] text-white hover:bg-[#386641]";

  const textColor = isFilled ? "text-white" : "text-black/80 hover:text-black";

  const BurgerIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <header className={`w-full mt-5 py-6 px-8 md:px-12 flex items-center justify-between transition-colors relative z-50 rounded-xl ${containerClasses}`}>
      
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-14">
            <Image 
                src="/logo.png" 
                alt="SSMNAI Logo" 
                fill 
                className="object-contain"
                priority
            />
        </div>
        <span className={`hidden md:flex font-bold text-xl md:text-2xl tracking-tight ${isFilled ? 'text-white' : 'text-[#487948]'}`}>
          {logoText}
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8 md:gap-12"> 
        {links.map((link) => (
          <a 
            key={link} 
            href="#" 
            className={`text-lg font-medium transition-colors ${textColor}`}
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center">
        
        <button 
            className="block md:hidden p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>

        <div className="hidden md:block">
            <button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${buttonClasses}`}>
                Sign the Petition
            </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`absolute top-full left-0 w-full flex flex-col items-center gap-6 py-8 shadow-xl md:hidden rounded-b-xl border-t border-black/5 ${containerClasses}`}>
            {links.map((link) => (
                <a key={link} href="#" className="text-xl font-medium hover:opacity-70">
                    {link}
                </a>
            ))}
            <button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${buttonClasses}`}>
                Sign the Petition
            </button>
        </div>
      )}

    </header>
  );
};