import { db } from "@/src/db";
import { publicationsTable } from "@/src/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { or, ilike } from 'drizzle-orm';

export type CreatePublicationInput = {
  title: string;
  slug: string;
  description: string;
  author: string;
  content: string;
  heroImage?: string | null;
  isDraft?: boolean;
};

export type UpdatePublicationInput = Partial<
  CreatePublicationInput & {
    isActive: boolean;
  }
>;

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

export async function getPublications() {
  return db
    .select()
    .from(publicationsTable)
    .orderBy(desc(publicationsTable.createdAt));
}

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

export async function getPublicationById(id: number) {
  const [publication] = await db
    .select()
    .from(publicationsTable)
    .where(eq(publicationsTable.id, id));

  return publication ?? null;
}

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

export async function hardDeletePublication(id: number) {
  await db.delete(publicationsTable).where(eq(publicationsTable.id, id));
}

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

export async function searchPublication(toSearch: string, page: number, limit: number) {
  const offset = (page - 1) * limit;
  const q = (toSearch ?? "").trim();

  const query = db
    .select()
    .from(publicationsTable)
    .orderBy(desc(publicationsTable.createdAt))
    .offset(offset)
    .limit(limit);

  const matchedPublications = q
    ? await query.where(
        or(
          ilike(publicationsTable.content, `%${q}%`),
          ilike(publicationsTable.author, `%${q}%`),
          ilike(publicationsTable.title, `%${q}%`),
          ilike(publicationsTable.description, `%${q}%`)
        )
      )
    : await query;

  return matchedPublications;
}