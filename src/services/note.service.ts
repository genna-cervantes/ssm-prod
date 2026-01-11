import "server-only";

import { db } from "@/src/db";
import { notesTable } from "@/src/db/schema";

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
