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
  const {
    offset: offsetString,
    search,
    checked = "",
  } = GetContactListQuerySchema.parse(query);
  const offset = parseInt(offsetString);
  const LIMIT = 20;
  const checkedValue = {
    "1": true,
    "0": false,
    "": undefined,
  }[checked];
  const [items, total] = await Promise.all([
    storage.contact.getList(
      {
        search,
        checked: checkedValue,
      },
      {
        offset,
        limit: LIMIT,
        orderBy: [{ field: "createdAt", direction: "desc" }],
      }
    ),
    storage.contact.getTotal({
      search,
      checked: checkedValue,
    }),
  ]);
  return { items, total };
};
