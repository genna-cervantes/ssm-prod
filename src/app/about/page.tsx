import Image from 'next/image';
import { Header } from "../_components/Header";
import Footer from "../_components/Footer";
import { Users, Shield, Eye, Leaf, ChevronUp, Send } from 'lucide-react';
import SendMessageForm from './_components/SendMessageForm';
import CoreValuesSection from './_components/CoreValuesSection';

export default function AboutPage() {

  return (
    <div className="w-full">
      <Header 
        variant="filled" 
        noMargin
      />

      {/* --- HERO SECTION --- */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_center_top,white_0%,#c7e592_40%,#759340_100%)]"></div>
        
        <div className="relative z-10">
          <div className="text-center py-12 md:pt-16 md:pb-2 px-4 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-7 mb-6 leading-tight">
                Save Sierra Madre<br />
                Network Alliance, Inc.
              </h1>
              <p className="text-base md:text-lg text-green-8 max-w-3xl mx-auto leading-relaxed">
                Save Sierra Madre Network Alliance, Inc. (SSMNAI) is a non-governmental organization that is dedicated to 
                preserving the Sierra Madre Mountain Range through <strong className="font-semibold">advocacy</strong>, <strong className="font-semibold">community engagement</strong>, and 
                safeguarding the environment, especially our natural resources and the development for the people of 
                South Luzon.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-t-[60px] md:rounded-t-[100px] overflow-hidden -mb-[80px] md:-mb-[200px] lg:-mb-[300px] z-20">
            <Image 
              src="/images/about-main.png" 
              alt="Save Sierra Madre Network Alliance community members" 
              fill 
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* --- VISION AND MISSION SECTION --- */}
      <section className="bg-green-7 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 py-16 md:py-24 px-4 md:px-12 lg:px-20">
            <div className="flex gap-4 md:gap-6 items-stretch pt-[50px] md:pt-[150px]">
              <span className="text-green-3 italic text-[80px] md:text-[120px] lg:text-[150px] font-serif leading-none">"</span>
              
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-green-3 mb-6">
                  Our <span className="italic font-serif">Vision and</span><br />
                  <span className="italic font-serif">Mission</span>
                </h2>
                
                <p className="text-white text-sm md:text-base mb-6 leading-relaxed">
                  Sierra Madre Network Alliance, Inc. (SSMNAI), envisions a community of stewards and co-Creators of a Living Creator 
                  God of Creation, in particular to Sierra Madre.
                </p>
                
                <p className="text-white text-sm md:text-base mb-4 font-semibold">
                  We commit to the present and future generations that we shall:
                </p>
                
                <ul className="text-white text-sm md:text-base space-y-2 list-disc list-inside leading-relaxed">
                  <li>Co-exist harmoniously with all creatures, nurturing eco-relationships of nature</li>
                  <li>Care for and protect our invaluable environment, particularly the Sierra Madre</li>
                  <li>Awaken the consciousness among local communities and of Sierra Madre stakeholders to be Living stewards and co-Creators of a Living Creator; and</li>
                  <li>Strengthen sustainable development advocacy, and networks and Sierra Madre stakeholders in transforming the nation.</li>
                </ul>
              </div>
              
              
                <span className="self-end leading-0 italic text-green-3 text-[80px] md:text-[120px] lg:text-[150px] font-serif">"</span>
              
            </div>
          </div>
          
          <div className="w-full lg:w-[40%] shrink-0 relative min-h-[400px] lg:min-h-0">
            <Image 
              src="/images/about-mission-and-vision.png" 
              alt="SSMNAI community members" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- OUR WORK AND ACTIVITIES SECTION --- */}
      <section className="bg-green-6 py-16 md:py-24 px-4 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-brown-1 text-center mb-12 md:mb-16 italic font-serif">
            Our Work and Activities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#FFF3DF] rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-7 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#FFF3DF]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-7">Community Network</h3>
              </div>
              <p className="text-green-8 text-sm md:text-base leading-relaxed">
                SSMNAI is a network of multi-stakeholders directly linked with IP communities and works in collaboration with other groups and individuals who wish to help protect and conserve Sierra Madre.
              </p>
            </div>

            <div className="bg-[#FFF3DF] rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-7 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#FFF3DF]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-7">Advocacy and Protection</h3>
              </div>
              <p className="text-green-8 text-sm md:text-base leading-relaxed">
                Committed to the preservation of the Sierra Madre Mountain Range, SSMNAI promotes genuine, impartial, and inclusive advocacy to safeguard its forests, biodiversity, and the communities that depend on them.
              </p>
            </div>

            <div className="bg-[#FFF3DF] rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-7 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#FFF3DF]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-7">Awareness and Stewardship</h3>
              </div>
              <p className="text-green-8 text-sm md:text-base leading-relaxed">
                SSMNAI aims to raise awareness among local communities and stakeholder groups, calling for responsible environmental care and a renewed sense of stewardship for creation.
              </p>
            </div>

            <div className="bg-[#FFF3DF] rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-7 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 md:w-6 md:h-6 text-[#FFF3DF]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-7">Commitment to Sustainability</h3>
              </div>
              <p className="text-green-8 text-sm md:text-base leading-relaxed">
                In line with its vision of living in harmony with nature, SSMNAI strengthens the commitment of present and future generations to maintain the balance of nature and ensure the continued well-being of the Sierra Madre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENT ACTIVITIES AND MILESTONES SECTION --- */}
      <section className="bg-[#f5f2e3] py-16 md:py-24 px-4 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-7 text-center mb-12 md:mb-16">
            Recent Activities<br />and Milestones
          </h2>

          <div className="space-y-8 md:space-y-10">
            <div className="flex gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="inline-block bg-green-3 text-green-8 text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  June 2012
                </span>
              </div>
              <div className="flex-1 border-l-2 border-green-2 pl-4 md:pl-8 pb-8">
                <h3 className="text-lg md:text-xl font-bold text-green-7 mb-2">Save Sierra Madre Day Declaration</h3>
                <p className="text-green-8 text-sm md:text-base leading-relaxed">
                  PROCLAMATION NO. 572, officially declares September 26 of every year as "Save Sierra Madre Day."
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="inline-block bg-green-2 text-green-8 text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  April 2013
                </span>
              </div>
              <div className="flex-1 border-l-2 border-green-2 pl-4 md:pl-8 pb-8">
                <h3 className="text-lg md:text-xl font-bold text-green-7 mb-2">Unified Indigenous People Opposition Statement</h3>
                <p className="text-green-8 text-sm md:text-base leading-relaxed">
                  Indigenous leaders from the Remontado, Dumagat, and Agta formally released their strong opposition letter to New Centennial Water Source-Kaliwa Dam Project also known as Kaliwa Dam Project.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="inline-block bg-green-4 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  May 2023
                </span>
              </div>
              <div className="flex-1 border-l-2 border-green-2 pl-4 md:pl-8 pb-8">
                <h3 className="text-lg md:text-xl font-bold text-green-7 mb-2">SSMNAI Position Paper Release</h3>
                <p className="text-green-8 text-sm md:text-base leading-relaxed mb-3">
                  The Save Sierra Madre Network Alliance, Inc. (SSMNAI) submitted a comprehensive position paper to the Senate Committee on Sustainable Development Goals, Innovation, and Future Thinking (SDGIFT), highlighting the Sierra Madre's vital role in climate resilience and water security.
                </p>
                <button className="text-green-6 text-sm font-semibold hover:underline">Read More →</button>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="inline-block bg-green-6 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  Sept 2024
                </span>
              </div>
              <div className="flex-1 border-l-2 border-green-2 pl-4 md:pl-8">
                <h3 className="text-lg md:text-xl font-bold text-green-7 mb-2">SSMNAI Advocacy Group for the Sierra Madre</h3>
                <p className="text-green-8 text-sm md:text-base leading-relaxed mb-3">
                  The Save Sierra Madre Network Alliance, Inc. (SSMNAI) is a multi-stakeholder NGO dedicated to protecting the Sierra Madre and its people. Engaged in both grassroots and legislative levels, it advocates for sustainable development, forest conservation, and the protection of indigenous rights.
                </p>
                <button className="text-green-6 text-sm font-semibold hover:underline">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR CORE VALUES SECTION --- */}
      <CoreValuesSection />

      {/* --- GET IN TOUCH SECTION --- */}
      <SendMessageForm />

      <Footer />
    </div>
  );
}
