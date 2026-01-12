"use server";

import { or, ilike } from 'drizzle-orm';
import { db } from "../db/index";
import { publicationsTable } from "../db/schema";

export async function searchPublicationAction(toSearch: string) {
    const matchedPublications = await db
                                .select()
                                .from(publicationsTable)
                                .where(or(
                                    ilike(publicationsTable.content, `%${toSearch}%`),
                                    ilike(publicationsTable.author, `%${toSearch}%`)
                                ));

    return matchedPublications;

}