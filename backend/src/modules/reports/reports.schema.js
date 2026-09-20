import { z } from "zod";

export const createReportSchema = z.object({
  Id_articles: z.string().uuid(),

  motif: z
    .string()
    .min(3)
    .max(1000)
    .trim(),
});

export const reportIdSchema = z.object({
  id: z.string().uuid(),
});