import { z } from "zod";

// Création d'un article
export const createArticleSchema = z.object({
  titre: z
    .string()
    .min(2, "Le titre doit contenir au moins 2 caractères.")
    .max(150, "Le titre ne peut pas dépasser 150 caractères.")
    .trim(),

  description: z
    .string()
    .min(5, "La description doit contenir au moins 5 caractères.")
    .max(2000, "La description ne peut pas dépasser 2000 caractères.")
    .trim(),

  prix: z
    .number()
    .min(0, "Le prix ne peut pas être négatif.")
    .optional(),

  Id_subCategories: z
    .string()
    .uuid("L'identifiant de la sous-catégorie est invalide.")
    .optional(),

  Id_etatArticle: z
    .string()
    .uuid("L'identifiant de l'état de l'article est invalide."),
});

// Modification d'un article
export const updateArticleSchema = z
  .object({
    titre: z
      .string()
      .min(2, "Le titre doit contenir au moins 2 caractères.")
      .max(150, "Le titre ne peut pas dépasser 150 caractères.")
      .trim()
      .optional(),

    description: z
      .string()
      .min(5, "La description doit contenir au moins 5 caractères.")
      .max(2000, "La description ne peut pas dépasser 2000 caractères.")
      .trim()
      .optional(),

    prix: z
      .number()
      .min(0, "Le prix ne peut pas être négatif.")
      .optional(),

    Id_subCategories: z
      .string()
      .uuid("L'identifiant de la sous-catégorie est invalide.")
      .optional(),

    Id_etatArticle: z
      .string()
      .uuid("L'identifiant de l'état de l'article est invalide.")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Au moins un champ doit être renseigné.",
    },
  );