"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

type MobileMenuProps = {
  links: { label: string; href: string }[];
  containerClasses: string;
  buttonClasses: string;
};

export default function MobileMenu({ links, containerClasses, buttonClasses }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 w-full flex flex-col items-center gap-6 py-8 shadow-xl rounded-b-xl border-t border-black/5 ${containerClasses}`}>
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-xl font-medium hover:opacity-70"
              onClick={() => setIsOpen(false)} 
            >
              {link.label}
            </a>
          ))}
          <Link href='/sign' className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${buttonClasses}`}>
            Sign the Petition
          </Link>
        </div>
      )}
    </div>
  );
}