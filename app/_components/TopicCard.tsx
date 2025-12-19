export default function TopicCard({
  img,
  desc,
  title,
  link
}: {
  img?: string;
  desc?: string;
  title?: string;
  link?: string;
}) {
  return (
    <div className="article-thumbnail-card flex gap-4 items-center flex-1">
      <div className="hidden md:block thumbnail-img-container aspect-5/3 w-1/3 rounded-2xl overflow-hidden bg-green-5 shrink-0">
        {img && <img src={img} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="thumbnail-desc flex flex-col justify-center flex-1">
        <p className="text-brown-3 text-xs md:text-sm mb-1 md:mb-2">{desc || "xx.xx.xxxx"}</p>
        <h1 className="text-[#1A2F1A] text-base md:text-xl font-semibold mb-1 md:mb-2 leading-tight">{title || "This is a topic very nice topic to have"}</h1>
        <a className="text-green-6 hover:underline flex items-center gap-1 text-sm md:text-base" href={link || ""}>
          Read Now <span>^</span>
        </a>
      </div>
    </div>
  );
}