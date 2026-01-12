"use client";

import React, { useState } from "react";

export default function SierraMadrePetition() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    givenName: "",
    lastName: "",
    email: "",
    occupation: "",
    affiliation: "",
    message: "",
    displayName: "",
  });

  const currentSignatures = 78041;
  const goalSignatures = 128095;
  const progress = (currentSignatures / goalSignatures) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!formData.givenName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    console.log("Petition signed:", formData);
    setSubmitted(true);
  };

  const handleReturnHome = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      givenName: "",
      lastName: "",
      email: "",
      occupation: "",
      affiliation: "",
      message: "",
      displayName: "",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  // If submitted, show thank you page
  if (submitted) {
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

            {/* Share Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Facebook */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
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
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=Protect Sierra Madre. Protect the Future.`,
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
                <span className="text-sm text-gray-600 font-semibold">
                  Share to X
                </span>
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
                  Copy Link
                </span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReturnHome}
              className="bg-transparent border-2 border-[#4D724D] text-[#4D724D] hover:bg-[#4D724D] text-md font-semibold px-12 py-3 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
            >
              Return Home
            </button>
            <button
              onClick={() => alert("Viewing all messages...")}
              className="bg-[#4D724D] hover:bg-green-800 text-md text-white font-semibold px-12 py-3 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
            >
              View All Messages
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F4F9E8] to-[#C7E592] py-12 px-4">
      <div className="font-inter max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4D724D] mb-2">
            Protect Sierra Madre.
          </h1>
          <h2 className="text-5xl font-bold text-[#4D724D]">
            Protect the Future.
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 font-instrument">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-[#4D724D]">
              {currentSignatures.toLocaleString()} signatures
            </span>
            <span className="text-sm font-bold text-[#625541]">
              Goal: {goalSignatures.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-[#FAF6F2] rounded-full h-4 overflow-hidden shadow-[0_2px_6px_rgba(77,114,77,0.4)]">
            <div
              className="bg-[#4D724D] h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step Indicators */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${
                    step === 1
                      ? "bg-[#4D724D] text-white"
                      : "border-2 border-[#4D724D] text-[#4D724D]"
                  } flex items-center justify-center font-semibold font-instrument`}
                >
                  1
                </div>
                <span
                  className={`text-xs mt-2 font-instrument ${
                    step === 1 ? "text-gray-600" : "text-[#4D724D]"
                  }`}
                >
                  Your Information
                </span>
              </div>
              <div className="w-40 h-0.5 bg-[#4D724D] mx-2"></div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${
                    step === 2
                      ? "bg-[#4D724D] text-white"
                      : "border-2 border-[#4D724D] text-[#4D724D]"
                  } flex items-center justify-center font-semibold font-instrument`}
                >
                  2
                </div>
                <span
                  className={`text-xs mt-2 font-instrument ${
                    step === 2 ? "text-gray-600" : "text-[#4D724D]"
                  }`}
                >
                  Your Message
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: Your Information */}
          {step === 1 && (
            <div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-instrument">
                {/* Given Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Given Name*
                  </label>
                  <input
                    type="text"
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleInputChange}
                    placeholder="Juan"
                    className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Dela Cruz"
                    className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juandelacruz@email.com"
                    className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Student"
                    className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Affiliation/Organization */}
              <div className="mb-8 font-instrument">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Affiliation/Organization
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  placeholder="Save Sierra Madre Network Alliance Inc."
                  className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                />
              </div>

              {/* Next Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="bg-[#4D724D] hover:bg-green-800 text-md text-white font-semibold px-16 py-2 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              {/* Message Field */}
              <div className="mb-6 font-instrument">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Share Your Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share why Sierra Madre matters to you and why you're signing this petition..."
                  rows="6"
                  className="w-full px-4 py-3 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-600 italic mt-2">
                  Your message will inspire others to join the cause and show
                  decision-makers the human impact of environmental protection.
                </p>
              </div>

              {/* Display Name Field */}
              <div className="mb-8 font-instrument">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Enter Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="Anonymous"
                  className="w-full px-4 py-2 border border-[#D0D2D0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D724D] focus:border-transparent"
                />
                <p className="text-xs text-gray-600 italic mt-2">
                  This will appear with your message in the Notes from Signees
                  wall.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleBack}
                  className="bg-white border-2 border-[#4D724D] text-[#4D724D] hover:bg-gray-50 text-md font-semibold px-12 py-2 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#4D724D] hover:bg-green-800 text-md text-white font-semibold px-12 py-2 rounded-lg transition-colors duration-200 font-instrument cursor-pointer"
                >
                  Sign the Petition
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-6 text-sm text-[#242C16] italic max-w-2xl mx-auto">
          <p>
            By signing this petition, you agree to receive updates about Sierra
            Madre conservation efforts.
          </p>
          <p className="mt-1">
            Your information will be kept confidential and used only for
            advocacy purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
