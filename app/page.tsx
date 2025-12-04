"use client"
import Image from 'next/image';
import { useState } from "react";
import { Header } from "./components/Header";
import PetitionProgress from "./components/PetitionProgress";
import CommunityNoteCard from "./components/CommunityNoteCard"; 
import ReadMoreCard from './components/readMoreCard';
import CardBlock from './components/card-block';
import TopicCard from "./components/TopicCard";

export default function Home() {
  const [secondCardBg, setSecondCardBg] = useState("/images/sierrabest.jpg");

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
             <Image src="/images/hero-bg.jpg" alt="Bg" fill className="object-cover object-center md:object-top mt-30" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-white from-10% via-white/60 via-40% to-transparent"></div>
        <Header />
        <main className="flex flex-col w-full grow container mx-auto px-4 relative z-10">      
            <div className="grow flex flex-col items-center justify-center text-center gap-8 md:gap-10 pt-10 pb-10">
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
                    <p className="text-green-5 text-lg md:text-xl font-medium drop-shadow-md">The lungs of Luzon</p>
                    <div className="h-8 md:h-24 w-px border-l-2 border-dashed border-green-5/70"></div>
                    <div className="w-3 h-3 bg-green-5 rounded-full shadow-[0_0_10px_green-5]"></div>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-2 md:-mt-12"> 
                    <p className="text-green-5 text-lg md:text-xl font-medium drop-shadow-md max-w-[300px]">Home to millions of species and indigenous communities.</p>
                    <div className="h-12 md:h-32 w-px border-l-2 border-dashed border-green-5/70"></div>
                    <div className="w-3 h-3 bg-green-5 rounded-full shadow-[0_0_10px_green-5]"></div>
                  </div>
                  <div className="flex flex-col items-center justify-end gap-2">
                    <p className="text-green-5 text-lg md:text-xl font-medium drop-shadow-md max-w-[250px]">Protector from typhoons, and provider of clean water</p>
                    <div className="h-8 md:h-20 w-px border-l-2 border-dashed border-green-5/70"></div>
                    <div className="w-3 h-3 bg-green-5 rounded-full shadow-[0_0_10px_green-5]"></div>
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

      {/* why sierra madre matters section */}
      <main className="container w-full min-h-screen py-10 md:py-[100px] px-4 md:px-[50px] bg-white">
      <header className="header-container w-full py-8 flex flex-col items-center text-[#373F2A] justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-semibold">Why Sierra Madre Matters</h1>
        <p className="mt-2 text-lg text-[#625541]">
          This ancient rainforest is more than just trees. It's a lifeline for millions.
        </p>
      </header>

      <section className="flex flex-col lg:flex-row justify-center items-center gap-5 flex-1">
        <ReadMoreCard 
        backgroundImg="/images/mellisa_typhoon.jpg" />
        <div
          className="flex-1 flex w-full lg:w-auto"
          onMouseEnter={() => setSecondCardBg("/images/mellisa_typhoon.jpg")}
          onMouseLeave={() => setSecondCardBg("/images/sierrabest.jpg")}
        >
          <ReadMoreCard backgroundImg={secondCardBg} />
        </div>
        <ReadMoreCard 
        backgroundImg="/images/mellisa_typhoon.jpg" />
        <ReadMoreCard 
        backgroundImg="/images/mellisa_typhoon.jpg" />
      </section>
    </main>

      {/* problem section kaliwa dam */}
      <section className="problem min-h-screen bg-linear-to-b from-[#1A2F1A] to-[#396839] pt-20 flex flex-col w-full items-center justify-start gap-16 text-white">
          <div className="problem-title flex flex-col items-center text-center px-4">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
               But Sierra Madre is <span className="text-red-400">Under Threat</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 max-w-5xl leading-relaxed mb-10">
               The Sierra Madre faces severe threats from illegal logging, mining, destructive agricultural practices, and infrastructure projects, which together cause forest degradation, loss of biodiversity, and weaken its vital role as a natural barrier protecting communities from storms.
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

      {/* why we must act now section */}
      <div className="why-we-must-act-now-div container w-full min-h-screen py-10 md:py-[100px] px-4 md:px-[50px] bg-[#FFFCF5]">
      
      <h1 className="text-[#4D724D] text-4xl md:text-[72px] font-bold flex items-center justify-center m-8 md:m-14 text-center">Why Must We Act Now</h1>
      <div className="card-block-container flex flex-col gap-6 md:gap-10">
        <CardBlock
        cardPosition="1"
        title="Protects Us from Typhoons"
        description="The Sierra Madre is our first line of defense against typhoons in the Philippines as it weakens the strong winds and heavy rain. Without it, storms would continue to cause greater destruction to countless homes, farms, and infrastructures, pushing us to an impoverished life."
        />
        <CardBlock
        cardPosition="1"
        title="Protects Us from Typhoons"
        description="The Sierra Madre is our first line of defense against typhoons in the Philippines as it weakens the strong winds and heavy rain. Without it, storms would continue to cause greater destruction to countless homes, farms, and infrastructures, pushing us to an impoverished life."
        />
        <CardBlock
        cardPosition="1"
        title="Protects Us from Typhoons"
        description="The Sierra Madre is our first line of defense against typhoons in the Philippines as it weakens the strong winds and heavy rain. Without it, storms would continue to cause greater destruction to countless homes, farms, and infrastructures, pushing us to an impoverished life."
        />
        <CardBlock
        cardPosition="1"
        title="Protects Us from Typhoons"
        description="The Sierra Madre is our first line of defense against typhoons in the Philippines as it weakens the strong winds and heavy rain. Without it, storms would continue to cause greater destruction to countless homes, farms, and infrastructures, pushing us to an impoverished life."
        />
      </div>
      <div>
        <h1 className="title-divider font-semibold text-[24px] leading-[32px] my-8 text-[#4D724D]">What You Should Know</h1>
      </div>
      
      <div className="act-more-info-container flex flex-col lg:flex-row gap-6 bg-[#FFF2DC80] rounded-[32px] p-6 md:p-8 h-auto lg:h-[500px]">
          <div className="img-part relative w-full lg:w-1/2 h-[300px] lg:h-full rounded-[32px] overflow-hidden shrink-0">
            <img src="/images/mellisa2.jpg " alt="" className="rounded-[32px] w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 rounded-[32px] bg-[#586e3166]"></div>
            
            <div className="absolute bottom-8 left-8 text-white z-10">
              <p className="text-sm mb-2 font-light">XX.XX.XXXX</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Lorem ipsum</h2>
              <button className="px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                Read Now <span>›</span>
              </button>
            </div>
          </div>
          <div className="topic-cards-container w-full lg:w-1/2 h-full flex flex-col justify-between gap-4 lg:gap-0">
          <TopicCard 
          img=""
          desc="xx.xxx.xxxx"
          title=""
          />
          <hr />  
          <TopicCard 
          img=""
          desc="xx.xxx.xxxx"
          title=""
          />
          <hr />
          <TopicCard 
          img=""
          desc="xx.xxx.xxxx"
          title=""
          />
          <hr />
        </div>
      </div>
    </div >

      {/* voice section */}
      <div className="voice-section w-full h-auto md:h-[100vh] bg-[#395739] flex flex-col md:flex-row">
      <div className="voice-img-container relative w-full md:w-[45%] h-[50vh] md:h-full">
        <div className="w-full h-full relative overflow-hidden md:rounded-tr-[24rem]">
             <img className="h-full w-full object-cover grayscale" src="/images/voice-img.jpg"  alt="" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#759340]/40 to-transparent"></div>
        </div>
      </div>
      <div className="w-full md:w-[55%]"></div>
    </div>

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