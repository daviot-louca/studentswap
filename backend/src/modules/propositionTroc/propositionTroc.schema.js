import { z } from "zod";

// Création d'une proposition de don ou d'échange
export const createPropositionTrocSchema = z.object({
  body: z.object({
    Id_articles: z.string().uuid(),

    message: z
      .string()
      .max(1000)
      .trim()
      .optional(),

    type: z
      .enum(["don", "exchange"])
      .default("exchange"),

    Id_article_propose: z
      .string()
      .uuid()
      .nullable()
      .optional(),
  }),
});

// Modification d'une proposition
export const updatePropositionTrocSchema = z.object({
  body: z.object({
    statut: z.enum([
      "en_attente",
      "acceptee",
      "refusee",
      "annulee",
    ]),

    message: z
      .string()
      .max(1000)
      .trim()
      .optional(),
  }),

  params: z.object({
    id: z.string().uuid(),
  }),
});