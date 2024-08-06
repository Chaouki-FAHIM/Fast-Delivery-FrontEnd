import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    return (
        <div className="flex justify-center items-center mb-4">
            <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-black' : 'bg-gray-300'} flex items-center justify-center`}>
                <span className="text-white">1</span>
            </div>
            <div className={`w-24 h-1 ${currentStep >= 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-black' : 'bg-gray-300'} flex items-center justify-center`}>
                <span className="text-white">2</span>
            </div>
            <div className={`w-24 h-1 ${currentStep >= 3 ? 'bg-black' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full ${currentStep === 3 ? 'bg-black' : 'bg-gray-300'} flex items-center justify-center`}>
                <span className="text-white">3</span>
            </div>
        </div>
    );
};

export default StepIndicator;
