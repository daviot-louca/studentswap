import { z } from "zod";

export const createRegionSchema = z.object({
  nom: z.string().min(2).max(100).trim(),
});

export const updateRegionSchema = z
  .object({
    nom: z.string().min(2).max(100).trim().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );