import { db } from "@/src/db";
import { articlesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

/*
 * CreateArticleInput type
 * All fields are required for creation
 */
export type CreateArticleInput = {
  sender: string;
  articleLink: string;
  title: string;
  summary: string;
  author: string;
};

/*
 * UpdateArticleInput type
 * All fields are optional for partial updates
 */
export type UpdateArticleInput = Partial<
  CreateArticleInput & {
    isActive: boolean;
  }
>;

/*
 * Create a new article
 * Returns the created article
 */
export async function createArticle(data: CreateArticleInput) {
  const [article] = await db
    .insert(articlesTable)
    .values(data)
    .returning();

  return article;
}

/*
 * Get all articles
 * Returns all articles in the database
 */
export async function getArticles() {
  return db.select().from(articlesTable);
}

/*
 * Get a single article by ID
 * Returns the article or null if not found
 */
export async function getArticleById(id: number) {
  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id));

  return article ?? null;
}

/*
 * Update an existing article by ID
 * 
 * Returns the updated article
 * Refreshes updatedAt timestamp
 * Supports partial updates
 */
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

/*
 * Delete an article by ID
 * Does not return the deleted article
 */
export async function deleteArticle(id: number) {
  await db.delete(articlesTable).where(eq(articlesTable.id, id));
}