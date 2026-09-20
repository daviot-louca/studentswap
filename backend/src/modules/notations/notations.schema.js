import { z } from "zod";

export const createNotationSchema = z.object({
  Id_users: z.string().uuid(),
  note: z.coerce.number().int().min(1).max(5),
  commentaire: z.string().max(1000).trim().optional(),
});

export const notationIdSchema = z.object({
  id: z.string().uuid(),
});