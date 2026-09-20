import { z } from "zod";

// Création d'un état d'article
export const createEtatArticleSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim(),
});

// Modification d'un état d'article
export const updateEtatArticleSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .trim(),
});