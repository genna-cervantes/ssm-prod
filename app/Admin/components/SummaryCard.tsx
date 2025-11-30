import type React from "react"

interface SummaryCardProps{
  icon: React.ReactNode
  title: string
  value: string | number
  trend? : string
  isPositive?: boolean
}

export default function SummaryCard({ icon, title, value, trend, isPositive = true }: SummaryCardProps) {
  return(
    <div className="
      flex flex-col justify-between bg-[#FDF7F1] rounded-lg w-60 h-28 p-3 font-instrument"
      style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-base text-[#00000099]">{title}</div >
        <div className="bg-[#74934023] rounded-lg p-1">{icon}</div>
      </div>
      <div className="font-semibold text-xl">{value}</div>
      
      {trend && (
        <div className={`text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>{trend}</div>
      )}

    </div>
  );

}