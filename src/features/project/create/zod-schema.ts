import { z } from "zod";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(255, "Name must be at most 255 characters"),
  description: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(255, "Description must be at most 255 characters")
    .optional(),
  content: z.string().optional(),
  clientId: z.string().uuid("Invalid Client ID"),
  budget: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Budget must be a valid numeric value"),
  status: z
    .enum(["active", "inactive", "completed", "canceled"])
    .default("active"),
  startDate: z.date(),
  endDate: z.date(),
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
export default projectFormSchema;
