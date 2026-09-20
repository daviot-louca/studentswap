import { z } from "zod";

export const createArticlePhotoSchema = z.object({
  body: z.object({
    ordre: z.coerce
      .number()
      .int()
      .min(0)
      .optional(),
  }),
});