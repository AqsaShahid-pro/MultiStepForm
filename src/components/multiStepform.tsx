import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { StepFormData } from "@/types";
import { UseMultiStepForm } from "@/hooks/use-multi-step-form";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProgressSteps from "@/components/progress-steps";
import {
  PersonalInfoStep,
  ProfessionalInfoStep,
  BillingInfoStep,
} from "./steps";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MultiStepForm = () => {
  //creating custom hook that is the main player which binds all the logic of going to other pages and connecting zod with our form

  //importing data from our custom hook
  const {
    currentStep, //which step we are on 0,1,2
    formData, // accumulated data from all steps
    isFirstStep, //boolean -  are we on first step?
    isLastStep, // boolean - are we on last step?
    isSubmitted, //boolean- has the form been submitted?
    steps, //array of step metadata(for progress indicatior)

    goToNextStep, // function to advance
    goToPreviousStep, //function to go back
    updateFormData, //function to save step data
    submitform, //function for final submission
    resetForm, //  function to reset the form
    getCurrentStepSchema, // function returning current zod schema
  } = UseMultiStepForm();

  const {
    register, // responsible for taking data from form
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    setValue,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    //last step to be coded
    //manual validation check
    const isValid = await trigger();
    if (!isValid) return;

    //merge current step data with all previous data
    console.log(data, formData);
    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    if (isLastStep) {
      try {
        submitform(updatedData);
      } catch (error) {
        console.error("submission failed: " + error);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep == 0 && (
            <PersonalInfoStep register={register} errors={errors} />
          )}
          {currentStep == 1 && (
            <ProfessionalInfoStep
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {currentStep == 2 && (
            <BillingInfoStep register={register} errors={errors} />
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button type="button" onClick={handleSubmit(onNext)}>
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
