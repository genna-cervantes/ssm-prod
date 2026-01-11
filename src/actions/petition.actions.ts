"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signPetition } from "../services/petition.service";
import { addNote } from "../services/note.service";

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

/**
 * Page 1 action - create a petition
 */

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

/**
 * Page 2 action - add a note
 */

export async function addPetitionNoteAction(formData: FormData) {
  const data = AddNoteSchema.parse({
    petitionId: formData.get("petitionId"),
    sender: formData.get("sender"),
    note: formData.get("note"),
  });

  await addNote(data);
}
