"use server";

import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/articles.service";
import { revalidatePath } from "next/cache";

export async function createArticleAction(formData: FormData) {
  await createArticle({
    sender: formData.get("sender") as string,
    articleLink: formData.get("articleLink") as string,
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    author: formData.get("author") as string,
  });

  revalidatePath("/articles");
}

export async function deleteArticleAction(id: number) {
  await deleteArticle(id);
  revalidatePath("/articles");
}