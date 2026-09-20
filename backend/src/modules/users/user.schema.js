import { z } from "zod";

// Modification du profil utilisateur
export const modifierProfilSchema = z
  .object({
    prenom: z.string().min(2).max(100).trim().optional(),

    nom: z.string().min(2).max(100).trim().optional(),

    pseudo: z
      .string()
      .min(3)
      .max(50)
      .trim()
      .regex(/^[a-zA-Z0-9_.-]+$/)
      .optional(),

    email: z
      .string()
      .email()
      .max(255)
      .trim()
      .toLowerCase()
      .optional(),

    Id_villes: z.string().uuid().nullable().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );