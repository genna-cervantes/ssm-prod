export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
}

interface RecentActivityProps {
  items?: ActivityItem[]
  limit?: number
}

const defaultActivity: ActivityItem[] = [];

export default function RecentActivity({ items = defaultActivity, limit = 4 }: RecentActivityProps) {
  const displayItems = items.slice(0, limit);
  const hasActivities = displayItems.length > 0;

  return (
    <div className='w-[301px] h-[358px] bg-[#FDF7F1] p-4 flex flex-col rounded-lg font-instrument'
    style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
      <div className='font-semibold text-lg mb-4'>Recent Activity</div>
      <div className='flex-1 overflow-y-auto'>
        {hasActivities ? (
          displayItems.map((item, index) => (
            <div key={item.id} className="font-roboto">
              <div className="p-2">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-black/70">{item.description}</p>
                <p className="text-xs text-black/50 mt-1">{item.timestamp}</p>
              </div>
              {index < displayItems.length - 1 && <div className="border-b border-black/10" />}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-black/50">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}

