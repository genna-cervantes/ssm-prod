"use client"
import Image from 'next/image';
import { useState } from "react";
import { Header } from "./components/Header";
import PetitionProgress from "./components/PetitionProgress";
import CommunityNoteCard from "./components/CommunityNoteCard"; 
import ReadMoreCard from './components/readMoreCard';
import CardBlock from './components/card-block';
import TopicCard from "./components/TopicCard";
import StatisticBar from "./components/StatisticsBar";

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
        <main className="flex flex-col w-full grow mx-auto px-4 relative z-10">      
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
               <div className="w-full max-w-5xl px-4 pb-40">
                  <div className="backdrop-blur-md text-2xl bg-green-8/60 p-6 md:p-12 rounded-2xl shadow-2xl border border-white/10 flex justify-center">
                    <PetitionProgress signedCount={78041} goalCount={128095} />
                  </div>
               </div>
            </div>
        </main> 
      </section>

      {/* why sierra madre matters section */}
      <main className="w-full min-h-screen relative py-10 md:py-[100px] px-4 md:px-[50px] bg-white">
        <StatisticBar/>
      <header className="header-container pt-50 w-full py-8 flex flex-col items-center text-[#373F2A] justify-center text-center">
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
      <div className="why-we-must-act-now-div w-full min-h-screen py-10 md:py-[100px] px-4 md:px-[50px] bg-[#FFFCF5]">
      
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
<div className="voice-section flex flex-col lg:flex-row w-full min-h-screen lg:h-[100vh] bg-[#395739]">
      <div className="voice-content flex-1 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 py-12 lg:py-0 text-white order-1 lg:order-2">
        <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6">
          Your <span className="bg-gradient-to-r from-[#ffffff] to-[#A3CB5B] bg-clip-text text-transparent">Voice</span> Can<br />
          Make a <span className="italic font-serif">Difference</span>
        </h1>
        <p className="text-base md:text-lg mb-8 max-w-2xl leading-relaxed text-[#E5D9C5]">
          Join thousands of concerned citizen, environmental advocates, and community leaders in calling for the protection of Sierra Madre. Together, we can ensure this vital ecosystem is preserved for future generations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
          <button className="px-6 md:px-8 py-3 bg-white text-[#395739] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
            Sign the Petition Now
          </button>
          <button className="px-6 md:px-8 py-3 border-2 border-white rounded-lg font-semibold transition-colors text-[#E5D9C5] hover:bg-white hover:text-[#395739] text-center">
            Learn About Our Work
          </button>
        </div>
        <p className="text-base md:text-xl font-serif italic opacity-90 text-[#E5D9C5]">
          Every signature brings us closer to protecting Sierra Madre. Share the petition with your family and friends.
        </p>
      </div>
      <div className="voice-img-container relative w-full lg:w-[45%] h-[300px] lg:h-full order-2 lg:order-1">
        <img className="h-full w-full object-cover grayscale" style={{ clipPath: 'inset(0 round 0 24rem 0 0)' }} src="/images/voice-img.jpg"  alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#759340]/40 to-transparent"></div>
      </div>
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
      
<footer className="bg-[#2D4A2D] text-white py-8 md:py-16 px-4 md:px-[50px] pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Logo and Description */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/footer-logo.png" alt="Save Sierra Madre" className="w-12 h-12" />
            <h3 className="text-xl font-bold">Save Sierra Madre</h3>
          </div>
          <p className="text-[#E5D9C5] text-sm leading-relaxed">
            Protecting the Philippines' last ecological frontier for future generations
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-[#E5D9C5] hover:text-white transition-colors">About SSMNAI</a></li>
            <li><a href="#" className="text-[#E5D9C5] hover:text-white transition-colors">Publications</a></li>
            <li><a href="#" className="text-[#E5D9C5] hover:text-white transition-colors">Signee Notes</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-[#E5D9C5] text-sm">
            <li className="flex items-start gap-2">
              <span><svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 7C14 6.08075 13.8189 5.1705 13.4672 4.32122C13.1154 3.47194 12.5998 2.70026 11.9497 2.05025C11.2997 1.40024 10.5281 0.884626 9.67878 0.532843C8.8295 0.18106 7.91925 0 7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C1.40024 2.70026 0.884626 3.47194 0.532843 4.32122C0.18106 5.1705 -1.36979e-08 6.08075 0 7C0 8.387 0.409 9.677 1.105 10.765H1.097L7 20L12.903 10.765H12.896C13.6169 9.6416 14.0001 8.33482 14 7ZM7 10C6.20435 10 5.44129 9.68393 4.87868 9.12132C4.31607 8.55871 4 7.79565 4 7C4 6.20435 4.31607 5.44129 4.87868 4.87868C5.44129 4.31607 6.20435 4 7 4C7.79565 4 8.55871 4.31607 9.12132 4.87868C9.68393 5.44129 10 6.20435 10 7C10 7.79565 9.68393 8.55871 9.12132 9.12132C8.55871 9.68393 7.79565 10 7 10Z" fill="#E5F1E5"/>
</svg>
</span>
              <span>Rm. 232, St. Anthony Bldg. 891 Aurora Boulevard cor. Cambridge Street, Cubao 1112 Quezon City</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 9C19 8.08075 18.8189 7.1705 18.4672 6.32122C18.1154 5.47194 17.5998 4.70026 16.9497 4.05025C16.2997 3.40024 15.5281 2.88463 14.6788 2.53284C13.8295 2.18106 12.9193 2 12 2C11.0807 2 10.1705 2.18106 9.32122 2.53284C8.47194 2.88463 7.70026 3.40024 7.05025 4.05025C6.40024 4.70026 5.88463 5.47194 5.53284 6.32122C5.18106 7.1705 5 8.08075 5 9C5 10.387 5.409 11.677 6.105 12.765H6.097L12 22L17.903 12.765H17.896C18.6169 11.6416 19.0001 10.3348 19 9ZM12 12C11.2044 12 10.4413 11.6839 9.87868 11.1213C9.31607 10.5587 9 9.79565 9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9C15 9.79565 14.6839 10.5587 14.1213 11.1213C13.5587 11.6839 12.7956 12 12 12Z" fill="#E5F1E5"/>
</svg>
0920968492
              </span>
            
            </li>
            <li className="flex items-center gap-2">
              <span><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 4.29L6.16 9.9L3.85 4.29H0L4.29 13.93L2.75 17.4H6.5L12.24 4.29H8.5ZM13 9.43C11.63 9.43 10.59 10.47 10.59 11.7C10.59 12.87 11.59 13.86 12.93 13.86C14.32 13.86 15.36 12.83 15.36 11.6C15.36 10.39 14.36 9.43 13 9.43ZM15.72 0L11.89 8.59H16.17L20 0H15.72Z" fill="#E5F1E5"/>
</svg>
</span>
              <a href="mailto:savesierramadre@yahoo.com" className="hover:text-white transition-colors">savesierramadre@yahoo.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#E5F1E5"/>
</svg>
</span>
              <a href="#" className="hover:text-white transition-colors">Save Sierra Madre</a>
            </li>
          </ul>
        </div>

        {/* Developed By */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Developed by:</h4>
          <a href="#" className="inline-block">
            <img className="w-16 h-16"src="/images/CSSLOGO.png" alt="" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 text-center">
        <p className="text-[#E5D9C5] text-sm">
          © 2025 Save Sierra Madre Network Alliance. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}