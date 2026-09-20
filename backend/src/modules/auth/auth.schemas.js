import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    prenom: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(100, "Le prénom ne peut pas dépasser 100 caractères")
      .trim(),

    nom: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères")
      .trim(),

    pseudo: z
      .string()
      .min(3, "Le pseudo doit contenir au moins 3 caractères")
      .max(50, "Le pseudo ne peut pas dépasser 50 caractères")
      .trim()
      .regex(
        /^[a-zA-Z0-9_.-]+$/,
        "Le pseudo ne peut contenir que des lettres, chiffres, _, . et -",
      ),

    email: z
      .string()
      .email("L'adresse email est invalide")
      .max(255, "L'email ne peut pas dépasser 255 caractères")
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(72, "Le mot de passe ne peut pas dépasser 72 caractères"),

    Id_villes: z
      .string()
      .uuid("L'identifiant de la ville est invalide"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("L'adresse email est invalide")
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Le mot de passe est obligatoire"),
  }),
});

export const modifierMotDePasseSchema = z.object({
  body: z.object({
    oldPassword: z
      .string()
      .min(1, "L'ancien mot de passe est obligatoire"),

    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
      .max(72, "Le nouveau mot de passe ne peut pas dépasser 72 caractères"),
  }),
});