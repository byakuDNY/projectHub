import { z } from "zod";

const clientFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must be at most 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  description: z.string().optional(),
  contact: z.string().optional(),
  phone: z.string().min(8, {
    message: "Phone number must be at least 6 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  userId: z.string({ message: "Invalid string" }),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;
export default clientFormSchema;
