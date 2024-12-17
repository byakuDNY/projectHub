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
  clientId: z.string().uuid({ message: "Invalid client" }),
  budget: z.number({ message: "Invalid budget" }).min(0, {
    message: "Budget must be greater than 0",
  }),
  status: z
    .enum(["active", "inactive", "completed", "canceled"], {
      message: "Invalid status",
    })
    .default("active"),
  startDate: z.date({ message: "Invalid start date" }),
  endDate: z.date({ message: "Invalid end date" }),
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
export default projectFormSchema;
