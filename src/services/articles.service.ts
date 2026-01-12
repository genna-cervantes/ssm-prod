import { db } from "@/src/db";
import { articlesTable, publicationsTable } from "@/src/db/schema";
import { or, ilike, eq, desc } from "drizzle-orm";

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

export async function searchArticle(toSearch: string, page: number, limit: number) {
  const offset = (page - 1) * limit;
  const q = (toSearch ?? "").trim();

  const query = db
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.createdAt))
    .offset(offset)
    .limit(limit);

  const matchedArticles = q
    ? await query.where(
        or(
          ilike(publicationsTable.content, `%${q}%`),
          ilike(publicationsTable.author, `%${q}%`),
          ilike(publicationsTable.title, `%${q}%`),
          ilike(publicationsTable.description, `%${q}%`)
        )
      )
    : await query;
    
  return matchedArticles;
}