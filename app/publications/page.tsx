import Image from "next/image";
// Fonts
import { Instrument_Sans } from "next/font/google";
import { Hedvig_Letters_Sans } from "next/font/google";
import { Instrument_Serif } from "next/font/google";

//Components
import ArticleCard from "./components/ArticleCard";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
});
const hedvigLetterSans = Hedvig_Letters_Sans({
  weight: "400",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function Publications() {
  return (
    <main className={`
      ${hedvigLetterSans.className} relative overflow-hidden bg-white max-w-screen min-h-screen text-[#373F2A]  
      [&>section_h2]:${instrumentSans.className} [&>section_h2]:font-semibold [&>section_h2]:text-[#373F2A]`}
    >
      {/* Header */}

      {/* SEARCH BAR */}
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
          <form
            action="/"
            method="GET"
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
              className={`w-full outline-none`}
            />
          </form>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className={`min-h-screen p-8`}>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 text-center sm:text-left`}
        >
          Featured Articles
        </h2>
      </section>

      <hr className={`m-auto w-[97%]`} />

      {/* OWN PUBLICATIONS */}
      <section className={`min-h-screen`}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 text-center sm:text-left`}>
          Dive into Our Publications
        </h2>
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-2 max-w-7xl mx-auto mt-12`}>
          <ArticleCard id={101} variant="internal" />
          <ArticleCard id={102} variant="internal" />
          <ArticleCard id={104} variant="internal" />
        </div>
      </section>

      {/* SHARE YOUR STORY SECTION   */}
      <section className={`
        bg-radial from-[#FFF4E0] to-transparent px-2 py-8 flex flex-col justify-center items-center gap-4 
        sm:gap-10 sm:py-20`}>
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
          <div className={`
            flex flex-col gap-2 p-4 pb-8 bg-[#637D36] rounded-r-full text-[#E5E7DD] text-sm w-full
            sm:max-w-[860px] sm:flex-row sm:text-base sm:gap-5 sm:p-8 sm:pr-16
          `}>
            <img src="/assets/check-icon.svg" alt="check"
              className={`self-start mt-2 m-auto sm:mx-0`}
            />
            
            <div className={`max-w-[60ch] w-full`}>
              <h3 className={`
                ${instrumentSans.className} font-bold text-center text-xl 
                sm:text-3xl sm:text-left lg:text-4xl`}>
                Submission Guidelines
              </h3>
              <ul className={`
                  list-disc mt-2 text-xs flex flex-col gap-2 max-w-[30ch] m-auto
                  sm:text-base sm:mt-4 sm:ml-5 sm:max-w-none sm:mx-0
              `}>
                <li>Articles should be relevant to Sierra Madre conservation, environmental issues, or indigenous communities.</li>
                <li>Include your name, affiliation, and contact information.</li>
                <li>Attach your article in PDF or Word format.</li>
                <li>Include any relevant photos or supporting materials.</li>
              </ul>
            </div>
          </div>

          <div className={`flex flex-col justify-center items-center p-4 gap-4 text-center`}>
            <p className={`text-sm sm:text-base text-[#625541]`}>
              Send your submission here:
            </p>
            <button className={`
              flex gap-2 justify-center items-center bg-[#4D724D] text-white px-6 py-2 rounded-lg whitespace-nowrap text-sm 
              sm:text-base hover:bg-[#373F2A] transition-colors duration-300`}>
              <span>Submit your Article</span>
              <img src="/assets/send.svg" alt="" />
            </button>
          </div>
        </div>
</section>
    </main>
  );
}
