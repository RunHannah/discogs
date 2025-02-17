import { z } from "zod";

export const BaseFormSchema = z.object({
  artist: z.string().optional(),
  releaseTitle: z.string().optional(),
  genre: z.string().optional(),
  page: z.number().optional()
})

export const FormSchema = BaseFormSchema.refine(data => data.artist || data.releaseTitle || data.genre, {
  message: "At least one field must be filled.",
  path: ["artist"], // specify which field(s) to target in error
});

