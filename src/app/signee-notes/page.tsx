import { Header } from '../_components/Header'
import { ChevronLeft, ChevronRight, Mail, Mountain, Pen } from 'lucide-react'
import Footer from '../_components/Footer'
import SigneeNote from './_components/SigneeNote'
import Link from 'next/link'
import { getPetitionCountAction, getPetitionNotesAction, getPetitionNotesCountAction } from '@/src/actions/petition.actions'

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

        <section className="flex flex-col w-full px-20 pt-40 pb-20 min-h-[40dvh] lg:min-h-[420px] bg-cover bg-center bg-no-repeat bg-signee-notes-main">
            <h1 className={`text-6xl font-bold drop-shadow-2xl text-green-2`}>Notes from Signees</h1>
            <h3 className={`text-2xl pt-2 text-white drop-shadow-xl`}>A freedom wall of voices united in protecting Sierra Madre</h3>
            <p className={`text-lg text-white drop-shadow-md`}>Read the heartfelt messages from those who have signed the petition and
            share their concerns for our environment.</p>
        </section>

        <div className='w-full px-20 -mt-24'>
            <div className='flex justify-around bg-green-6 px-20 py-6 rounded-xl w-full h-44'>
                <div className='w-1/3 text-amber-100 flex flex-col items-center justify-center'>
                    <Mail className='w-14 h-14' />
                    <p>Messages Shared</p>
                    <p className='pt-1 text-3xl font-semibold'>{petitionNotesCountOk ? petitionNotesCount : "-"}</p>
                </div>
                <div className='w-1/3 text-amber-100 flex flex-col items-center justify-center'>
                    <Pen className='w-14 h-14' />
                    <p>Peitition Signatures</p>
                    <p className='pt-1 text-3xl font-semibold'>{petitionCountOk ? petitionCount : "-"}</p>
                </div>
                <div className='w-1/3 text-amber-100 flex flex-col items-center justify-center'>
                    <Mountain className='w-14 h-14' />
                    <p>United for Sierra Madre</p>
                    <p className='pt-1 text-3xl text-green-2 font-semibold'>One Voice</p>
                </div>

            </div>
        </div>

        <section className='w-full px-20 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {petitionNotesOk && petitionNotes && petitionNotes.length > 0 ? petitionNotes.map((note) => (
                note.note && <SigneeNote key={note.id} name={note.sender} date={note.date.toISOString()} message={note.note} />
            )) : (
                <div className='col-span-3 text-center text-gray-500'>
                    <p>No notes found</p>
                </div>
            )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className='w-full px-20 pb-20 flex items-center justify-center gap-2'>
                <Link
                    href={hasPrevious ? `/signee-notes?page=${page - 1}&limit=${limit}` : '#'}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
                        hasPrevious 
                            ? 'bg-green-6 text-white hover:bg-green-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                >
                    <ChevronLeft className='w-4 h-4' />
                    Previous
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
                                    {showEllipsis && <span className='px-2 text-gray-400'>...</span>}
                                    <Link
                                        href={`/signee-notes?page=${pageNum}&limit=${limit}`}
                                        className={`px-4 py-2 rounded-md transition-colors ${
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
                    className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
                        hasNext 
                            ? 'bg-green-6 text-white hover:bg-green-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                >
                    Next
                    <ChevronRight className='w-4 h-4' />
                </Link>
            </div>
        )}

        <section className="flex flex-col w-full items-center justify-center min-h-[40dvh] lg:min-h-[500px] bg-cover bg-center bg-no-repeat bg-signee-notes-add-your-voice">
            <div className='mb-8 flex flex-col items-center'>
                <h1 className='text-amber-100 font-bold text-6xl'>Add your 
                    <span className='italic font-serif text-green-2'>Voice</span>
                </h1>
                <p className='text-center text-white text-lg'>Sign the petition and share your message about why Sierra Madre matters to you. <br />
                Your voice can make a difference.</p>
            </div>

            <Link href='/sign' className='px-6 py-2 bg-green-6 text-white rounded-md'>Sign the Petition</Link>

        </section>

        <Footer />
    </div>
  )
}

export default SigneeNotesPage