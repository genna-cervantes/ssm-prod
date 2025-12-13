"use client"
import React from "react";
import { Trash2, Check, X } from "lucide-react"; 
import ApprovalsButton from "./ApprovalsButtons";


interface ApprovalCardProps {
  submission: {
    id: string
    name: string
    email: string
    notes: string
    status: "pending" | "approved" | "rejected"
  }
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}

export default function Approvals({ 
  submission, 
  onApprove, 
  onReject, 
  onDelete 
}: ApprovalCardProps) {
  
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-gray-200 text-yellow-800",
    },
    approved: {
      label: "Approved",
      className: "bg-green-300 text-green-800",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-800",
    },
  }

  const config = statusConfig[submission.status]

  return (
    <div 
      className="flex flex-col justify-between bg-[#FDF7F1] rounded-lg w-[1040px] p-6 font-instrument"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className='text-lg font-semibold'>{submission.name}</p>
          <p className='text-sm font-medium text-gray-500'>{submission.email}</p>
        </div>
        <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${config.className}`}>
          {config.label}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <p className="text-xs font-medium text-gray-500">Notes:</p>
        <div className="bg-gray-200 p-3 rounded-md  overflow-y-auto">
          <p className="text-sm">{submission.notes}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-start items-center mt-4">
        
        {(submission.status === "pending" || submission.status === "rejected") && (
          <ApprovalsButton 
            color="green" 
            onClick={() => onApprove(submission.id)}
          >
            <Check className="w-4 h-4" /> Approve
          </ApprovalsButton>
        )}

        {/* Logic: If Pending or Approved, show Reject option */}
        {(submission.status === "pending" || submission.status === "approved") && (
          <ApprovalsButton 
            color="gray" 
            onClick={() => onReject(submission.id)}
          >
            <X className="w-4 h-4" /> Reject
          </ApprovalsButton>
        )}

        {/* Logic: Always show Delete */}
        <ApprovalsButton 
          color="red" 
          onClick={() => onDelete(submission.id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </ApprovalsButton>

      </div>
    </div>
  )
}