import { db } from "@/db";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export type CreateArticleInput = {
  sender: string;
  articleLink: string;
  title: string;
  summary: string;
  author: string;
};

export type UpdateArticleInput = Partial<
  CreateArticleInput & {
    isActive: boolean;
  }
>;

export async function createArticle(data: CreateArticleInput) {
  const [article] = await db
    .insert(articlesTable)
    .values(data)
    .returning();

  return article;
}

export async function getArticles() {
  return db.select().from(articlesTable);
}

export async function getArticleById(id: number) {
  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id));

  return article ?? null;
}

export async function updateArticle(
  id: number,
  data: UpdateArticleInput
) {
  const [article] = await db
    .update(articlesTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(articlesTable.id, id))
    .returning();

  return article;
}

export async function deleteArticle(id: number) {
  await db.delete(articlesTable).where(eq(articlesTable.id, id));
}