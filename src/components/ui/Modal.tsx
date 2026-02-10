import React from "react";
import { useState } from "react";
import Icon from "./Icon";

interface Step {
    title: string;
    content: React.ReactNode;
}
  
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode | string;
    title?: string;
    type?: 'fullscreen' | 'notification' | 'dialog' | 'multistep';
    allowClose?: boolean;
    clickOnBlank?: boolean;
    steps?: Step[];
    initialStep?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  children,
  title,
  type,
  allowClose,
  clickOnBlank = false,
  steps = [],
  initialStep = 0
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (type === 'notification') {
    className = 'w-96';
    allowClose = true;
    clickOnBlank = true;
  }

  if (type === 'fullscreen') {
    className = 'w-11/12';
  }

  if (type === 'multistep') {
    className = 'w-11/12';
    allowClose = true;
    clickOnBlank = false;
    initialStep = 0;
  }

  const renderContent = () => {
    if (type === 'multistep' && steps.length > 0) {
      return (
        <div>
          <div className="mb-4 step-indicators">
            {steps.map((step, index) => (
              <div key={index} className={`step ${index === currentStep ? 'font-bold' : ''}`}>
                {step.title}
              </div>
            ))}
          </div>
          <div>{steps[currentStep].content}</div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      );
    } 
    return children;
  };

  return (
    <div className={`fixed inset-0 bg-black/92 flex items-center justify-center z-500`} onClick={clickOnBlank ? handleClose : undefined}>
      <div className={`relative bg-white p-4 rounded shadow-lg ${className}`}>
        <div className={`flex flex-row items-center mb-2 text-lg ${ type !== 'multistep' ? 'justify-center' : 'justify-between text-shadow-gray-300 text-shadow-lg' }`}>
            {allowClose && (
              <button type="button" className="absolute top-1.5 -right-1.5 text-gray-900 hover:text-gray-700 cursor-pointer transition-opacity duration-300 hover:opacity" onClick={onClose}>
                <Icon name="x-circle" className="" size={6} />
              </button>
            )}
            {title && <h2 className="font-bold text-black mb-4">{title}</h2>}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};