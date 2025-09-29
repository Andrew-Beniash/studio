"use server";

import { z } from "zod";
import { selectProfileImage } from "@/ai/flows/profile-image-selection";
import { profileSchema } from "@/app/schemas";

export async function generateAvatarAction(values: z.infer<typeof profileSchema>) {
  try {
    const validatedFields = profileSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid input." };
    }

    const result = await selectProfileImage(validatedFields.data);
    
    if (!result.imageUri) {
      return { error: "Failed to generate image. Please try again." };
    }
    
    return { imageUri: result.imageUri };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
