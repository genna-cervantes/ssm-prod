interface ActivityItem{
  id: string
  title: string
  description: string
  timestamp: string
}

interface RecentActivityProps {
  items?: ActivityItem[]
  limit?: number
}

const defaultActivity: ActivityItem[] = [
  { 
    id: "1",
    title: "New Signee",
    description: "Maria Concepecios signed the petition",
    timestamp: "2 minutes ago"
  },
  {
    id: "2",
    title: "New Signee",
    description: "Maria Concepecios signed the petition",
    timestamp: "2 minutes ago",
  },
  {
    id: "3",
    title: "New Signee",
    description: "Maria Concepecios signed the petition",
    timestamp: "2 minutes ago",
  },
  
  {
    id: "4",
    title: "New Signee",
    description: "Maria Concepecios signed the petition",
    timestamp: "2 minutes ago",
  }
]

export default function RecentActvity({items = defaultActivity, limit = 4}: RecentActivityProps){
  return(
    <div className='w-[301px] h-[358px] bg-[#FDF7F1] p-4 flex flex-col justify-between rounded-lg font-instrument'
    style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
      <div className='font-semibold text-lg'>Recent Activity</div>
      <div>
         {items.slice(0,4).map((item,index) => (
          <div key={item.id} className="font-roboto">
            <div className="p-2">
              <p className="font-medium  text-sm">{item.title}</p>
              <p className="text-xs">{item.description}</p>
              <p className="text-xs">{item.timestamp}</p>
            </div>
            {index < Math.min(limit, items.length) - 1 && <div className="border-b border-black/10" />}
          </div>
         ))}
      </div>
    </div>
  );
}

