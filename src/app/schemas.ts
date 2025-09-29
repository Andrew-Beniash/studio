import { z } from "zod";

export const profileSchema = z.object({
  occupation: z.string().min(2, "Occupation must be at least 2 characters."),
  interests: z.string().min(2, "Interests must be at least 2 characters."),
  style: z.string().min(2, "Style must be at least 2 characters."),
});
