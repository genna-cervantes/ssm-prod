"use server";

import {
  createPublication,
  updatePublication,
  deletePublication,
  generateUniqueSlug,
  getActivePublications,
} from "@/db/services/publications.service";
import { revalidatePath } from "next/cache";
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

/*
 * Server action to create a new publication
 *
 * Validates input using Zod schema
 * Generates unique slug from title
 * Revalidates paths upon success
 * Returns the created publication or error
 */
export async function createPublicationAction(data: CreatePublicationFormData) {
  const parsed = createPublicationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const slug = await generateUniqueSlug(parsed.data.title);
    
    const publication = await createPublication({
      ...parsed.data,
      slug,
    });

    revalidatePath("/admin/publications");
    revalidatePath("/publications");

    return {
      success: true,
      data: publication,
    };
  } catch (error) {
    console.error("Error creating publication:", error);
    return {
      success: false,
      error: { _form: ["Failed to create publication"] },
    };
  }
}

/*
 * Server action to update an existing publication by ID
 *
 * Supports partial updates
 * Updates slug if title changes
 * Revalidates paths upon success
 * Returns the updated publication or error
 */
export async function updatePublicationAction(
  id: number,
  data: UpdatePublicationFormData
) {
  const parsed = updatePublicationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  if (Object.keys(parsed.data).length === 0) {
    return {
      success: false,
      error: { _form: ["No fields to update"] },
    };
  }

  try {
    // If title is being updated, generate new slug
    let slug: string | undefined;
    if (parsed.data.title) {
      slug = await generateUniqueSlug(parsed.data.title, id);
    }

    const publication = await updatePublication(id, {
      ...parsed.data,
      ...(slug && { slug }),
    });

    revalidatePath("/admin/publications");
    revalidatePath("/publications");
    revalidatePath(`/publications/${publication.slug}`);

    return {
      success: true,
      data: publication,
    };
  } catch (error) {
    console.error("Error updating publication:", error);
    return {
      success: false,
      error: { _form: ["Failed to update publication"] },
    };
  }
}

/*
 * Server action to delete a publication by ID
 *
 * Soft deletes (sets isActive to false)
 * Revalidates paths upon success
 * Returns success status
 */
export async function deletePublicationAction(id: number) {
  try {
    await deletePublication(id);
    
    revalidatePath("/admin/publications");
    revalidatePath("/publications");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting publication:", error);
    return {
      success: false,
      error: "Failed to delete publication",
    };
  }
}

/*
 * Server action to toggle publication draft status
 *
 * Publishes a draft or unpublishes a published post
 * Revalidates paths upon success
 * Returns the updated publication or error
 */
export async function togglePublishAction(id: number, isDraft: boolean) {
  try {
    const publication = await updatePublication(id, { isDraft });

    revalidatePath("/admin/publications");
    revalidatePath("/publications");

    return {
      success: true,
      data: publication,
    };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return {
      success: false,
      error: "Failed to update publication status",
    };
  }
}

/*
 * Server action to get active publications
 *
 * Returns all active publications (optionally including drafts)
 */
export async function getActivePublicationsAction(includeDrafts = false) {
  try {
    const publications = await getActivePublications(includeDrafts);

    return {
      success: true,
      data: publications,
    };
  } catch (error) {
    console.error("Error fetching publications:", error);
    return {
      success: false,
      error: "Failed to fetch publications",
    };
  }
}

