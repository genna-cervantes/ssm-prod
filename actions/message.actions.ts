"use server";

import { z } from "zod";
import { sendMessage } from "../services/message.service";

const MessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function sendMessageAction(formData: FormData) {
  const data = MessageSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  await sendMessage(data);
}
