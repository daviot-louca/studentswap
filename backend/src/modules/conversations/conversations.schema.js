import { z } from "zod";

export const createConversationSchema = z.object({
  participantId: z.string().uuid(),
});

export const conversationMessagesSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .optional(),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),
});