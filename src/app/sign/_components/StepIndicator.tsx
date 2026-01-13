interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string }[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={stepNumber} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold font-instrument transition-colors ${
                    isActive || isCompleted
                      ? "bg-[#4D724D] text-white"
                      : "border-2 border-[#4D724D] text-[#4D724D]"
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`text-xs mt-2 font-instrument ${
                    isActive ? "text-gray-600" : "text-[#4D724D]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-40 h-0.5 bg-[#4D724D] mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
