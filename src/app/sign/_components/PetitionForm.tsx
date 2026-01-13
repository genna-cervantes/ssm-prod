"use client";

import { useState, useTransition } from "react";
import { signPetitionAction, addPetitionNoteAction } from "@/src/actions/petition.actions";
import StepIndicator from "./StepIndicator";
import ThankYouSection from "./ThankYouSection";

interface PetitionFormProps {
  initialSignatureCount: number;
  goalSignatures?: number;
}

const STEPS = [
  { label: "Your Information" },
  { label: "Your Message" },
];

export default function PetitionForm({
  initialSignatureCount,
  goalSignatures = 10000,
}: PetitionFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [petitionId, setPetitionId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    occupation: "",
    affiliation: "",
    message: "",
    displayName: "",
  });

  const progress = Math.min((initialSignatureCount / goalSignatures) * 100, 100);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.emailAddress) {
      setError("Please fill in all required fields");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setError(null);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      setError(null);

      // Step 1: Sign the petition
      const petitionFormData = new FormData();
      petitionFormData.append("firstName", formData.firstName);
      petitionFormData.append("lastName", formData.lastName);
      petitionFormData.append("emailAddress", formData.emailAddress);
      petitionFormData.append("occupation", formData.occupation);
      petitionFormData.append("affiliation", formData.affiliation);

      const petitionResult = await signPetitionAction(petitionFormData);

      if (!petitionResult.ok) {
        setError(petitionResult.error ?? "Failed to sign petition");
        return;
      }

      const newPetitionId = petitionResult.data?.petitionId;
      if (!newPetitionId) {
        setError("Failed to get petition ID");
        return;
      }

      setPetitionId(newPetitionId);

      // Step 2: Add note if message or display name is provided
      if (formData.message || formData.displayName) {
        const noteFormData = new FormData();
        noteFormData.append("petitionId", String(newPetitionId));
        noteFormData.append("sender", formData.displayName || "Anonymous");
        noteFormData.append("note", formData.message);

        const noteResult = await addPetitionNoteAction(noteFormData);

        if (!noteResult.ok) {
          // Note failed but petition succeeded - still show success
          console.error("Failed to add note:", noteResult.error);
        }
      }

      setSubmitted(true);
    });
  };

  const handleSignAnother = () => {
    setSubmitted(false);
    setStep(1);
    setPetitionId(null);
    setError(null);
    setFormData({
      firstName: "",
      lastName: "",
      emailAddress: "",
      occupation: "",
      affiliation: "",
      message: "",
      displayName: "",
    });
  };

  if (submitted) {
    return <ThankYouSection onSignAnother={handleSignAnother} />;
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
              {initialSignatureCount.toLocaleString()} signatures
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
          <StepIndicator currentStep={step} steps={STEPS} />

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Your Information */}
          {step === 1 && (
            <div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 font-instrument">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Given Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
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
                    name="emailAddress"
                    value={formData.emailAddress}
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
                  rows={6}
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
                  disabled={isPending}
                  className="bg-white border-2 border-[#4D724D] text-[#4D724D] hover:bg-gray-50 text-md font-semibold px-12 py-2 rounded-lg transition-colors duration-200 font-instrument cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="bg-[#4D724D] hover:bg-green-800 text-md text-white font-semibold px-12 py-2 rounded-lg transition-colors duration-200 font-instrument cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Signing..." : "Sign the Petition"}
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
