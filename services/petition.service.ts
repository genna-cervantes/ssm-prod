import { db } from "@/db";
import { petitionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export type CreatePetitionInput = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  occupation?: string;
  affiliation?: string;
};

/* Sign a petition
 * Returns the created petition
 */

export async function signPetition(data: CreatePetitionInput) {
  const [petition] = await db.insert(petitionsTable).values(data).returning();

  return petition;
}
