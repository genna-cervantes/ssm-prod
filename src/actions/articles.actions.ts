"use server";

import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/db/services/articles.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/*
 * Zod schema for creating a new article
 * All fields are required to have at least minimal 1 character (non-empty)
 */
export const createArticleSchema = z.object({
  sender: z.string().min(1, "Sender is a required field"),
  articleLink: z.url("Invalid URL"),
  title: z.string().min(1, "Title cannot be left blank"),
  summary: z.string().min(1, "Summary cannot be left blank"),
  author: z.string().min(1, "Author cannot be left blank"),
});

/*
 * Zod schema for updating an existing article
 * All fields are optional for partial updates
 */
export const updateArticleSchema = createArticleSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

/*
 * Server action to create a new article
 * 
 * Validates input using Zod schema
 * Revalidates /articles path upon success
 * Throws ZodError on validation failure
 */
export async function createArticleAction(formData: FormData) {
  const parsed = createArticleSchema.safeParse({
    sender: formData.get("sender"),
    articleLink: formData.get("articleLink"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    author: formData.get("author"),
  });

  if (!parsed.success) {
    throw parsed.error;
  }

  await createArticle(parsed.data);
  revalidatePath("/articles");
}

/*
 * Server action to update an existing article by ID
 * 
 * Supports partial updates
 * Revalidates /articles path upon success
 * Throws ZodError on validation failure
 */
export async function updateArticleAction(
  id: number,
  formData: FormData
) {
  const parsed = updateArticleSchema.safeParse({
    sender: formData.get("sender"),
    articleLink: formData.get("articleLink"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    author: formData.get("author"),
    isActive:
      formData.get("isActive") !== null
        ? formData.get("isActive") === "true"
        : undefined,
  });

  if (!parsed.success) {
    throw parsed.error;
  }

  if (Object.keys(parsed.data).length === 0) return;

  await updateArticle(id, parsed.data);
  revalidatePath("/articles");
  revalidatePath(`/articles/${id}`);
}

/*
 * Server action to delete an article by ID
 * 
 * Revalidates /articles path upon success
 */
export async function deleteArticleAction(id: number) {
  await deleteArticle(id);
  revalidatePath("/articles");
}

