"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/sign");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.origin + "/sign" : "";

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Facebook */}
      <button
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank"
          )
        }
        className="flex flex-col items-center justify-center bg-[#F5F1ED] hover:bg-[#E8E2DC] p-6 rounded-lg transition-colors duration-200"
      >
        <svg
          className="w-12 h-12 text-blue-600 mb-3"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-sm text-gray-600 font-semibold">
          Share to Facebook
        </span>
      </button>

      {/* X (Twitter) */}
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Protect Sierra Madre. Protect the Future.`,
            "_blank"
          )
        }
        className="flex flex-col items-center justify-center bg-[#F5F1ED] hover:bg-[#E8E2DC] p-6 rounded-lg transition-colors duration-200"
      >
        <svg
          className="w-12 h-12 text-black mb-3"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm text-gray-600 font-semibold">Share to X</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex flex-col items-center justify-center bg-[#F5F1ED] hover:bg-[#E8E2DC] p-6 rounded-lg transition-colors duration-200"
      >
        <svg
          className="w-12 h-12 text-gray-600 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span className="text-sm text-gray-600 font-semibold">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>
    </div>
  );
}
