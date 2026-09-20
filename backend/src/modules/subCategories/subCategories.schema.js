import { z } from "zod";

// Création d'une sous-catégorie
export const createSubCategorieSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim(),

  Id_categories: z
    .string()
    .uuid("L'identifiant de la catégorie est invalide."),
});

// Modification d'une sous-catégorie
export const updateSubCategorieSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim()
    .optional(),

  Id_categories: z
    .string()
    .uuid("L'identifiant de la catégorie est invalide.")
    .optional(),
});