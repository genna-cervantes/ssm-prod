"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getPetitionCount, signPetition } from "../services/petition.service";
import { addNote, getPetitionNotes, getPetitionNotesCount } from "../services/note.service";

/**
 * Zod Schemas
 */

const SignPetitionSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.email("Invalid email address"),
  occupation: z.string().optional(),
  affiliation: z.string().optional(),
});

const AddNoteSchema = z.object({
  petitionId: z.coerce.number().int().positive(),
  sender: z.string().min(1, "Display name is required"),
  note: z.string().max(1000).optional(),
});

export async function getPetitionCountAction() {
  try {
    const petitionCount = await getPetitionCount();
    return { ok: true, data: petitionCount };
    
  }catch(err){
    console.error(err);
    return { ok: false, error: `Failed to get petition count. ${err instanceof Error ? err.message : "Unknown error"}` };
  }
}

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

export async function signPetitionAction(formData: FormData) {
  const data = SignPetitionSchema.parse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    emailAddress: formData.get("emailAddress"),
    occupation: formData.get("occupation"),
    affiliation: formData.get("affiliation"),
  });

  const petition = await signPetition(data);

  // redirect(`/petitions/${petition.petitionId}/note`);
}

export async function addPetitionNoteAction(formData: FormData) {
  const data = AddNoteSchema.parse({
    petitionId: formData.get("petitionId"),
    sender: formData.get("sender"),
    note: formData.get("note"),
  });

  await addNote(data);
}
