import { z } from "zod";

export const createUserPhotoSchema = z.object({
  url: z.string().url(),
});