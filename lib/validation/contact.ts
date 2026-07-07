import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address."),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more about what you need."),
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string>>;