"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/publications?query=${searchQuery}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section
      className={`flex flex-col justify-center sm:justify-end items-center min-h-[40dvh] md:min-h-[420px] lg:min-h-[520px] p-12 sm:p-12 md:p-18 bg-[url('/assets/publications-hero-img.png')]`}
    >
      <div
        className={`max-w-[940px] flex flex-col justify-center md:justify-end items-center gap-5 sm:gap-10 lg:gap-12 [&>*]:drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]`}
      >
        <div
          className={`text-center flex flex-col items-center gap-2 filter drop-shadow-2xl`}
        >
          <h1
            className={`text-[#C7E592] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}
          >
            Publications & News
          </h1>
          <p className={`text-[#E5E7DD] sm:text-xl md:text-2xl lg:text-3xl`}>
            Stay informed with the latest updates, research, and stories about
            Sierra Madre conservation efforts.
          </p>
        </div>

        <div
          className={`flex gap-2 w-full bg-white rounded-2xl text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4 lg:p-5`}
        >
          <img
            src="/assets/search-icon.png"
            alt="Search"
            className={`object-contain`}
          />
          <input
            type="text"
            placeholder="Search Publication Here"
            className={`w-full outline-none text-black`}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
