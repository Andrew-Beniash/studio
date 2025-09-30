'use server';

import { ai } from '@/ai/genkit';
import { ChatInput, ChatInputSchema, ChatOutputSchema } from '../schemas/chat-schemas';

export async function chat(input: ChatInput): Promise<string> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    const model = ai.getModel('googleai/gemini-2.5-flash');

    const result = await ai.generate({
      model,
      prompt: {
        history,
        prompt: message,
      },
      output: {
        format: 'text',
      },
    });

    return result.text;
  }
);
