import "server-only";

import { db } from "@/src/db";
import { notesTable, petitionsTable } from "@/src/db/schema";
import { eq, desc, count } from "drizzle-orm";

export type CreateNoteInput = {
  petitionId: number; // required, from page 1
  sender: string; // display name
  note?: string; // optional message
};

export async function getPetitionNotesCount() {
  const [result] = await db
    .select({ count: count() })
    .from(notesTable);

  return result?.count ?? 0;
}

export async function addNote(data: CreateNoteInput) {
  const [note] = await db.insert(notesTable).values(data).returning();
  return note;
}

export async function getPetitionNotes(page: number, limit: number){
  const offset = (page - 1) * limit;

  const notes = await db
    .select({
      id: notesTable.id,
      sender: notesTable.sender,
      note: notesTable.note,
      date: notesTable.date,
    })
    .from(notesTable)
    .where(eq(notesTable.isActive, true))
    .offset(offset)
    .orderBy(desc(notesTable.date))
    .limit(limit)

  return notes;
}


export async function getPetitionNotesWithEmail(page: number, limit: number){
  const offset = (page - 1) * limit;

  const notes = await db
    .select({
      id: notesTable.id,
      sender: notesTable.sender,
      email: petitionsTable.emailAddress,
      note: notesTable.note,
      date: notesTable.date,
    })
    .from(notesTable)
    .leftJoin(petitionsTable, eq(notesTable.petitionId, petitionsTable.petitionId))
    .where(eq(notesTable.isActive, true))
    .offset(offset)
    .orderBy(desc(notesTable.date))
    .limit(limit)

    return notes;
}

export async function deleteNote(id: number) {
  await db.update(notesTable).set({ isActive: false }).where(eq(notesTable.id, id));
}