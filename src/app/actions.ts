"use server";

import { chat } from '@/ai/flows/chat';
import type { ChatInput } from '@/ai/schemas/chat-schemas';

export async function sendMessage(history: ChatInput['history'], message: string) {
  const response = await chat({ history, message });
  return response;
}
