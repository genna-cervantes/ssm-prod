import { Trash2 } from "lucide-react"; 
import DeleteButton from "./DeleteButton";


interface ApprovalCardProps {
  submission: {
    id: number
    sender: string
    email: string|null
    date: Date
    note: string|null
  }
}


export default function Approvals({ 
  submission, 
}: ApprovalCardProps) {

  return (
    <div 
      className="flex flex-col justify-between bg-[#FDF7F1] rounded-lg w-[1040px] p-6 font-instrument"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className='text-lg font-semibold'>{submission.sender}</p>
          <p className='text-sm font-medium text-gray-500'>{submission?.email ?? "No email"}</p>
          <p className='text-sm font-medium text-gray-500'>{submission.date.toLocaleDateString() ?? "No date"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <p className="text-xs font-medium text-gray-500">Note:</p>
        <div className="bg-gray-200 p-3 rounded-md  overflow-y-auto">
          <p className="text-sm">{submission.note ?? "Empty note"}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-start items-center mt-4">

        <DeleteButton id={submission.id}>
          <Trash2 className="w-4 h-4" /> Delete
        </DeleteButton>

      </div>
    </div>
  )
}