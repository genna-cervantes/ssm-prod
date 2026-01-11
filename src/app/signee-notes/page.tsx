import { Header } from '../_components/Header'
import { Mail, Mountain, Pen } from 'lucide-react'
import Footer from '../_components/Footer'
import SigneeNote from './_components/SigneeNote'
import Link from 'next/link'

const SigneeNotesPage = () => {
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
                    <p className='pt-1 text-3xl font-semibold'>12</p>
                </div>
                <div className='w-1/3 text-amber-100 flex flex-col items-center justify-center'>
                    <Pen className='w-14 h-14' />
                    <p>Peitition Signatures</p>
                    <p className='pt-1 text-3xl font-semibold'>78,041</p>
                </div>
                <div className='w-1/3 text-amber-100 flex flex-col items-center justify-center'>
                    <Mountain className='w-14 h-14' />
                    <p>United for Sierra Madre</p>
                    <p className='pt-1 text-3xl text-green-2 font-semibold'>One Voice</p>
                </div>

            </div>
        </div>

        <section className='w-full px-20 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <SigneeNote name="John Doe" date="2024-01-01" message="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <SigneeNote name="John Doe" date="2024-01-01" message="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <SigneeNote name="John Doe" date="2024-01-01" message="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />

            {/* optional load more */}
        </section>

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