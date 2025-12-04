export default function ReadMoreCard({backgroundImg, title = "Water source", description = "Provides clean water to millions of Filipinos..."} : 
    {
        backgroundImg?: string;
        title?: string;
        description?: string;
    }
){
    const bgStyle = backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : undefined;

    return (
        <div className="card-container group relative flex-1 h-[500px] md:h-[506px] bg-cover bg-center rounded-4xl overflow-hidden duration-400" style={bgStyle}>
            <div className="readMoreCard-description absolute inset-x-0 bottom-0 flex justify-center items-center flex-col bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/70 text-white p-6 pb-8 transition-all duration-300">
                <h1 className="text-2xl font-semibold drop-shadow-lg">{title}</h1>
                <p className="mt-2 text-center drop-shadow-md">{description}</p>
                <button className="mt-4 px-6 py-3 border-1 border-white rounded-full hover:bg-white hover:text-black transition-colors w-[100%]">Read More &gt;</button>
            </div>
        </div>
    );
}
