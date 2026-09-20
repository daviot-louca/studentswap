import { z } from "zod";

// Création d'une catégorie
export const createCategorieSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim(),
});

// Modification d'une catégorie
export const updateCategorieSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim(),
});