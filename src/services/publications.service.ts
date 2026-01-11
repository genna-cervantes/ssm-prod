import { db } from "@/src/db";
import { publicationsTable } from "@/src/db/schema";
import { eq, desc, and } from "drizzle-orm";

/*
 * CreatePublicationInput type
 * All fields are required for creation
 */
export type CreatePublicationInput = {
  title: string;
  slug: string;
  description: string;
  author: string;
  content: string;
  heroImage?: string | null;
  isDraft?: boolean;
};

/*
 * UpdatePublicationInput type
 * All fields are optional for partial updates
 */
export type UpdatePublicationInput = Partial<
  CreatePublicationInput & {
    isActive: boolean;
  }
>;

/*
 * Publication type for frontend use
 */
export type Publication = {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  content: string;
  heroImage: string | null;
  isDraft: boolean;
  datePublished: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

/*
 * Create a new publication
 * Returns the created publication
 */
export async function createPublication(data: CreatePublicationInput) {
  const [publication] = await db
    .insert(publicationsTable)
    .values({
      ...data,
      datePublished: data.isDraft === false ? new Date() : null,
    })
    .returning();

  return publication;
}

/*
 * Get all publications
 * Returns all publications in the database, ordered by creation date
 */
export async function getPublications() {
  return db
    .select()
    .from(publicationsTable)
    .orderBy(desc(publicationsTable.createdAt));
}

/*
 * Get all active (non-deleted) publications
 * Optionally filter by draft status
 */
export async function getActivePublications(includeDrafts = false) {
  if (includeDrafts) {
    return db
      .select()
      .from(publicationsTable)
      .where(eq(publicationsTable.isActive, true))
      .orderBy(desc(publicationsTable.createdAt));
  }

  return db
    .select()
    .from(publicationsTable)
    .where(
      and(
        eq(publicationsTable.isActive, true),
        eq(publicationsTable.isDraft, false)
      )
    )
    .orderBy(desc(publicationsTable.datePublished));
}

/*
 * Get a single publication by ID
 * Returns the publication or null if not found
 */
export async function getPublicationById(id: number) {
  const [publication] = await db
    .select()
    .from(publicationsTable)
    .where(eq(publicationsTable.id, id));

  return publication ?? null;
}

/*
 * Get a single publication by slug
 * Returns the publication or null if not found
 */
export async function getPublicationBySlug(slug: string) {
  const [publication] = await db
    .select()
    .from(publicationsTable)
    .where(
      and(
        eq(publicationsTable.slug, slug),
        eq(publicationsTable.isActive, true),
        eq(publicationsTable.isDraft, false)
      )
    );

  return publication ?? null;
}

/*
 * Update an existing publication by ID
 *
 * Returns the updated publication
 * Refreshes updatedAt timestamp
 * Sets datePublished when publishing for the first time
 * Supports partial updates
 */
export async function updatePublication(
  id: number,
  data: UpdatePublicationInput
) {
  // Get current publication to check if we're publishing for the first time
  const current = await getPublicationById(id);
  
  let datePublished = undefined;
  if (data.isDraft === false && current?.isDraft === true) {
    // Publishing for the first time
    datePublished = new Date();
  }

  const [publication] = await db
    .update(publicationsTable)
    .set({
      ...data,
      ...(datePublished && { datePublished }),
      updatedAt: new Date(),
    })
    .where(eq(publicationsTable.id, id))
    .returning();

  return publication;
}

/*
 * Delete a publication by ID (soft delete by setting isActive to false)
 */
export async function deletePublication(id: number) {
  const [publication] = await db
    .update(publicationsTable)
    .set({
      isActive: false,
      updatedAt: new Date(),
    })
    .where(eq(publicationsTable.id, id))
    .returning();

  return publication;
}

/*
 * Hard delete a publication by ID
 * Use with caution - this permanently removes the publication
 */
export async function hardDeletePublication(id: number) {
  await db.delete(publicationsTable).where(eq(publicationsTable.id, id));
}

/*
 * Generate a unique slug from a title
 */
export async function generateUniqueSlug(title: string, excludeId?: number) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db
      .select({ id: publicationsTable.id })
      .from(publicationsTable)
      .where(eq(publicationsTable.slug, slug));

    if (existing.length === 0 || (excludeId && existing[0]?.id === excludeId)) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

