import { FastifyRequest } from "fastify";
import { GetContactListQuery, GetContactListQuerySchema } from "../../types";
import { auth } from "../../lib/auth";
import { storage } from "../../db/storage";

export const getList = async ({
  query,
  headers,
}: FastifyRequest<{
  Querystring: GetContactListQuery;
}>) => {
  await auth.bearer(headers.authorization);
  const { offset: offsetString, search } =
    GetContactListQuerySchema.parse(query);
  const offset = parseInt(offsetString);
  const LIMIT = 20;
  const [items, total] = await Promise.all([
    storage.contact.getList(
      {
        search,
      },
      {
        offset,
        limit: LIMIT,
        orderBy: [{ field: "createdAt", direction: "desc" }],
      }
    ),
    storage.contact.getTotal({
      search,
    }),
  ]);
  return { items, total };
};
