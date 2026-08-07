import { z } from "zod";

export const NoticeSchema = z.object({
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
    "General Notice",
    "Admission Notice",
    "Reports",
    "Job Circular",
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

export type NoticeInput = z.infer<typeof NoticeSchema>;