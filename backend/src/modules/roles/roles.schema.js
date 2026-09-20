import { z } from "zod";

export const createRoleSchema = z.object({
  nom: z.string().min(2).max(50).trim(),
});

export const updateRoleSchema = z
  .object({
    nom: z.string().min(2).max(50).trim().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );