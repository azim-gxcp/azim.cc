import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  tls: { rejectUnauthorized: false },
});

interface SendOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendOptions) {
  return transporter.sendMail({
    from: `"${config.smtp.fromName}" <${config.smtp.from}>`,
    to,
    subject,
    html,
  });
}

export async function sendBatch(
  recipients: string[],
  subject: string,
  html: string,
  batchSize = 50,
  delayMs = 1000
) {
  let sent = 0;
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    await Promise.all(
      batch.map((to) => sendEmail({ to, subject, html }))
    );
    sent += batch.length;

    if (i + batchSize < recipients.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return sent;
}
