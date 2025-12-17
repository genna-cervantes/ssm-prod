import Image from "next/image";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = {
    date: "November 19, 2024",
    title: "Why Should We Protect The Sierra Madre, The ‘Backbone of Luzon’?",
    author: "Nica Glorioso",
    heroImage: "/assets/mountain.png",
    inlineImage: "/assets/mountain.png",
  };

  return (
    <main className="bg-white text-[#1C1C1C]">
      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] flex items-end">
        <Image
          src={article.heroImage}
          alt="Hero"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex justify-between items-end px-6 sm:px-10 pb-10">
          <div className="text-white drop-shadow-lg max-w-[750px]">
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Image
                src="/assets/calendar.svg"
                alt="Calendar"
                width={16}
                height={16}
              />
              {article.date}
            </p>

            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl 
                font-bold mt-3 leading-tight
                max-w-[720px]
              "
              style={{
                lineClamp: 2,
                WebkitLineClamp: 2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {article.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-white mr-4">
            <Image
              src="/assets/profile-placeholder.png"
              alt="Author"
              width={70}
              height={70}
              className="rounded-full border border-white/30"
            />
            <div className="leading-tight">
              <p className="text-sm opacity-80">Written by:</p>
              <p className="text-base font-semibold">{article.author}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 text-[#373F2A] leading-8">
        <p>
          Also deemed “the backbone of Luzon,” “Luzon’s natural fortress,” and
          “the mother of mountains,” isn’t just a thing of natural beauty...
        </p>

        <p className="mt-6">With the recent visibility of multiple typhoons...</p>

        <div
          className="
            w-full
            max-w-[1120px]
            h-[201px]
            rounded-[45px]
            bg-cover
            bg-center
            mx-auto
            my-10
          "
          style={{
            backgroundImage:
              "linear-gradient(182.04deg, rgba(255,255,255,0.2) 1.71%, rgba(26,47,26,0.2) 98.29%), url('/assets/mountain.png')",
          }}
        ></div>

        <p>A popular statement that circulates...</p>

        <p className="mt-6">
          Typhoons are getting worse and more frequent…
        </p>
      </section>

      <section className="bg-[#1E3A1E] py-16 mt-10 text-white">
        <h2
          className={`
            text-center
            ${instrumentSans.className}
            font-semibold
            text-[60px]
            leading-[73px]
            text-[#FFF4E0]
          `}
        >
          Articles you might like
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-6 max-w-7xl mx-auto mt-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[#EEE7DC] text-[#1C1C1C] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/assets/mountain.png"
                alt="Thumbnail"
                width={400}
                height={240}
                className="object-cover w-full h-48"
              />

              <div className="p-4">
                <p className="flex items-center gap-1 text-xs text-gray-600">
                  <Image
                    src="/assets/calendar2.svg"
                    alt="Calendar"
                    width={12}
                    height={12}
                  />
                  July 1, 2014
                </p>

                <h3
                  className={`
                    ${instrumentSans.className}
                    font-semibold
                    text-[16px]
                    leading-[24px]
                    text-[#242C16]
                    mt-2
                  `}
                >
                  Environmental Group Censures the…
                </h3>

                <p className="text-xs mt-2 text-gray-700">
                  The Save Sierra Madre Network Alliance…
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <Image
                    src="/assets/profile-placeholder2.png"
                    alt="Author"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p className="text-xs">Elizabeth Carranza</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
