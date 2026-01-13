import type { Metadata } from "next";
import ArticleCard from "../_components/ArticleCard";
import { Header } from "../_components/Header";
import Footer from "../_components/Footer";
import SearchBar from "./_components/SearchBar";

// Fonts
import { Instrument_Sans, Hedvig_Letters_Sans, Instrument_Serif } from "next/font/google";
import { searchPublicationAction } from "@/src/actions/publications.actions";
import { searchArticleAction } from "@/src/actions/articles.actions";

export const metadata: Metadata = {
  title: "Publications & Articles | Save Sierra Madre",
  description: "Explore research, articles, and publications about Sierra Madre conservation, environmental issues, and indigenous communities. Stay informed about the latest developments in protecting our natural heritage.",
  keywords: ["Sierra Madre publications", "environmental research", "conservation articles", "Philippines environment", "Sierra Madre news", "indigenous communities"],
  openGraph: {
    title: "Publications & Articles | Save Sierra Madre",
    description: "Explore research, articles, and publications about Sierra Madre conservation, environmental issues, and indigenous communities.",
    type: "website",
    images: ["/assets/signee-notes-add-your-voice.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications & Articles | Save Sierra Madre",
    description: "Explore research, articles, and publications about Sierra Madre conservation, environmental issues, and indigenous communities.",
    images: ["/assets/signee-notes-add-your-voice.png"],
  },
};

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });


export default async function Publications({ searchParams }: { searchParams: { query: string, publicationPage: string, publicationLimit: string } }) {
  const query = searchParams.query || "";
  const page = Number(searchParams.publicationPage) || 1;
  const limit = Number(searchParams.publicationLimit) || 9;

  const { ok: publicationOk, data: publicationData } = await searchPublicationAction(query, page, limit);
  const { ok: articleOk, data: articleData } = await searchArticleAction(query, page, limit);


  return (
    <main className={`
      relative overflow-hidden bg-white max-w-screen min-h-screen text-[#373F2A]  
      [&>section_h2]:${instrumentSans.className} [&>section_h2]:font-semibold [&>section_h2]:text-[#373F2A]`}
    >
      {/* HEADER */}
      <Header 
        variant="filled" 
        noMargin
      />

      {/* SEARCH BAR SECTION */}
      <SearchBar />
      

      {/* FEATURED ARTICLES */}
      <section className={`px-6 py-10 sm:px-10 sm:py-16`}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left`}>
          Featured Articles
        </h2>

        {articleData && articleData.length === 0 && (
          <div className="text-center py-10 opacity-60">No articles found {query ? `matching &quot;${query}&quot;` : ''}</div>
        )}

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto mt-8`}>
          {articleData && articleData.map((article) => (
            <ArticleCard key={article.id} article={{...article, thumbnail: '', authorDP: ''}}  variant="external" />
          ))}
        </div>
      </section>

      {articleData && articleData.length > 0 && (
        <hr className={`m-auto w-[97%]`} />
      )}

      {/* INTERNAL PUBLICATIONS */}
      <section className={`px-6 py-10 sm:px-10 sm:py-16`}>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left`}>
          Dive into Our Publications
        </h2>

        {publicationData && publicationData.length === 0 && (
          <div className="text-center py-10 opacity-60">No publications found {query ? `matching &quot;${query}&quot;` : ''}</div>
        )}

        {publicationOk === false && <p className="text-center py-10 opacity-60">Failed to fetch publications</p>}

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto mt-8`}>
          {publicationData && publicationData.map((article) => (
            <ArticleCard key={article.id} article={{...article, thumbnail: '', authorDP: ''}} variant="internal" />
          ))}
        </div>
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

      {/* --- FOOTER --- */}
      <Footer />
    </main>
  );
}
