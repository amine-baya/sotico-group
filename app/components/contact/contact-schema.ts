import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2, "firstName"),
  lastName: z.string().trim().min(2, "lastName"),
  email: z.string().trim().email("email"),
  phone: z.string().trim().optional(),
  company: z.string().trim().min(2, "company"),
  jobTitle: z.string().trim().optional(),
  enquiryType: z.string().trim().min(1, "enquiryType"),
  message: z.string().trim().min(10, "message"),
  locale: z.enum(["en", "fr"]),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
