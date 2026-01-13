"use client";

import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface ThankYouSectionProps {
  onSignAnother: () => void;
}

export default function ThankYouSection({ onSignAnother }: ThankYouSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F4F9E8] to-[#C7E592] py-12 px-4">
      <div className="font-inter max-w-3xl mx-auto">
        {/* Thank You Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4D724D] mb-6">
            Thank you for your support!
          </h1>
          <p className="text-lg text-[#4D724D] italic mb-2">
            Your signature has been added to the petition.
          </p>
          <p className="text-lg text-[#4D724D] italic">
            Together, we are making a difference in protecting Sierra Madre.
          </p>
        </div>

        {/* Share Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
            Help us reach our goal by sharing this petition:
          </h2>
          <ShareButtons />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onSignAnother}
            className="bg-transparent border-2 border-[#4D724D] text-[#4D724D] hover:bg-[#4D724D] hover:text-white text-md font-semibold px-12 py-3 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
          >
            Sign Another
          </button>
          <Link
            href="/signee-notes"
            className="bg-[#4D724D] hover:bg-green-800 text-md text-white font-semibold px-12 py-3 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
          >
            View All Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
