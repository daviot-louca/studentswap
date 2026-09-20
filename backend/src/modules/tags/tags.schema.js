import { z } from "zod";

export const createTagSchema = z.object({
  nom: z.string().min(2).max(100).trim(),
  Id_subCategories: z.string().uuid(),
});

export const updateTagSchema = z
  .object({
    nom: z.string().min(2).max(100).trim().optional(),
    Id_subCategories: z.string().uuid().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );