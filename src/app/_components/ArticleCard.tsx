import Link from 'next/link';
import { Instrument_Sans } from "next/font/google";
import { Inter } from "next/font/google";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

type Article = {
  title: string;
  author: string;
  datePublished: Date|null;
  thumbnail: string;
  authorDP: string;
  content?: string;
  summary?: string;
  articleLink?: string;
};

type ArticleCardProps = {
  article: Article;
  variant?: "internal" | "external";
};

export default function ArticleCard({ article, variant = "internal" }: ArticleCardProps) {
  
  // Get article details
  const { title, author, datePublished, thumbnail, authorDP } = article;
  const text = 'content' in article ? article.content : article.summary;
  const date = datePublished ? new Date(datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';
  
  // Generate Slug or use Link
  const link = article.articleLink 
    ?? `/publications/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  const CardContent = () => {
    return (
        <div className={`
        overflow-hidden grid grid-cols-[1fr_1.75fr] gap-2 sm:shadow-lg sm:shadow-black/20
        sm:grid-cols-1 sm:grid-rows-[1fr_1fr] sm:min-h-[460px] sm:bg-[#EEE7DC] sm:rounded-2xl hover:bg-[#DDD0BC] transition-all duration-300 cursor-pointer`}>
          <img src={thumbnail} alt="" className={`aspect-video object-cover h-full rounded-lg sm:rounded-t-2xl sm:rounded-b-[0]`} />
          <section className={`p-2 sm:px-6 sm:py-5 sm:flex sm:flex-col sm:justify-between`}>
            <div className={`flex flex-col gap-1 sm:gap-2`}>
              <div className={`flex items-center gap-2`}>
                <img src="/assets/calendar.svg" alt="" className={`filter invert w-[12px]`} />
                <p className={`${inter.className} text-[#373F2A] text-xs`}>{date}</p>
              </div>
              <h4 className={`${instrumentSans.className} font-semibold text-sm line-clamp-2 sm:text-base`}>
                {title}
              </h4>
              <p className={`hidden text-xs text-[#6B5A40] sm:line-clamp-4`}>{text}</p>
            </div>
            <div>
              <div className={`hidden sm:block sm:flex sm:gap-2`}>
                <img src={authorDP} alt="" className={`w-[32px] rounded-full`} />
                <div className={`text-xs`}>
                  <p className={`text-[#6B5A40]`}>Written by:</p>
                  <p className={`font-semibold`}>{author}</p>
                </div>
              </div>
              <p className={`${inter.className} text-[#625541] text-xs sm:hidden mt-auto`}>
                Read Now <span>&gt;</span>
              </p>
            </div>
          </section>
        </div>
    );
  }

  if (variant === "external") {
    return ( 
      <a href={link} target='_blank'>
        <CardContent />
      </a>
    );
  } 

  return (
    <Link href={link}>
      <CardContent />
    </Link>
  );
}