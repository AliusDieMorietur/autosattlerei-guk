import { FastifyRequest } from "fastify";
import { lib } from "../../lib";

export const erase = async ({
  params: { id },
  headers,
}: FastifyRequest<{
  Params: { id: string };
}>) => {
  await lib.auth.bearer(headers.authorization);
  await lib.contact.delete(parseInt(id));
  return { id: parseInt(id) };
};
