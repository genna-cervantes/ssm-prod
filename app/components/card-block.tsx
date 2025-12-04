export default function CardBlock({
  cardPosition,
  title,
  description
}: {
  cardPosition?: string;
  title?: string;
  description?: string;
}) {
    return(
        <div>
             <div className="card-block flex bg-[#FFF3DF80]">
                {/* Responsive padding and width for the number block */}
                <div className="card-position min-h-full py-8 px-6 md:py-[30px] md:px-[60px] bg-[#4D724D] flex items-center justify-center text-4xl md:text-[72px] text-white">
                    {cardPosition}
                </div>
                {/* Responsive padding for text */}
                <div className="card-description py-4 px-5 md:py-6 md:px-10 flex justify-center flex-col">
                    <h1 className="text-[#1A2F1A] text-xl md:text-[30px] font-bold mb-2">{title}</h1>
                    <p className="text-[#242C16] text-sm md:text-base">{description}</p>
                </div>
             </div>
        </div>
    )
}