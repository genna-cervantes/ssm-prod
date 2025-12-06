"use client"

// 1. Define what props the button accepts
interface ApprovalsButtonProps {
  children: React.ReactNode;     
  onClick?: () => void;          
  color?: "blue" | "red" | "gray" | "green";
  className?: string;             
}

export default function ApprovalsButton({ 
  children, 
  onClick, 
  color = "blue", 
  className = "" 
}: ApprovalsButtonProps) {

  
  const colorStyles = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    green: "bg-emerald-600 hover:bg-emerald-700 text-white",
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 ${colorStyles[color]} ${className}`}
    >
      {children}
    </button>
  );
}