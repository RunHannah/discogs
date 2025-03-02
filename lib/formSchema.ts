import { z } from "zod";

export const BaseFormSchema = z.object({
  query: z.string(),
  page: z.number().optional(),
});

export const FormSchema = BaseFormSchema.refine(
  (data) => data.query.length > 0,
  {
    message: "Please provide a search query.",
    path: ["query"], // specify which field(s) to target in error
  }
);
