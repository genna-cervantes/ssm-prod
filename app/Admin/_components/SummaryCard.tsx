import Image from "next/image";
import type React from "react";

interface SummaryData {
  totalSignatures: number;
  activeUsers: number;
  totalPublications: number;
}

interface SummaryCardsProps {
  summaryData: SummaryData;
}

export default function SummaryCards({ summaryData }: SummaryCardsProps) {
  const cards = [
    {
      id: 1,
      title: "Total Signatures",
      value: summaryData.totalSignatures.toLocaleString(),
      icon: "/summary/total-sig-icon.svg",
    },
    {
      id: 2,
      title: "Active Users",
      value: summaryData.activeUsers.toLocaleString(),
      icon: "/summary/summary-users-icon.svg",
    },
    {
      id: 3,
      title: "Publications",
      value: summaryData.totalPublications.toLocaleString(),
      icon: "/summary/summary-published-icon.svg",
    },
    {
      id: 4,
      title: "Engagement Rate",
      value: summaryData.totalSignatures > 0 
        ? `${Math.round((summaryData.activeUsers / summaryData.totalSignatures) * 100)}%`
        : "0%",
      icon: "/summary/summary-engagement-icon.svg",
    },
  ];

  return (
    <div className="flex justify-between flex-wrap">
      {cards.map((card) => (
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
        </div>
      ))}
    </div>
  );
}
