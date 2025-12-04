import Sidebar from '../components/Sidebar'
import SummaryCard from '../components/SummaryCard'
import  Chart  from '../components/Chart'
import  RecentActivity from '../components/RecentActivity'

export default function Dashboard() {
  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px]">
        <div className='w-full h-[109px] border-b-2 border-[#A2A2A299]/60'></div>
        <div className='w-[1074px] flex flex-col flex-1 pl-6 pr-12 py-9'>
          <div className='flex flex-col gap-0.5 mb-8'>
            <div className='font-bold text-4xl'>Admin Dashboard</div>
            <div>
              <p className='font-medium text-lg text-black/60 text-balance'>
                Welcome back, Here&apos;s what&apos;s happening with your campaign.
              </p>
            </div>
          </div>
          <div className='w-full mb-5'>
            <SummaryCard/>
          </div>
          <div className='flex justify-between'>
            <Chart />
            <RecentActivity/>
          </div>
        </div>
      </div>
    </div>
  )
}


