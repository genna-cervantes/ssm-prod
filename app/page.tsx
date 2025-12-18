import Image from 'next/image';
import { Header } from "./_components/Header";
import PetitionProgress from "./_components/PetitionProgress";
import CardBlock from './_components/CardBlock';
import TopicCard from "./_components/TopicCard";
import StatisticBar from "./_components/StatisticsBar";
import ReadMoreCard from "./_components/ReadMoreCard"; 
import CommunityCarousel from "./_components/CommunityCarousel"; 
import { MapPin, Phone, Mail, Globe, ChevronRight, Volume2 } from 'lucide-react'; 



const NOTES_DATA = [
  { date: "Oct 8, 2025", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, adipisci dignissimos aliquid accusamus nesciunt consectetur atque rem eos, placeat, id corrupti cupiditate laborum quo facilis quidem magnam distinctio similique optio!.", author: "Anonymous" },
  { date: "Oct 9, 2025", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, adipisci dignissimos aliquid accusamus nesciunt consectetur atque rem eos, placeat, id corrupti cupiditate laborum quo facilis quidem magnam distinctio similique optio!", author: "Anonymous" },
  { date: "Oct 10, 2025", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, adipisci dignissimos aliquid accusamus nesciunt consectetur atque rem eos", author: "Anonymous" },
  { date: "Oct 11, 2025", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, adipisci dignissimos aliquid accusamus nesciunt consectetur atque rem eos, placeat, id corrupti cupiditate laborum quo facilis quidem magnam distinctio similique optio!", author: "Anonymous" },
  { date: "Oct 12, 2025", quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ", author: "Anonymous" }
];

const KALIWA_STATS = [
  { value: "9,700", label: "Hectares of forest at Risk" },
  { value: "126", label: "Species to Lose Habitat" },
  { value: "2,492", label: "Households Affected" },
  { value: "1,485", label: "Families Displaced" }
];

const REASON_CARDS = [
  {
  title: "Protects Us from Typhoons",
  description: "The Sierra Madre is our first line of defense against typhoons in the Philippines as it weakens the strong winds and heavy rain. Without it, storms would continue to cause greater destruction to countless homes, farms, and infrastructures, pushing us to an impoverished life."
},
  {
  title: "Prevents Landslide and Floods",
  description: "The healthy forests surrounding the Sierra Madre help hold the soil in the land in place. There are tree roots that prevent erosion and keep the ground stable, which further prevents the risk of landslides."
},
  {
  title: "Provides Water For Luzon",
  description: "It sustains the needs for millions of Filipinos, with means of living such as agriculture, fisheries, and household. The region 3, where Sierra Madre spans across, accounts for the highest share in the total agricultural output at 16%."
},
  {
  title: "Home to Indigenous Communities",
  description: "It serves as home and history to Indigenous communities such as the Agta, Dumagat, and Remontado, who have lived in the mountain range for centuries. Honoring their rights means protecting their home and source of identity."
}
];

export default function Home() {
  return (
    <div className="w-full font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image src="/images/hero-bg.jpg" alt="Bg" fill className="object-cover object-center md:object-top mt-30" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-white from-10% via-white/60 via-40% to-transparent"></div>
        
        <Header />
        
        <div className="flex flex-col w-full grow mx-auto px-4 relative z-10">
          <div className="grow flex flex-col items-center justify-center text-center gap-8 md:gap-10 pt-10 pb-10">
            <div className="hero-title space-y-2 md:space-y-4">
              <p className="text-xl md:text-3xl font-medium text-gray-700 tracking-wide">Save Millions of Lives</p>
              <h1 className="text-5xl md:text-7xl lg:text-[110px] bg-linear-to-r from-green-6 to-[#68B668] bg-clip-text text-transparent font-bold leading-[1.1] tracking-tight py-2">
                Save Sierra Madre Now.
              </h1>
              <p className="text-lg md:text-3xl text-gray-700 font-medium">Without it, our future is at risk</p>
            </div>
            <div className="hero-cta flex  flex-row gap-4 w-full sm:w-auto mt-4">
              <button className="bg-green-6 text-white px-1.5 lg:px-8 py-4 rounded-xl text-s text-m lg:text-lg hover:bg-[#3a583a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto">Sign the petition now</button>
              <button className="bg-white/80 backdrop-blur-2xl text-black lg:px-12 py-4 rounded-xl text-s lg:text-lg hover:bg-green-600 hover:text-white transition-all w-3/4 sm:w-auto">Learn more</button>
            </div>
          </div>
          
          <div className="w-full flex flex-col items-center pb-10 mt-10 md:pb-20 gap-10">
            
            <div className="w-full md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center px-4 md:px-0 hidden">
               <div className="flex flex-col items-center justify-end gap-2">
                 <p className="text-green-6 text-lg md:text-xl font-medium drop-shadow-md">The lungs of Luzon</p>
                 <div className="h-8 md:h-24 w-px border-l-2 border-dashed border-green-6/70"></div>
                 <div className="w-3 h-3 bg-green-6 rounded-full shadow-[0_0_10px_green-6]"></div>
               </div>
               <div className="flex flex-col items-center justify-end gap-2 md:-mt-12">
                 <p className="text-green-6 text-lg md:text-xl font-medium drop-shadow-md max-w-[300px]">Home to millions of species and indigenous communities.</p>
                 <div className="h-12 md:h-32 w-px border-l-2 border-dashed border-green-6/70"></div>
                 <div className="w-3 h-3 bg-green-6 rounded-full shadow-[0_0_10px_green-6]"></div>
               </div>
               <div className="flex flex-col items-center justify-end gap-2">
                 <p className="text-green-6 text-lg md:text-xl font-medium drop-shadow-md max-w-[250px]">Protector from typhoons, and provider of clean water</p>
                 <div className="h-8 md:h-20 w-px border-l-2 border-dashed border-green-6/70"></div>
                 <div className="w-3 h-3 bg-green-6 rounded-full shadow-[0_0_10px_green-6]"></div>
               </div>
            </div>

            <div className="w-full max-w-6xl px-4 pb-40">
              <div className="backdrop-blur-md text-2xl bg-green-4/10 p-6 md:p-12 rounded-2xl shadow-2xl border border-white/10 flex justify-center">
                <PetitionProgress signedCount={78041} goalCount={128095} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main> 
        {/* Why Sierra Madre Matters Section */}
      <section className="w-full min-h-screen relative py-10 md:py-[100px] px-4 md:px-[50px] bg-white">
        <StatisticBar/>
      <header className="header-container pt-50 w-full py-8 flex flex-col items-center pb-20 text-green-7 justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-semibold">Why Sierra Madre Matters</h1>
        <p className="mt-2 text-lg text-brown-3">
          This ancient rainforest is more than just trees. It's a lifeline for millions.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row justify-center h-[450] items-center gap-5 flex-1">
        <ReadMoreCard 
        classCss="hidden md:block"
          backgroundImg="/images/mellisa_typhoon.jpg" 
          hoverBackgroundImg="/images/sierrabest.jpg" />
        <ReadMoreCard 
          backgroundImg="/images/sierrabest.jpg" 
          hoverBackgroundImg="/images/mellisa_typhoon.jpg" />
        <ReadMoreCard 
        classCss="hidden md:block"
          backgroundImg="/images/mellisa_typhoon.jpg" 
          hoverBackgroundImg="/images/sierrabest.jpg" />
        <ReadMoreCard 
        classCss="hidden md:block"
          backgroundImg="/images/mellisa_typhoon.jpg" 
          hoverBackgroundImg="/images/sierrabest.jpg" />
      </div>
    </section>

        {/* Problem Section (Kaliwa Dam) */}
        <section className="problem min-h-screen bg-linear-to-b from-[#1A2F1A] to-[#396839] pt-20 flex flex-col w-full items-center justify-start gap-16 text-white">
          <div className="problem-title flex flex-col items-center text-center px-4">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              But Sierra Madre is <span className="text-red-400">Under Threat</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 max-w-5xl leading-relaxed mb-10">
              The Sierra Madre faces severe threats from illegal logging, mining, destructive agricultural practices, and infrastructure projects, which together cause forest degradation, loss of biodiversity, and weaken its vital role as a natural barrier protecting communities from storms.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
              <button className="bg-white text-black px-12 py-4 lg:px-20 rounded-xl text-lg font-bold hover:bg-gray-200 transition-colors shadow-lg flex items-center text-center justify-center">Read more <ChevronRight/> </button>
              <button className="bg-transparent border-white border-2 px-12 lg:px-20 text-white py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2 text-center justify-center">Listen <Volume2/></button>
            </div>
          </div>
          
          <div className="w-full flex flex-col shadow-2xl mx-auto">
            <div className="relative w-full h-[600px] md:h-[700px] bg-gray-900 overflow-hidden group">
              <Image src="/images/kaliwa-dam-main-pic.jpg" alt="Construction of Kaliwa Dam" fill className="object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 flex flex-col items-center z-10 w-3/4 md:w-max">
                <div className="bg-black/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center shadow-xl">
                  <p className="text-white italic text-sm md:text-lg leading-relaxed">"Construction of the <br /> <span className="italic">KALIWA DAM</span> <br /> (captured by Keith Anthony S. Fabro)"</p>
                </div>
                <div className="h-24 w-0.5 bg-white/70"></div>
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
              </div>
            </div>

            {/* Statistics Loop */}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-800 gap-px border-t border-gray-800">
              {KALIWA_STATS.map((stat, idx) => (
                <div key={idx} className="relative w-full h-[200px] md:h-[250px] bg-black group overflow-hidden">
                  <Image src="/images/kaliwa-dam-sub-pic.jpg" alt="bg" fill className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all" />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-gray-300 uppercase tracking-widest text-xs md:text-sm font-semibold">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Must Act Now Section */}
        <section className="why-we-must-act-now-div w-full min-h-screen py-10 md:py-[100px] px-4 md:px-[50px] bg-[#FFFCF5]">
          <h1 className="text-green-6 text-4xl md:text-[72px] font-bold flex items-center justify-center m-8 md:m-14 text-center">Why Must We Act Now</h1>
          
          <div className="card-block-container flex flex-col gap-6 md:gap-10">
            {REASON_CARDS.map((card, i) => (
               <CardBlock key={i} cardPosition={i+1} title={card.title} description={card.description} />
            ))}
          </div>
          
          <div>
            <h1 className="title-divider font-semibold text-[24px] leading-8 my-8 text-green-6">What You Should Know</h1>
          </div>

          <div className="act-more-info-container flex flex-col lg:flex-row gap-6 bg-[#FFF2DC80] rounded-4xl px-2 py-6 md:p-8 h-auto lg:h-[500px]">
            <div className="img-part relative w-full lg:w-1/2 h-[300px] lg:h-full rounded-4xl overflow-hidden shrink-0">
              <img src="/images/mellisa2.jpg " alt="" className="rounded-4xl w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/50 to-black/80 rounded-4xl bg-[#586e3166]"></div>

              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-sm mb-2 font-light">XX.XX.XXXX</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Lorem ipsum</h2>
                <button className="px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                  Read Now <span>›</span>
                </button>
              </div>
            </div>
            <div className="topic-cards-container px-6 w-full lg:w-1/2 h-full flex flex-col justify-between gap-4 lg:gap-0">
              <TopicCard img="" desc="xx.xxx.xxxx" title="" />
              <hr />
              <TopicCard img="" desc="xx.xxx.xxxx" title="" />
              <hr />
              <TopicCard img="" desc="xx.xxx.xxxx" title="" />
              <hr />
            </div>
          </div>
        </section>

        {/* Voice Section */}
        <section className="voice-section flex flex-col lg:flex-row w-full min-h-screen lg:h-screen bg-[#395739]">
          <div className="voice-content flex-1 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 py-12 lg:py-0 text-white order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6">
              Your <span className="bg-linear-to-r from-[#ffffff] to-[#A3CB5B] bg-clip-text text-transparent">Voice</span> Can<br />
              Make a <span className="italic font-serif">Difference</span>
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-2xl leading-relaxed text-brown-2">
              Join thousands of concerned citizen, environmental advocates, and community leaders in calling for the protection of Sierra Madre. Together, we can ensure this vital ecosystem is preserved for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
              <button className="px-6 md:px-8 py-3 bg-white text-[#395739] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                Sign the Petition Now
              </button>
              <button className="px-6 md:px-8 py-3 border-2 border-white rounded-lg font-semibold transition-colors text-brown-2 hover:bg-white hover:text-[#395739] text-center">
                Learn About Our Work
              </button>
            </div>
            <p className="text-base md:text-xl font-serif italic opacity-90 text-brown-2">
              Every signature brings us closer to protecting Sierra Madre. Share the petition with your family and friends.
            </p>
          </div>
          <div className="voice-img-container relative w-full h-[600px] lg:w-[45%] lg:h-full order-2 lg:order-1">
            <img className="h-full w-full object-cover grayscale rounded-tr-[200px]" src="/images/voice-img.jpg" alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-green-4/40 to-transparent"></div>
          </div>
        </section>

        {/* Community Notes Section */}
<section className="cta-3-section relative py-24 bg-green-1 flex flex-col items-center justify-center overflow-hidden">
          <div className="cta-3-text text-center mb-10 px-4 flex flex-col items-center w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-linear-to-r from-[#5D875C] to-[#94B754] px-12 py-6 inline-block shadow-md tracking-tight">
              A Paradise Worth Saving
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto font-serif italic">
              Read what others are saying about Sierra Madre and share your own thoughts and concerns.
            </p>
          </div>

          <div className="w-full px-4 overflow-hidden">
             <CommunityCarousel notes={NOTES_DATA} />
          </div>

          <button className="mt-10 px-10 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-colors uppercase tracking-widest text-sm z-40 relative">
            View Community Notes
          </button>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#2D4A2D] text-white py-8 md:py-16 px-4 md:px-[50px] pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Save Sierra Madre" className="w-30 h-12" />
              <h3 className="text-xl font-bold">Save Sierra Madre</h3>
            </div>
            <p className="text-brown-2 text-sm leading-relaxed">
              Protecting the Philippines' last ecological frontier for future generations
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brown-2 hover:text-white transition-colors">About SSMNAI</a></li>
              <li><a href="#" className="text-brown-2 hover:text-white transition-colors">Publications</a></li>
              <li><a href="#" className="text-brown-2 hover:text-white transition-colors">Signee Notes</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-brown-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#E5F1E5] shrink-0" />
                <span>Rm. 232, St. Anthony Bldg. 891 Aurora Boulevard cor. Cambridge Street, Cubao 1112 Quezon City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#E5F1E5] shrink-0" />
                <span>0920968492</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#E5F1E5] shrink-0" />
                <a href="#" className="hover:text-white transition-colors">savesierramadre@yahoo.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#E5F1E5] shrink-0" />
                <a href="#" className="hover:text-white transition-colors">Save Sierra Madre</a>
              </li>
            </ul>
          </div>

          {/* Developed By */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Developed by:</h4>
            <a href="#" className="inline-block">
              <img className="w-16 h-16" src="/images/csslogo.jpg" alt="" />
            </a>
          </div>
        </div>

        {/* Copyright */}
      <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 text-center pb-18 lg:pb-0">
        <p className="text-white text-base md:text-sm">
          © 2025 Save Sierra Madre Network Alliance. All rights reserved.
        </p>
      </div>
      </footer>
    </div>
  );
}