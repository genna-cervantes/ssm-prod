import { z } from "zod";

/*
 * Zod schema for creating a new publication
 * All fields are required except heroImage
 */
export const createPublicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Content is required"),
  heroImage: z.string().optional().nullable(),
  isDraft: z.boolean().default(true),
});

/*
 * Zod schema for updating an existing publication
 * All fields are optional for partial updates
 */
export const updatePublicationSchema = createPublicationSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

export type CreatePublicationFormData = z.infer<typeof createPublicationSchema>;
export type UpdatePublicationFormData = z.infer<typeof updatePublicationSchema>;

