interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isClickable = onStepClick && step.number <= currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick?.(step.number)}
              disabled={!isClickable}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : ''}
                ${isCompleted ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-800 text-gray-500' : ''}
                ${isClickable ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              <span className={`
                w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                ${isActive ? 'bg-white text-purple-600' : ''}
                ${isCompleted ? 'bg-green-500 text-white' : ''}
                ${!isActive && !isCompleted ? 'bg-gray-700 text-gray-500' : ''}
              `}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </span>
              <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
            </button>

            {index < steps.length - 1 && (
              <div className={`
                w-8 h-0.5 mx-1
                ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-700'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}
