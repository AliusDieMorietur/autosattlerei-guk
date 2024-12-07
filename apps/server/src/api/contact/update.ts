import { FastifyRequest } from "fastify";
import { auth } from "../../lib/auth";
import { storage } from "../../db/storage";
import { ContactUpdate, ContactUpdateSchema } from "../../types";

export const update = async ({
  params: { id },
  headers,
  body,
}: FastifyRequest<{
  Params: { id: string };
  Body: ContactUpdate;
}>) => {
  await auth.bearer(headers.authorization);
  const idInt = Number.parseInt(id);
  if (Number.isNaN(idInt)) {
    throw new Error(`Invalid id: "${id}"`);
  }
  const delta = ContactUpdateSchema.parse(body);
  await storage.contact.update(idInt, delta);
  return { id: parseInt(id) };
};
