import type React from 'react';
import {z} from 'zod';

export const personalInforSchema = z.object({
    firstName: z.string().min(1,"First Name is Required"),
    lastName:z.string().min(1,"Last Name is Required"),
    email: z.string().email("Invalid Email"),
    phone: z.string().min(10,"Phone number is short")
});

export const professionalInforSchema = z.object({
    company: z.string().min(1,"Company is Required"),
    position: z.string().min(1,"Position is Required"),
    experience: z.enum(["0-2","3-5","6-10","10+"]),
    industry: z.string().min(1,"Industry is Required"),
});

export const billingInfoSchema = z.object({
    cardNumber : z.string().min(16,"min 16 digits are required").max(16,"max 16 digits"),
    cardHolderName : z.string().min(1,"Card holder Name is Required"),
    expiryDate : z.string().min(4,"Invalid date"),
    cvv: z.string().min(3,"Invalid cvv").max(4)
});

export type PersonalInfo = z.infer<typeof personalInforSchema>;
export type ProfessionaInfo = z.infer<typeof professionalInforSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;

export type StepFormData = PersonalInfo | ProfessionaInfo | BillingInfo;

export type AllFormFields = PersonalInfo & ProfessionaInfo & BillingInfo;

export interface Step{
    id: string; 
    name: string; 
    icon: React.ComponentType<{className?:string}>;
}