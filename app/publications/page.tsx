'use client';

import { useState, useMemo } from "react";
import ArticleCard from "./components/ArticleCard";
import { Header } from "../_components/Header";

// Fonts
import { Instrument_Sans, Hedvig_Letters_Sans, Instrument_Serif } from "next/font/google";
import { Publication } from "@/db/services/publications.service";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });
const hedvigLetterSans = Hedvig_Letters_Sans({ weight: "400", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

// Mock data - External Publications (featured articles)
const MOCK_EXTERNAL_PUBLICATIONS: Publication[] = [
  // {
  //   id: 1,
  //   title: "Why Should We Protect The Sierra Madre?",
  //   summary:
  //     "The Sierra Madre acts as the backbone of Luzon, protecting millions from typhoons. This article explores the ecological significance...",
  //   author: "Rina Jimenez",
  //   datePublished: "2024-03-15",
  //   articleLink: "https://external-news-site.com/protect-sierra-madre",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop",
  //   category: "Opinion",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 2,
  //   title: "Sierra Madre Network Alliance Formed",
  //   summary:
  //     "A new coalition has risen to tackle the pressing issues of deforestation and illegal mining in the region.",
  //   author: "Alex Gamon",
  //   datePublished: "2023-05-22",
  //   articleLink: "/internal-news/alliance-formed",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070&auto=format&fit=crop",
  //   category: "News",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 3,
  //   title: "Save Sierra Madre Harmony Alliance",
  //   summary:
  //     "Local communities gather to celebrate the 10th anniversary of the conservation pact signed by indigenous leaders.",
  //   author: "Dept. of Agriculture",
  //   datePublished: "2024-09-21",
  //   articleLink: "https://govt-site.gov.ph/news",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  //   category: "Event",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 4,
  //   title: "Stop Kaliwa Dam groups call on Save Sierra Madre Day",
  //   summary:
  //     "Protesters marched to the DENR office to demand the cancellation of the controversial dam project.",
  //   author: "ABS-CBN News",
  //   datePublished: "2022-09-26",
  //   articleLink: "https://news.abs-cbn.com/example",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1596237563267-845d1052210c?q=80&w=2070&auto=format&fit=crop",
  //   category: "News",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
];

// Mock data - Internal Publications
const MOCK_INTERNAL_PUBLICATIONS: Publication[] = [
  // {
  //   id: 101,
  //   title: "Environmental Group Condemns Mining",
  //   content:
  //     "The Save Sierra Madre Network Alliance (SSMNA) strongly condemns the recent approval of small-scale mining permits...",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-07-01",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 102,
  //   title: "Disenchantment in the Uplands",
  //   content:
  //     "An in-depth look at the changing socio-economic landscape of the upland communities in Rizal and Quezon.",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-07-01",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 103,
  //   title: "Environmental Groups Summoned Again",
  //   content:
  //     "Legal challenges mount as environmental defenders face new hurdles in their fight for preservation.",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-09-21",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=2076&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 104,
  //   title: "News Article on Paje's Confirmation",
  //   content:
  //     "The confirmation of the new DENR secretary has sparked debate among conservationist circles regarding future policies.",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-06-30",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 105,
  //   title: "Unregulated Small Scale Gold Mining",
  //   content:
  //     "A special report on the mercury contamination risks posed by unregulated gold panning in river tributaries.",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-07-01",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1574972748057-0b42f38d35b9?q=80&w=2070&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 106,
  //   title: "Environmental Groups Expose Corruption",
  //   content:
  //     "Whistleblowers have come forward with documents alleging irregularities in logging permit issuances.",
  //   author: "Elizabeth Carranza",
  //   datePublished: "2024-10-14",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1976&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 107,
  //   title: "Stop Sierra Madre Dam Projects",
  //   content:
  //     "The Kaliwa Dam project continues to be a flashpoint for conflict between the government and indigenous groups.",
  //   author: "Delfin T. Mallari Jr.",
  //   datePublished: "2024-10-18",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1533282960533-51328aa49826?q=80&w=2042&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
  // {
  //   id: 108,
  //   title: "Sierra Madre dams ban small quarries",
  //   content:
  //     "New legislation aims to halt quarrying activities that threaten the structural integrity of the watershed.",
  //   author: "Delfin T. Mallari Jr.",
  //   datePublished: "2024-11-08",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1621451537084-482c73071a0b?q=80&w=1974&auto=format&fit=crop",
  //   authorDP: "/assets/profile-placeholder.png",
  // },
];

export default function Publications() {
  // Search query & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // Filter Logic 
  const { filteredExternal, filteredInternal }: { filteredExternal: Publication[], filteredInternal: Publication[] } = useMemo(() => {
    if (!searchQuery) {
      return { 
        filteredExternal: MOCK_EXTERNAL_PUBLICATIONS, 
        filteredInternal: MOCK_INTERNAL_PUBLICATIONS 
        // filteredExternal: [],
        // filteredInternal: [],
      };
    }
    
    const query = searchQuery.toLowerCase();
    const matches = (text: string | undefined) => text && text.toLowerCase().includes(query);
    const filterFn = (article: { title?: string; summary?: string; content?: string; author?: string }) => 
      matches(article.title) || 
      matches(article.summary) || 
      matches(article.content) || 
      matches(article.author);

    return {
      // filteredExternal: MOCK_EXTERNAL_PUBLICATIONS.filter(filterFn),
      // filteredInternal: MOCK_INTERNAL_PUBLICATIONS.filter(filterFn),
      filteredExternal: [],
      filteredInternal: [],
    };
  }, [searchQuery]);

  // Pagination Logic
  const visibleInternalArticles = filteredInternal.slice(0, visibleCount);

  // Search & Pagination Handlers
  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(4); 
  };

  return (
    <main className={`
      ${hedvigLetterSans.className} relative overflow-hidden bg-white max-w-screen min-h-screen text-[#373F2A]  
      [&>section_h2]:${instrumentSans.className} [&>section_h2]:font-semibold [&>section_h2]:text-[#373F2A]`}
    >
      {/* HEADER */}
      <Header variant="filled" />

      {/* SEARCH BAR SECTION */}
      <section className={`flex flex-col justify-center sm:justify-end items-center min-h-[40dvh] md:min-h-[420px] lg:min-h-[520px] p-12 sm:p-12 md:p-18 bg-[url('/assets/publications-hero-img.png')]`}>
        <div className={`max-w-[940px] flex flex-col justify-center md:justify-end items-center gap-5 sm:gap-10 lg:gap-12 [&>*]:drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]`}>
          <div className={`text-center flex flex-col items-center gap-2 filter drop-shadow-2xl`}>
            <h1 className={`text-[#C7E592] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}>
              Publications & News
            </h1>
            <p className={`text-[#E5E7DD] sm:text-xl md:text-2xl lg:text-3xl`}>
              Stay informed with the latest updates, research, and stories about Sierra Madre conservation efforts.
            </p>
          </div>
          
          <div className={`flex gap-2 w-full bg-white rounded-2xl text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4 lg:p-5`}>
            <img src="/assets/search-icon.png" alt="Search" className={`object-contain`} />
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

      {/* FEATURED ARTICLES */}
      <section className={`px-6 py-10 sm:px-10 sm:py-16`}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left`}>
          Featured Articles
        </h2>

        {filteredExternal.length === 0 && (
          <div className="text-center py-10 opacity-60">No articles found matching &quot;{searchQuery}&quot;</div>
        )}

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto mt-8`}>
          {filteredExternal.map((article) => (
            <ArticleCard key={article.id} article={{...article, thumbnail: '', authorDP: ''}}  variant="external" />
          ))}
        </div>
      </section>

      {filteredExternal.length > 0 && filteredInternal.length > 0 && (
        <hr className={`m-auto w-[97%]`} />
      )}

      {/* INTERNAL PUBLICATIONS */}
      <section className={`px-6 py-10 sm:px-10 sm:py-16`}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left`}>
          Dive into Our Publications
        </h2>

        {filteredInternal.length === 0 && (
          <div className="text-center py-10 opacity-60">No articles found matching &quot;{searchQuery}&quot;</div>
        )}

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto mt-8`}>
          {visibleInternalArticles.map((article) => (
            <ArticleCard key={article.id} article={{...article, thumbnail: '', authorDP: ''}} variant="internal" />
          ))}
        </div>

        {visibleCount < filteredInternal.length && (
          <button 
            onClick={handleLoadMore}
            className={`
              flex gap-2 justify-center items-center bg-[#4D724D] text-white min-w-[25ch] px-4 py-2 rounded-lg whitespace-nowrap text-sm mx-auto mt-12
              sm:text-base hover:bg-[#373F2A] transition-colors duration-300`
            }>
            Load More
          </button>
        )}
      </section>

      {/* SHARE YOUR STORY */}
      <section className={`bg-radial from-[#FFF4E0] to-transparent px-2 py-8 flex flex-col justify-center items-center gap-4 sm:gap-10 sm:py-20`}>
        <div className={`px-4 text-center`}>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}>
            Share Your{" "}<span className={`${instrumentSerif.className} italic`}>Story</span>
          </h2>
          <p className={`max-w-[60ch] text-sm sm:text-base mt-4`}>
            Have insights, research, or stories about Sierra Madre? We welcome
            contributions from community members, researchers, and advocates.
            Share your article or publication with us.
          </p>
        </div>
        <div className={`flex flex-col items-center justify-center gap-4 w-full sm:flex-row`}>
          <div className={`flex flex-col gap-2 p-4 pb-8 bg-[#637D36] rounded-r-full text-[#E5E7DD] text-sm w-full sm:max-w-[860px] sm:flex-row sm:text-base sm:gap-5 sm:p-8 sm:pr-16`}>
            <img src="/assets/check-icon.svg" alt="check" className={`self-start mt-2 m-auto sm:mx-0`} />
            <div className={`max-w-[60ch] w-full`}>
              <h3 className={`${instrumentSans.className} font-bold text-center text-xl sm:text-3xl sm:text-left lg:text-4xl`}>Submission Guidelines</h3>
              <ul className={`list-disc mt-2 text-xs flex flex-col gap-2 max-w-[30ch] m-auto sm:text-base sm:mt-4 sm:ml-5 sm:max-w-none sm:mx-0`}>
                <li>Articles should be relevant to Sierra Madre conservation, environmental issues, or indigenous communities.</li>
                <li>Include your name, affiliation, and contact information.</li>
                <li>Attach your article in PDF or Word format.</li>
                <li>Include any relevant photos or supporting materials.</li>
              </ul>
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center p-4 gap-4 text-center`}>
            <p className={`text-sm sm:text-base text-[#625541]`}>Send your submission here:</p>
            <a href="mailto:css.cics@ust.edu.ph" className={`flex gap-2 justify-center items-center bg-[#4D724D] text-white px-6 py-2 rounded-lg whitespace-nowrap text-sm sm:text-base hover:bg-[#373F2A] transition-colors duration-300`}>
              <span>css.cics@ust.edu.ph</span>
              <img src="/assets/send.svg" alt="" />
            </a>
          </div>  
        </div>
      </section>
    </main>
  );
}
