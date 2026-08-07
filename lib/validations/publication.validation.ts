import { z } from "zod";

export const PublicationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters"),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required"),

  category: z.enum([
    "Journal",
    "Tender",
  ]),

  pdf: z
    .string()
    .trim()
    .url("Invalid PDF URL"),

  date: z
    .string()
    .trim()
    .min(1, "Date is required"),

  time: z
    .string()
    .trim()
    .min(1, "Time is required"),

  isPublished: z.boolean().default(true),

  order: z
    .number()
    .int()
    .min(0)
    .default(0),
});

export type PublicationInput = z.infer<typeof PublicationSchema>;