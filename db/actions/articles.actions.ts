"use server";

import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/articles.service";
import { revalidatePath } from "next/cache";
import type { UpdateArticleInput } from "../services/articles.service";

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

export async function updateArticleAction(
  id: number,
  formData: FormData
) {
  const data: Partial<UpdateArticleInput> = {};

  const sender = formData.get("sender");
  if (typeof sender === "string") data.sender = sender;

  const articleLink = formData.get("articleLink");
  if (typeof articleLink === "string") data.articleLink = articleLink;

  const title = formData.get("title");
  if (typeof title === "string") data.title = title;

  const summary = formData.get("summary");
  if (typeof summary === "string") data.summary = summary;

  const author = formData.get("author");
  if (typeof author === "string") data.author = author;

  const isActive = formData.get("isActive");
  if (isActive === "true") data.isActive = true;
  if (isActive === "false") data.isActive = false;

  if (Object.keys(data).length === 0) {
    return;
  }

  await updateArticle(id, data);

  revalidatePath("/articles");
  revalidatePath(`/articles/${id}`);
}

export async function deleteArticleAction(id: number) {
  await deleteArticle(id);
  revalidatePath("/articles");
}