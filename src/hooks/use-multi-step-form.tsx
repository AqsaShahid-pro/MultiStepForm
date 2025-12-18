//this is our custom hook
import {
  personalInforSchema,
  professionalInforSchema,
  billingInfoSchema,
  type Step,
  type StepFormData,
} from "@/types";
import { User, BriefcaseBusiness, CreditCard } from "lucide-react"; //come from shadcn
import { useState } from "react";

const stepSchemas = [
  personalInforSchema,
  professionalInforSchema,
  billingInfoSchema,
];

export const steps: Step[] = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "professional", name: "Professional Info", icon: BriefcaseBusiness },
  { id: "billing", name: "Billing Info", icon: CreditCard },
];
export function UseMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  //Helper functions
  //Returns schems for the current step.
  const getCurrentStepSchema = () => stepSchemas[currentStep];

  //go to next step
  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  //go to previous step
  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  //merger and update form data
  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  //handle submit function. API could be called at this step
  const submitform = (data: StepFormData) => {
    console.log("submitted data: " + data);
    setIsSubmitted(true);
  };

  //reset the entire form

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({});
    setCurrentStep(0);
  };

  //return them to be used across the project

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,

    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitform,
    resetForm,
    getCurrentStepSchema,
  };
}
