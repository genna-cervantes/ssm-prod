import "server-only";

import nodemailer from "nodemailer";

export type CreateMessageInput = {
  name: string;
  email: string;
  message: string;
};

/* Send a message to SSMN (via email)
 *
 */

export async function sendMessage(data: CreateMessageInput) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CLIENT_EMAIL,
    replyTo: data.email,
    text: `
    Sender Name: ${data.name}
    Sender Email: ${data.email}

    
    Message:
    ${data.message}
    `,
  });
}
