import { Input } from "@/components/ui/input";
import type { AllFormFields, StepFormData } from "@/types";
import { Label } from "@radix-ui/react-label";
import type { useForm } from "react-hook-form";

const FormField = ({
  id,
  label,
  register,
  errors,
  type = "text",
  maxLength,
}: {
  id: keyof AllFormFields;
  label: string;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  type?: string;
  maxLength?: number;
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {/* register takes the id of fields like firstName, lastname defined in zod file */}
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />

      {errors[id] && (
        <p className="text-sm text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default FormField;
