import { FastifyRequest } from "fastify";
import { GetContactListQuery, GetContactListQuerySchema } from "../../types";
import { lib } from "../../lib";

export const getList = async ({
  query,
  headers,
}: FastifyRequest<{
  Querystring: GetContactListQuery;
}>) => {
  await lib.auth.bearer(headers.authorization);
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
    lib.contact.getList(
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
    lib.contact.getTotal({
      search,
      checked: checkedValue,
    }),
  ]);
  return { items, total };
};
