import { z } from "zod";

// Création d'une proposition
export const createPropositionTrocSchema = z.object({
  Id_articles: z.string().uuid(),
  message: z.string().max(1000).trim().optional(),
});

// Modification d'une proposition
export const updatePropositionTrocSchema = z.object({
  statut: z.enum([
    "en_attente",
    "acceptee",
    "refusee",
    "annulee",
  ]),
  message: z.string().max(1000).trim().optional(),
});