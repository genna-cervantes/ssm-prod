import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Instrument_Sans } from "next/font/google";
import { Header } from "@/src/app/_components/Header";
import { getPublicationBySlugAction } from "@/src/actions/publications.actions";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface PublicationPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { ok, data: publication } = await getPublicationBySlugAction(params.slug);

  if (!ok || !publication) {
    return {
      title: "Publication Not Found | Save Sierra Madre",
      description: "The requested publication could not be found.",
    };
  }

  // Strip HTML tags from content for description
  const plainTextContent = publication.content
    .replace(/<[^>]*>/g, "")
    .substring(0, 160)
    .trim();

  return {
    title: `${publication.title} | Save Sierra Madre`,
    description: plainTextContent || `Read "${publication.title}" by ${publication.author} - a publication from Save Sierra Madre.`,
    authors: [{ name: publication.author }],
    openGraph: {
      title: publication.title,
      description: plainTextContent || `Read "${publication.title}" by ${publication.author}`,
      type: "article",
      publishedTime: publication.datePublished?.toISOString(),
      authors: [publication.author],
      images: publication.heroImage ? [publication.heroImage] : ["/assets/signee-notes-add-your-voice.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: publication.title,
      description: plainTextContent || `Read "${publication.title}" by ${publication.author}`,
      images: publication.heroImage ? [publication.heroImage] : ["/assets/signee-notes-add-your-voice.png"],
    },
  };
}

export default async function PublicationPage({ params }: PublicationPageProps) {
  const { ok: publicationOk, data: publicationData } = await getPublicationBySlugAction(params.slug);

  if (!publicationOk || !publicationData) {
    notFound();
  }

  const formattedDate = publicationData.datePublished
    ? new Date(publicationData.datePublished).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="bg-white text-[#1C1C1C]">
      {/* HEADER */}
      <Header variant="filled" noMargin />

      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] flex items-end">
        <Image
          src={publicationData.heroImage || "/assets/mountain.png"}
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
              {formattedDate}
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
              {publicationData.title}
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
              <p className="text-base font-semibold">{publicationData.author}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 text-[#373F2A] leading-8">
        <div dangerouslySetInnerHTML={{ __html: publicationData.content }} />
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
          Publications you might like
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
