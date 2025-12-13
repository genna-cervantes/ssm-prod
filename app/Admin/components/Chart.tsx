"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { date: "Jan 1", signatures: 400, engagement: 240 },
  { date: "Jan 8", signatures: 1100, engagement: 650 },
  { date: "Jan 15", signatures: 800, engagement: 420 },
  { date: "Jan 22", signatures: 1300, engagement: 700 },
  { date: "Jan 29", signatures: 950, engagement: 500 },
  { date: "Feb 5", signatures: 1550, engagement: 950 },
  { date: "Feb 12", signatures: 1250, engagement: 800 },
]

export default function Chart() {
  return (
    <div className="bg-[#FDF7F1]  rounded-lg p-4  w-[678px] h-[358px] font-instrument"
    style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black">Campaign Activity</h3>
        <p className="text-sm font-medium text-black/60">Signatures and user engagement overtime</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} domain={[0, 2000]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="signatures"
            stroke="#4a7c59"
            strokeWidth={2}
            dot={{ fill: "#4a7c59", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#a8c896"
            strokeWidth={2}
            dot={{ fill: "#a8c896", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
