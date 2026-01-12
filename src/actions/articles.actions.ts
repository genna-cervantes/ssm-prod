"use server";

import {
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticle,
} from "@/src/services/articles.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createArticleSchema = z.object({
  sender: z.string().min(1, "Sender is a required field"),
  articleLink: z.url("Invalid URL"),
  title: z.string().min(1, "Title cannot be left blank"),
  summary: z.string().min(1, "Summary cannot be left blank"),
  author: z.string().min(1, "Author cannot be left blank"),
});

const updateArticleSchema = createArticleSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

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

export async function deleteArticleAction(id: number) {
  await deleteArticle(id);
  revalidatePath("/articles");
}

export async function searchArticleAction(toSearch: string, page: number = 1, limit: number = 9) {
  try {
    const matchedArticles = await searchArticle(toSearch, page, limit);
    return {
      ok: true,
      data: matchedArticles,
    };
  } catch (error) {
    console.error("Error searching articles:", error);
    return {
      ok: false,
      error: "Failed to search articles",
    };
  }
}