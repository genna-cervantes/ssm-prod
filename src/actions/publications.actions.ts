"use server";

import {
  createPublication,
  updatePublication,
  deletePublication,
  generateUniqueSlug,
  getActivePublications,
  searchPublication,
  getPublicationBySlug,
} from "@/src/services/publications.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const createPublicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Content is required"),
  heroImage: z.string().optional().nullable(),
  isDraft: z.boolean().default(true),
});

const updatePublicationSchema = createPublicationSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

type CreatePublicationFormData = z.infer<typeof createPublicationSchema>;
type UpdatePublicationFormData = z.infer<typeof updatePublicationSchema>;

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

export async function searchPublicationAction(toSearch: string, page: number = 1, limit: number = 9) {
  try {
    const matchedPublications = await searchPublication(toSearch, page, limit);
    return {
      ok: true,
      data: matchedPublications,
    };
  } catch (error) {
    console.error("Error searching publications:", error);
    return {
      ok: false,
      error: "Failed to search publications",
    };
  }
}

export async function getPublicationBySlugAction(slug: string) {
  try {
    const publication = await getPublicationBySlug(slug);
    return {
      ok: true,
      data: publication,
    };
  } catch (error) {
    console.error("Error fetching publication by slug:", error);
    return {
      ok: false,
      error: "Failed to fetch publication by slug",
    };
  }
}