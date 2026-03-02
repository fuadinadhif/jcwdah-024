import { resend } from "../lib/resend.js";
import handlebars from "handlebars";

import fs from "node:fs/promises";
import path from "node:path";

interface SendEmail {
  from: string;
  to: string;
  subject: string;
  emailData: Record<string, any>;
  emailTemplate: string;
}

export async function sendEmail({
  from,
  to,
  subject,
  emailData,
  emailTemplate,
}: SendEmail) {
  const filePath = path.join(process.cwd(), emailTemplate);
  const source = await fs.readFile(filePath, "utf-8");
  const template = handlebars.compile(source);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html: template({
      name: emailData.name,
      referralCode: emailData.referralCode,
    }),
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  return data;
}
