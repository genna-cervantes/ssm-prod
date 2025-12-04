import Image from 'next/image';
import { Header } from "./components/Header";
import PetitionProgress from "./components/PetitionProgress";
import CommunityNoteCard from "./components/CommunityNoteCard"; 

export default function Home() {
  
  const notes = [
    {
      date: "Oct 8, 2025",
      quote: "We must act now before it's too late. The forest is our life.",
      author: "Anonymous"
    },
    {
      date: "Oct 9, 2025",
      quote: "Losing the Sierra Madre means losing our natural defense against climate change.",
      author: "Anonymous"
    },
    {
      date: "Oct 10, 2025",
      quote: "As a hiker, I've seen its beauty. We must save this ecosystem.",
      author: "Anonymous"
    },
    {
      date: "Oct 11, 2025",
      quote: "Future generations deserve to see these mountains green and thriving.",
      author: "Anonymous"
    },
    {
      date: "Oct 12, 2025",
      quote: "It provides water for millions. We cannot afford to let it fall.",
      author: "Anonymous"
    }
  ];

  return (
    <div className="w-full font-sans">
      
      {/* hero section */}
      <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
             <Image src="/images/hero-bg.jpg" alt="Bg" fill className="object-cover object-center md:object-top" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-white from-10% via-white/60 via-40% to-transparent"></div>
        <Header />
        <main className="flex flex-col w-full grow container mx-auto px-4 relative z-10">      
            <div className="grow flex flex-col items-center justify-center text-center gap-8 md:gap-10 pt-20 pb-10">
              <div className="hero-title space-y-2 md:space-y-4">
                <p className="text-xl md:text-3xl font-medium text-gray-700 tracking-wide">Save Millions of Lives</p>
                <h1 className="text-5xl md:text-7xl lg:text-[110px] bg-linear-to-r from-green-6 to-[#68B668] bg-clip-text text-transparent font-extrabold leading-[1.1] tracking-tight py-2">Save Sierra Madre Now.</h1>
                <p className="text-lg md:text-3xl text-gray-700 font-medium">Without it, our future is at risk</p>
              </div>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <button className="bg-green-6 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#3a583a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">Sign the petition now</button>
                <button className="bg-white/80 backdrop-blur-sm border-2 border-green-6 text-green-6 px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-6 hover:text-white transition-all w-full sm:w-auto">Learn more</button>
              </div>
            </div>
            <div className="w-full flex flex-col items-center pb-10 md:pb-20 gap-10">
               {/* Note Grid */}
               <div className="w-full md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center px-4 md:px-0 hidden">
                  <div className="flex flex-col items-center justify-end gap-2">
                    <p className="text-white text-lg md:text-xl font-medium drop-shadow-md">The lungs of Luzon</p>
                    <div className="h-8 md:h-24 w-px border-l-2 border-dashed border-white/70"></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-2 md:-mt-12"> 
                    <p className="text-white text-lg md:text-xl font-medium drop-shadow-md max-w-[300px]">Home to millions of species and indigenous communities.</p>
                    <div className="h-12 md:h-32 w-px border-l-2 border-dashed border-white/70"></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-2">
                    <p className="text-white text-lg md:text-xl font-medium drop-shadow-md max-w-[250px]">Protector from typhoons, and provider of clean water</p>
                    <div className="h-8 md:h-20 w-px border-l-2 border-dashed border-white/70"></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  </div>
               </div>
               <div className="w-full max-w-5xl px-4">
                  <div className="backdrop-blur-md text-2xl bg-green-8/60 p-6 md:p-12 rounded-2xl shadow-2xl border border-white/10 flex justify-center">
                    <PetitionProgress signedCount={78041} goalCount={128095} />
                  </div>
               </div>
            </div>
        </main> 
      </section>

      {/* problem section kaliwa dam */}
      <section className="problem min-h-screen bg-linear-to-b from-[#1A2F1A] to-[#396839] pt-20 flex flex-col w-full items-center justify-start gap-16 text-white">
          <div className="problem-title flex flex-col items-center text-center px-4">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
               But Sierra Madre is <span className="text-red-400">Under Threat</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 max-w-5xl leading-relaxed mb-10">
               The Sierra Madre faces severe threats from illegal logging, mining, destructive agricultural practices...
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                <button className="bg-white text-black px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-200 transition-colors shadow-lg">Read more &gt;</button>
                <button className="bg-transparent border-white border-2 px-12 text-white py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-black transition-colors">Listen</button>
            </div>
          </div>
          <div className="w-full flex flex-col shadow-2xl mx-auto">
            <div className="relative w-full h-[600px] md:h-[700px] bg-gray-900 overflow-hidden group">
                <Image src="/images/kaliwa-dam-main-pic.jpg" alt="Construction of Kaliwa Dam" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 flex flex-col items-center z-10 w-3/4 md:w-max">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-xl">
                        <p className="text-white italic text-sm md:text-lg leading-relaxed">"Construction of the <br/> <span className="italic">KALIWA DAM</span> <br/> (captured by Keith Anthony S. Fabro)"</p>
                    </div>
                    <div className="h-24 w-0.5 bg-white/70"></div>
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-800 gap-px border-t border-gray-800">
              <div className="relative w-full h-[200px] md:h-[250px] bg-black group overflow-hidden">
                <Image src="/images/kaliwa-dam-sub-pic.jpg" alt="bg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-2">9,700</h3>
                    <p className="text-gray-300 uppercase tracking-widest text-xs md:text-sm font-semibold">Hectares of forest at Risk</p>
                </div>
              </div>
              <div className="relative w-full h-[200px] md:h-[250px] bg-black group overflow-hidden">
                <Image src="/images/kaliwa-dam-sub-pic.jpg" alt="bg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-2">126</h3>
                    <p className="text-gray-300 uppercase tracking-widest text-xs md:text-sm font-semibold">Species to Lose Habitat</p>
                </div>
              </div>
              <div className="relative w-full h-[200px] md:h-[250px] bg-black group overflow-hidden">
                <Image src="/images/kaliwa-dam-sub-pic.jpg" alt="bg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-2">2,492</h3>
                    <p className="text-gray-300 uppercase tracking-widest text-xs md:text-sm font-semibold">Households Affected</p>
                </div>
              </div>
              <div className="relative w-full h-[200px] md:h-[250px] bg-black group overflow-hidden">
                <Image src="/images/kaliwa-dam-sub-pic.jpg" alt="bg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-2">1,485</h3>
                    <p className="text-gray-300 uppercase tracking-widest text-xs md:text-sm font-semibold">Families Displaced</p>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* community notes section */}
      <section className="cta-3-section relative py-24 bg-brown-1 flex flex-col items-center justify-center overflow-hidden">
           <div className="cta-3-text text-center mb-16 px-4 flex flex-col items-center w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-linear-to-r from-[#5D875C] to-[#94B754] px-12 py-6 inline-block shadow-md tracking-tight">
                A Paradise Worth Saving
            </h2>
            <p className="text-xl text-green-5 max-w-2xl mx-auto font-serif italic">
                Read what others are saying about Sierra Madre and share your own thoughts and concerns.
            </p>
          </div>

          <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
            
            {notes.map((note, index) => (
                <CommunityNoteCard 
                    key={index}
                    date={note.date}
                    quote={note.quote}
                    author={note.author}
                />
            ))}

          </div>

          <button className="mt-16 px-10 py-3 border border-green-6 text-green-6 rounded-lg font-medium hover:bg-green-6 hover:text-white transition-colors uppercase tracking-widest text-sm">
             View Community Notes
          </button>

      </section>
      
    </div>
  );
}