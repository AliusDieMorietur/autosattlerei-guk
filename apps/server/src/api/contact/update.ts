import { FastifyRequest } from "fastify";
import { ContactUpdate, ContactUpdateSchema } from "../../types";
import { lib } from "../../lib";

export const update = async ({
  params: { id },
  headers,
  body,
}: FastifyRequest<{
  Params: { id: string };
  Body: ContactUpdate;
}>) => {
  await lib.auth.bearer(headers.authorization);
  const idInt = Number.parseInt(id);
  if (Number.isNaN(idInt)) {
    throw new Error(`Invalid id: "${id}"`);
  }
  const delta = ContactUpdateSchema.parse(body);
  await lib.contact.update(idInt, delta);
  return { id: parseInt(id) };
};
