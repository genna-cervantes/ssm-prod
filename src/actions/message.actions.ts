"use server";

import { z } from "zod";
import { sendMessage } from "../services/message.service";

const MessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type SendMessageState = 
  | {ok: true;}
  | {ok: false; error:string;}

export async function sendMessageAction(
  _prevState: SendMessageState | null,
  formData: FormData
): Promise<SendMessageState> {
  
  const parsed = MessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => i.message).join(", ");
    return {ok: false, error: msg || "Invalid form data"};
  }

  try {
    await sendMessage(parsed.data);
    return {ok: true};

  }catch(error){
    return {ok: false, error: `Failed to send message. ${error instanceof Error ? error.message : "Unknown error"}`};
  }
}
