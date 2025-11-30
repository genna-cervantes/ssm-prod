import React from 'react'
import Sidebar from '../components/Sidebar'
import SummaryCard from '../components/SummaryCard'
import  Chart  from '../components/Chart'
import  RecentActivity from '../components/RecentActivity'
import Image from 'next/image'


const summaryData = [
  {
    id: 1,
    title: "Total Signatures",
    value: "12,847",
    trend: "+324 this week",
    isPositive: true,
    icon: "/summary/total-sig-icon.svg"
  },
  {
    id: 2,
    title: "Active Users",
    value: "2,456",
    trend: "+142 this week",
    isPositive: true,
    icon: "/summary/summary-users-icon.svg"
  },
  {
    id: 3,
    title: "Publications",
    value: "48",
    trend: "+3 this month",
    isPositive: true,
    icon: "/summary/summary-published-icon.svg"
  },
  {
    id: 4,
    title: "Total Signatures",
    value: "12,847",
    trend: "+324 this week",
    isPositive: true,
    icon: "/summary/summary-engagement-icon.svg"
  }
]

function Dashboard() {
  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px]">
        <div className='w-full h-[109px] border-b-2 border-[#A2A2A299]/60'></div>
        <div className='w-[1074px] flex flex-col flex-1 pl-6 pr-12 py-9'>
          <div className='flex flex-col gap-0.5 mb-8'>
            <div className='font-bold text-4xl'>Admin DashBoard</div>
            <div>
              <p className='font-medium text-lg text-black/60 text-balance'>
                Welcome back, Here&apos;s what&apos;s happening with your campaign.
              </p>
            </div>
          </div>
          <div className='w-full mb-5'>
            <div className='flex justify-between'>
              {summaryData.slice(0,4).map((card) => (
              <SummaryCard
              key={card.id}
              icon={
                <Image 
                  src={card.icon} 
                  alt="Total Signatures" 
                  width={24} 
                  height={24} 
                  className="object-contain"
                />
              }
              title={card.title}
              value={card.value}
              trend={card.trend}
              isPositive={card.isPositive}
              />  
            ))}
            </div>
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

export default Dashboard
