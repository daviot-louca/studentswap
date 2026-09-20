import { z } from "zod";

export const articleVuSchema = z.object({
  params: z.object({
    articleId: z.string().uuid(),
  }),
});