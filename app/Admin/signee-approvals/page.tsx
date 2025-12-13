"use client"

import Sidebar from "../components/Sidebar"
import Approvals from "../components/Approvals"
import { useState } from "react"

interface Submission {
  id: string
  name: string
  email: string
  notes: string
  status: "pending" | "approved" | "rejected"
}

const initialSubmissions: Submission[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    notes: "Concerned about water quality",
    status: "pending",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    notes: "Environmental impact assessment needed",
    status: "approved",
  },
]



export default function SigneeApproval() {

  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const handleApprove = (id: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "approved" } : s)))
  }

  const handleReject = (id: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "rejected" } : s)))
  }

  const handleDelete = (id: string) => {
    setSubmissions(submissions.filter((s) => s.id !== id))
  }

  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px] overflow-auto">
        <div className='w-full h-[109px] border-b-2 border-[#A2A2A299]/60'></div>
        <div className='w-[1074px] flex flex-col flex-1 pl-6 pr-12 py-9'>
          <div className='flex flex-col gap-0.5 mb-8'>
            <div className='font-bold text-4xl'>Signee Approvals</div>
            <div>
              <p className='font-medium text-lg text-black/60 text-balance'>
                Review and Approve notes from petition signees.  
              </p>
            </div>
          </div> 
          <div className="w-full py-2 px-1 flex flex-col gap-4">
            {submissions.map((submission) => (
            <Approvals
              key={submission.id}
              submission={submission}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
