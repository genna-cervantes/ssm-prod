"use client"; 

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; 

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathName = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "/dashboard/dashboard-icon.svg"
    },
    {
      name: "Signee Approvals",
      href: "/approvals",
      icon: "/dashboard/signee-icon.svg"
    },{
      name: "Publications",
      href: "/publications",
      icon: "/dashboard/publication-icon.svg"
    },
    {
      name: "Users",
      href: "/users",
      icon: "/dashboard/user-icon.svg"
    }
  ]

  return(
    <aside className={`flex flex-col justify-between h-[1080px] bg-gradient-to-b from-[#1A2F1A] to-[#345C34] rounded-tr-[40px] rounded-br-[30px] p-[40px] font-inter text-white font-normal transition-all duration-300 ease-in-outtransition-all duration-300 ease-in-out ${isCollapsed ? "w-[140px]" : "w-[366px]"} `}>
      <div className={
        ` flex border-b-2 border-[#ffffff41] pb-5 items-center overflow-hidden 
          ${isCollapsed ? "flex-col gap-4 justify-center": "justify-between"}
        `}
        
        >
        <div className="relative w-[47px] h-[47px] bg-[#1A2F1A] rounded-full">
          <Image
            src="/dashboard/logo.svg"
            alt="Sidebar Icon"
            fill
            className="object-contain"
          />
        </div>
        <span className={`
          text-lg
          font-light
          whitespace-nowrap
          overflow-hidden
          ${isCollapsed ? "hidden" : "block"}
          `}>
            SAVESIERRAMADRE
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Image
           src="/dashboard/view-icon.svg"
           alt="View icon"
           height={20}
           width={20}
           className="object-contain cursor-pointer"
          />
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-7 py-6 overflow-y-auto text-2xl">
        
        {navItems.map((item) => {
          const isActive = item.name === pathName;

          return (
            <Link
              key={item.href}
              href= "#"
              className={`
                flex items-center font-instrument p-3 rounded-lg transition-all duration-300 ease-in-out
                hover:bg-[#4c595f77] hover:text-white 
                
                /* Layout Logic */
                ${isCollapsed ? "justify-center" : "justify-start gap-4"}
                
                /* Active State Logic */
                ${isActive ? "bg-[#123112] text-white font-medium" : "text-gray-300"}
              `}
            >
              
              <div className="relative w-6 h-6 shrink-0">
                <Image 
                  src={item.icon} 
                  alt={item.name} 
                  fill 
                  className="object-contain" 
                />
              </div>

              <span 
                className={`
                  whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}
                `}
              >
                {item.name}
              </span>

            </Link>
          );
        })}

      </nav>

      <div className="flex border-t-2 border-[#ffffff41] pt-5 ">
        <button
          onClick={() => console.log("Logging out...")}
          className={
          `flex items-center gap-5 items-center p-2 rounded-lg 
          transition-all duration-300 ease-in-out cursor-pointer
          active:bg-[#1A2F1A] 
          hover:bg-[#1A2F1A80]/50

          ${isCollapsed ? "m-auto": "ml-auto"}
        `}
        >
          <span className={`
          text-2xl
          font-medium
          whitespace-nowrap
          transition-all duration-300 origin-left
          ${isCollapsed ? "hidden" : "block"}
          `}>
            Logout
        </span>
          <Image 
            src="/dashboard/logout-icon.svg"
            alt="Logout icon"
            height={24}
            width={24}
            className="object-contain"
          />
        </button>
      </div>
    </aside>
  );

}