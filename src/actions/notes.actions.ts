"use server"

import { deleteNote, getPetitionNotes, getPetitionNotesCount, getPetitionNotesWithEmail } from "../services/note.service";


export async function getPetitionNotesCountAction() {
    try {
    const petitionNotesCount = await getPetitionNotesCount();
      return { ok: true, data: petitionNotesCount };
      
    }catch(err){
      console.error(err);
      return { ok: false, error: `Failed to get petition notes count. ${err instanceof Error ? err.message : "Unknown error"}` };
    }
  
  }

export async function getPetitionNotesAction(page: number = 1, limit: number = 9) {
    try{
  
      const petitionNotes = await getPetitionNotes(page, limit);
  
      return { ok: true, data: petitionNotes };
  
    }catch(err){
      console.error(err);
      return { ok: false, error: `Failed to get petition notes. ${err instanceof Error ? err.message : "Unknown error"}` };
  
    }
  }

export async function getPetitionNotesWithEmailAction(page: number = 1, limit: number = 9) {
    try{
      const petitionNotesWithEmail = await getPetitionNotesWithEmail(page, limit);
      return { ok: true, data: petitionNotesWithEmail };
    }catch(err){
      console.error(err);
      return { ok: false, error: `Failed to get petition notes with email. ${err instanceof Error ? err.message : "Unknown error"}` };
    }
}

type DeleteState = { ok: boolean; error?: string } | null;

export async function deleteNoteAction(
  _prevState: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) {
    return { ok: false, error: "Invalid note ID" };
  }
  try {
    await deleteNote(id);
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: `Failed to delete note. ${err instanceof Error ? err.message : "Unknown error"}` };
  }
}