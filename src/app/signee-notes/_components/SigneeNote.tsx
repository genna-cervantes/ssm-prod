import { Speaker, Volume2 } from "lucide-react";

interface SigneeNoteProps {
    name?: string;
    date: string;
    message: string;
}

const SigneeNote = ({ name = "Anonymous", date, message }: SigneeNoteProps) => {
    return (
        <div className="bg-brown-2 rounded-2xl p-6 max-w-sm shadow-md h-80">
            <div className="flex justify-between items-center mb-3">
                <span className="text-green-7 italic">{name}</span>
                <span className="text-green-7 text-sm">{date}</span>
            </div>
            
            <hr className="border-green-7/30 mb-10" />
            
            <div className="text-green-5 text-6xl font-serif leading-0 mb-1">"</div>
            
            <p className="text-green-7 leading-relaxed mb-6 line-clamp-5">
                {message}
            </p>
            
            <div className="flex justify-center">
                <button className="flex items-center gap-2 px-6 py-1 border-2 border-green-7 rounded-full text-green-7 hover:bg-green-7/10 transition-colors">
                    <span>Listen</span>
                    <Volume2 className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}

export default SigneeNote;