import { z } from "zod";

export const createArticlePhotoSchema = z.object({
  url: z.string().url(),
  ordre: z.number().int().min(0).optional(),
});