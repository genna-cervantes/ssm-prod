import type { Metadata } from "next";
import { Header } from '../_components/Header'
import { ChevronLeft, ChevronRight, Mail, Mountain, Pen } from 'lucide-react'
import Footer from '../_components/Footer'
import SigneeNote from './_components/SigneeNote'
import Link from 'next/link'
import { getPetitionCountAction, getPetitionNotesAction, getPetitionNotesCountAction } from '@/src/actions/petition.actions'

export const metadata: Metadata = {
  title: "Community Voices | Save Sierra Madre",
  description: "Read heartfelt messages from petition signees who are united in protecting Sierra Madre. Join the community and share your voice for environmental conservation.",
  keywords: ["Sierra Madre community", "petition voices", "environmental advocacy", "community notes", "Philippines conservation"],
  openGraph: {
    title: "Community Voices | Save Sierra Madre",
    description: "Read heartfelt messages from petition signees who are united in protecting Sierra Madre. Join the community and share your voice.",
    type: "website",
    images: ["/assets/signee-notes-add-your-voice.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Voices | Save Sierra Madre",
    description: "Read heartfelt messages from petition signees who are united in protecting Sierra Madre. Join the community and share your voice.",
    images: ["/assets/signee-notes-add-your-voice.png"],
  },
};

const SigneeNotesPage = async ({ searchParams }: { searchParams: { page: string, limit: string } }) => {

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 9;

    const { ok: petitionCountOk, data: petitionCount } = await getPetitionCountAction();
    const { ok: petitionNotesCountOk, data: petitionNotesCount } = await getPetitionNotesCountAction();

    const totalPages = petitionNotesCountOk && petitionNotesCount ? Math.ceil(petitionNotesCount / limit) : 1;
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    const { ok: petitionNotesOk, data: petitionNotes } = await getPetitionNotesAction(page, limit);

  return (
    <div className="w-full ">
        <Header
            variant='filled'
            noMargin
         />

        <section className="flex flex-col w-full px-6 sm:px-10 md:px-16 lg:px-20 pt-12 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 min-h-[40dvh] lg:min-h-[420px] bg-cover bg-center bg-no-repeat bg-signee-notes-main">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-green-2`}>Notes from Signees</h1>
            <h3 className={`text-lg sm:text-xl md:text-2xl pt-2 text-white drop-shadow-xl`}>A freedom wall of voices united in protecting Sierra Madre</h3>
            <p className={`text-sm sm:text-base md:text-lg text-white drop-shadow-md`}>Read the heartfelt messages from those who have signed the petition and
            share their concerns for our environment.</p>
        </section>

        <div className='w-full px-6 sm:px-10 md:px-16 lg:px-20 -mt-16 sm:-mt-20 md:-mt-24'>
            <div className='flex flex-col sm:flex-row justify-around bg-green-6 px-6 sm:px-10 md:px-16 lg:px-20 py-2 md:py-6 rounded-xl w-full sm:h-44'>
                <div className='text-amber-100 flex flex-col items-center justify-center py-4 sm:py-0 sm:w-1/3'>
                    <Mail className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' />
                    <p className='text-sm sm:text-base text-center'>Messages Shared</p>
                    <p className='pt-1 text-xl sm:text-3xl font-semibold'>{petitionNotesCountOk ? petitionNotesCount : "-"}</p>
                </div>
                <div className='text-amber-100 flex flex-col items-center justify-center py-4 sm:py-0 sm:w-1/3 border-y sm:border-y-0 sm:border-x border-amber-100/30'>
                    <Pen className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' />
                    <p className='text-sm sm:text-base text-center'>Peitition Signatures</p>
                    <p className='pt-1 text-xl sm:text-3xl font-semibold'>{petitionCountOk ? petitionCount : "-"}</p>
                </div>
                <div className='text-amber-100 flex flex-col items-center justify-center py-4 sm:py-0 sm:w-1/3'>
                    <Mountain className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' />
                    <p className='text-sm sm:text-base text-center'>United for Sierra Madre</p>
                    <p className='pt-1 text-xl sm:text-3xl text-green-2 font-semibold'>One Voice</p>
                </div>
            </div>
        </div>

        <section className='w-full px-6 sm:px-10 md:px-16 lg:px-20 py-12 sm:py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10'>
            {petitionNotesOk && petitionNotes && petitionNotes.length > 0 ? petitionNotes.map((note) => (
                note.note && <SigneeNote key={note.id} name={note.sender} date={note.date.toISOString()} message={note.note} />
            )) : (
                <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500'>
                    <p>No notes found</p>
                </div>
            )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className='w-full px-6 sm:px-10 md:px-16 lg:px-20 pb-12 sm:pb-16 md:pb-20 flex flex-wrap items-center justify-center gap-2'>
                <Link
                    href={hasPrevious ? `/signee-notes?page=${page - 1}&limit=${limit}` : '#'}
                    className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                        hasPrevious 
                            ? 'bg-green-6 text-white hover:bg-green-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                >
                    <ChevronLeft className='w-4 h-4' />
                    <span className='hidden sm:inline'>Previous</span>
                </Link>

                <div className='flex items-center gap-1'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((pageNum) => {
                            // Show first page, last page, current page, and 1 page on each side of current
                            if (pageNum === 1 || pageNum === totalPages) return true;
                            if (Math.abs(pageNum - page) <= 1) return true;
                            return false;
                        })
                        .map((pageNum, index, filtered) => {
                            const prevPageNum = filtered[index - 1];
                            const showEllipsis = prevPageNum && pageNum - prevPageNum > 1;
                            
                            return (
                                <span key={pageNum} className='flex items-center gap-1'>
                                    {showEllipsis && <span className='px-1 sm:px-2 text-gray-400'>...</span>}
                                    <Link
                                        href={`/signee-notes?page=${pageNum}&limit=${limit}`}
                                        className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                                            pageNum === page
                                                ? 'bg-green-6 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {pageNum}
                                    </Link>
                                </span>
                            );
                        })}
                </div>

                <Link
                    href={hasNext ? `/signee-notes?page=${page + 1}&limit=${limit}` : '#'}
                    className={`flex items-center gap-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors ${
                        hasNext 
                            ? 'bg-green-6 text-white hover:bg-green-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                >
                    <span className='hidden sm:inline'>Next</span>
                    <ChevronRight className='w-4 h-4' />
                </Link>
            </div>
        )}

        <section className="flex flex-col w-full items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 min-h-[40dvh] lg:min-h-[500px] bg-cover bg-center bg-no-repeat bg-signee-notes-add-your-voice">
            <div className='mb-6 sm:mb-8 flex flex-col items-center'>
                <h1 className='text-amber-100 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center'>Add your 
                    <span className='italic font-serif text-green-2'> Voice</span>
                </h1>
                <p className='text-center text-white text-sm sm:text-base md:text-lg px-4 sm:px-0'>Sign the petition and share your message about why Sierra Madre matters to you. <br className='hidden sm:block' />
                Your voice can make a difference.</p>
            </div>

            <Link href='/sign' className='px-5 sm:px-6 py-2 bg-green-6 text-white text-sm sm:text-base rounded-md hover:bg-green-700 transition-colors'>Sign the Petition</Link>

        </section>

        <Footer />
    </div>
  )
}

export default SigneeNotesPage