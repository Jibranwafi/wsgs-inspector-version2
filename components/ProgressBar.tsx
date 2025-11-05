
import { User, ClipboardCheck, CarFront, FileText } from 'lucide-react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const stepIcons = [
    { icon: User },
    { icon: ClipboardCheck },
    { icon: CarFront },
    { icon: FileText },
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
        <div className="w-full py-2 px-4 md:px-6">
            <div className="relative max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-full">
                {/* Progress Line Container */}
                <div className="relative h-8 md:h-10 flex items-center">
                    {/* Progress Line Background */}
                    <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-gray-300 rounded-full transform -translate-y-1/2 hidden md:block">
                        {/* Progress Fill */}
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-in-out rounded-full"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>

                    {/* Icons positioned at edges of progress bar */}
                    <div className="relative w-full flex justify-between items-center">
                        {stepIcons.map((step, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isCurrent = stepNumber === currentStep;
                            const Icon = step.icon;

                            return (
                                <div 
                                    key={stepNumber} 
                                    className="relative z-10 flex items-center justify-center"
                                >
                                    {/* Icon positioned at edge */}
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-[3px] transition-all duration-300 ${
                                            isCompleted
                                                ? 'bg-green-500 border-green-500 text-white shadow-md'
                                                : isCurrent
                                                ? 'bg-blue-500 border-blue-500 text-white shadow-md scale-110'
                                                : 'bg-white border-gray-300 text-gray-400 shadow-sm'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Progress Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 rounded-full transform -translate-y-1/2 md:hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-in-out rounded-full"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}