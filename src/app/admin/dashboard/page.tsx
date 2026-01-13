import Sidebar from '../_components/Sidebar'
import SummaryCard from '../_components/SummaryCard'
import  Chart  from '../_components/Chart'
import  RecentActivity from '../_components/RecentActivity'
import { getUsersAction } from '../../../actions/users.actions'
import { getActivePublicationsAction } from '@/src/actions/publications.actions'
import { getPetitionCount, getRecentPetitions, getPetitionsByWeek } from '@/src/services/petition.service'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  // Fetch all dashboard data in parallel from different sources
  const [usersResult, publicationsResult, totalSignatures, chartData, recentPetitions] = await Promise.all([
    getUsersAction(),
    getActivePublicationsAction(false),
    getPetitionCount(),
    getPetitionsByWeek(),
    getRecentPetitions(4),
  ]);

  // Collate the data from different tables
  const summaryData = {
    totalSignatures: totalSignatures,
    activeUsers: usersResult.success && usersResult.data ? usersResult.data.length : 0,
    totalPublications: publicationsResult.success && publicationsResult.data ? publicationsResult.data.length : 0,
  };

  // Transform recent petitions to activity format
  const activityData = recentPetitions.map((petition) => ({
    id: petition.petitionId.toString(),
    title: "New Signee",
    description: `${petition.firstName} ${petition.lastName} signed the petition`,
    timestamp: formatTimestamp(petition.createdAt),
  }));

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
            <SummaryCard summaryData={summaryData} />
          </div>
          <div className='flex justify-between'>
            <Chart chartData={chartData} />
            <RecentActivity items={activityData} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to format timestamp relative to now
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  
  return date.toLocaleDateString();
}


