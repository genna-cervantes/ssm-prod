import { ArrowDown, ChevronDown } from 'lucide-react'; 


export default function CardBlock({
  cardPosition,
  title,
  description
}: {
  cardPosition: string | number;
  title?: string;
  description?: string;
}) {
    return(
        <div>
             <div className="card-block flex bg-[#FFF3DF80]">
                <div className="card-position flex-1 min-h-full py-8 px-6 md:py-[30px] max-w-5 md:max-w-10 md:px-20 bg-green-6 flex items-center justify-center text-4xl md:text-[72px] text-white">
                    {cardPosition}
                </div>
                <div className="card-description flex-1 grow py-4 px-5 md:py-6 md:px-10 flex justify-center items-center lg:flex-col lg:justify-start lg:items-start">
                    <h1 className="text-[#1A2F1A] text-l flex-2 lg:text-xl md:text-[30px] font-bold lg:mb-2">{title}</h1>
                    <p className="lg:block hidden text-green-8 md:text-base">{description}</p>
                    <ChevronDown className='text-black grow flex-1 w-20 text-5xl lg:hidden'/>
                </div>
             </div>
        </div>
    )
}