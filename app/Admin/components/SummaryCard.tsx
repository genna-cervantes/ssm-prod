import Image from "next/image";
import type React from "react";

interface SummaryCardProps {
  icon: string; 
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
}

const summaryData = [
  {
    id: 1,
    title: "Total Signatures",
    value: "12,847",
    trend: "+324 this week",
    isPositive: true,
    icon: "/summary/total-sig-icon.svg",
  },
  {
    id: 2,
    title: "Active Users",
    value: "2,456",
    trend: "+142 this week",
    isPositive: true,
    icon: "/summary/summary-users-icon.svg",
  },
  {
    id: 3,
    title: "Publications",
    value: "48",
    trend: "+3 this month",
    isPositive: true,
    icon: "/summary/summary-published-icon.svg",
  },
  {
    id: 4,
    title: "Total Signatures",
    value: "12,847",
    trend: "+324 this week",
    isPositive: true,
    icon: "/summary/summary-engagement-icon.svg",
  },
];

export default function SummaryCards() {
  return (
    <div className="flex justify-between flex-wrap">
      {summaryData.slice(0, 4).map((card) => (
        <div
          key={card.id}
          className="
            flex flex-col justify-between bg-[#FDF7F1] rounded-lg w-60 h-28 p-3 font-instrument
          "
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium text-base text-[#00000099]">
              {card.title}
            </div>
            <div className="bg-[#74934023] rounded-lg p-1">
              <Image
                src={card.icon}
                alt={card.title}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>

          <div className="font-semibold text-xl">{card.value}</div>

          {card.trend && (
            <div
              className={`text-xs font-medium ${
                card.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {card.trend}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
