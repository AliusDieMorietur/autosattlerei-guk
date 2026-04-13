import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ResultAsync } from "neverthrow";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
  const resend = getResend();
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const description = formData.get("description") as string;
  const photos = formData.getAll("photos") as File[];

  const attachments = await Promise.all(
    photos.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const result = await ResultAsync.fromPromise(
    resend.emails.send({
      from: "noreply@resend.autosattlerei-guk.de",
      to: ["autosattler.guk@gmail.com"],
      subject: `Neue Anfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
        ${description ? `<p><strong>Beschreibung:</strong> ${description}</p>` : ""}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    }),
    (e) => (e instanceof Error ? e : new Error(String(e))),
  );

  if (result.isErr()) {
    console.error("Failed to send email:", result.error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
