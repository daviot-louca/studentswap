import { z } from "zod";

export const createVilleSchema = z.object({
  nom: z.string().min(2).max(100).trim(),
  Id_regions: z.string().uuid(),
});

export const updateVilleSchema = z
  .object({
    nom: z.string().min(2).max(100).trim().optional(),
    Id_regions: z.string().uuid().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );