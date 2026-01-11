"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";

const CORE_VALUES = [
  {
    title: "God-Centered",
    description:
      "We believe that we are co-Creators of a Loving Creator to all of creation. We believe that our decisions are guided, provided for, and honored by God.",
  },
  {
    title: "Nationalism",
    description:
      "We are committed to the preservation of Sierra Madre for the benefit of the Filipino people. Our advocacy is rooted in love for our nation and its natural heritage.",
  },
  {
    title: "Passion",
    description:
      "We are driven by a deep passion for environmental protection and the well-being of indigenous communities. This passion fuels our advocacy.",
  },
  {
    title: "Genuine",
    description:
      "We act with sincerity and authenticity in all our endeavors, driven by a true commitment to our cause.",
  },
  {
    title: "Dedicated",
    description:
      "We remain steadfast and committed to our mission of protecting the Sierra Madre. Our dedication is unwavering in the face of challenges.",
  },
  {
    title: "Firm and Focused",
    description:
      "We maintain a clear vision and stand firm in our principles, staying focused on sustainable development and environmental preservation.",
  },
];

const CoreValuesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-linear-to-b from-[#f5f2e3] to-green-2 py-16 md:py-24 px-4 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-7 text-center mb-12 md:mb-16">
          Our <span className="italic font-serif">Core</span> Values
        </h2>

        <div className="space-y-4">
          {CORE_VALUES.map((value, index) => (
            <div
              key={index}
              className="bg-[#FFF8EE] rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <h3 className="text-lg md:text-xl font-bold text-green-7">
                  {value.title}
                </h3>
                <ChevronUp
                  className={`w-5 h-5 text-green-7 transition-transform duration-300 ${
                    openIndex === index ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-linear ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-green-8 text-sm md:text-base leading-relaxed px-5 md:px-6 pb-5 md:pb-6">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
