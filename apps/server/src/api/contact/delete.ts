import { FastifyRequest } from "fastify";
import { auth } from "../../lib/auth";
import { storage } from "../../db/storage";

export const erase = async ({
  params: { id },
  headers,
}: FastifyRequest<{
  Params: { id: string };
}>) => {
  await auth.bearer(headers.authorization);
  await storage.contact.delete(parseInt(id));
  return { id: parseInt(id) };
};
