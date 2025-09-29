'use server';

/**
 * @fileOverview This file defines a Genkit flow for selecting a profile image based on user profile information.
 *
 * The flow takes user profile information as input and returns a data URI representing a suggested profile image.
 * It uses a prompt to instruct the model to select an appropriate image based on the user's profile.
 *
 * @exports selectProfileImage - An async function that takes user profile information and returns a profile image data URI.
 * @exports ProfileImageSelectionInput - The input type for the selectProfileImage function.
 * @exports ProfileImageSelectionOutput - The return type for the selectProfileImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileImageSelectionInputSchema = z.object({
  occupation: z.string().describe('The user\'s occupation.'),
  interests: z.string().describe('The user\'s interests.'),
  style: z.string().describe('The user\'s preferred style (e.g., professional, casual, artistic).'),
});
export type ProfileImageSelectionInput = z.infer<typeof ProfileImageSelectionInputSchema>;

const ProfileImageSelectionOutputSchema = z.object({
  imageUri: z.string().describe('A data URI representing the suggested profile image.'),
});
export type ProfileImageSelectionOutput = z.infer<typeof ProfileImageSelectionOutputSchema>;

export async function selectProfileImage(input: ProfileImageSelectionInput): Promise<ProfileImageSelectionOutput> {
  return selectProfileImageFlow(input);
}

const profileImagePrompt = ai.definePrompt({
  name: 'profileImagePrompt',
  input: {schema: ProfileImageSelectionInputSchema},
  output: {schema: ProfileImageSelectionOutputSchema},
  prompt: `Based on the user's profile information, suggest a profile image that would be suitable for them.

Consider their occupation, interests, and preferred style when selecting the image.

Occupation: {{{occupation}}}
Interests: {{{interests}}}
Style: {{{style}}}

Please provide the image as a data URI.

{{media url=imageUri}}`,
});

const selectProfileImageFlow = ai.defineFlow(
  {
    name: 'selectProfileImageFlow',
    inputSchema: ProfileImageSelectionInputSchema,
    outputSchema: ProfileImageSelectionOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a profile image for a person with the following traits: Occupation: ${input.occupation}, Interests: ${input.interests}, Style: ${input.style}`,
    });
    return { imageUri: media.url! };
  }
);
