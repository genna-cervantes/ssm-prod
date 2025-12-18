import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export type CreateNoteInput = {
  petitionId: number; // required, from page 1
  sender: string; // display name
  note?: string; // optional message
};

/* Add a note to petition
 * Returns the created note
 */

export async function addNote(data: CreateNoteInput) {
  const [note] = await db.insert(notesTable).values(data).returning();
  return note;
}
