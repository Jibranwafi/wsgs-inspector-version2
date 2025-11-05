

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrevious: () => void;
    isFormValid?: boolean;
  }
  
  export default function NavigationButtons({
    currentStep,
    totalSteps,
    onNext,
    onPrevious,
    isFormValid = true,
  }: NavigationButtonsProps) {
    return (
      <div className="flex flex-row justify-center gap-4 w-full md:px-32 text-2xl font-light">
        {currentStep > 1 && (
          <button
            onClick={onPrevious}
            className="px-6 py-2 md:rounded-xl rounded-md  bg-gray-300 hover:bg-gray-400 hover:scale-105 transition-all duration-200 text-black w-full"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-6 py-2 md:rounded-xl rounded-md  w-full transition-all duration-200 ${
            !isFormValid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : currentStep === totalSteps
              ? "bg-green-500 hover:bg-green-600 hover:scale-105 text-white"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white"
          }`}
        >
          {currentStep === totalSteps ? "Download Report" : "Next"}
        </button>
      </div>
    );
  }