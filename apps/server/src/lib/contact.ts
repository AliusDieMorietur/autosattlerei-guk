import assert from "assert";
import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import { count } from "drizzle-orm";
import {} from "drizzle-orm";
import { schema } from "../db/schemas";
import { db } from "../db";
import { Pagination, ContactCreate, Contact, ContactUpdate } from "../types";

export type Columns = keyof typeof schema.contact.$inferSelect;

const getList = async (
  { search, checked }: { search: string; checked?: boolean },
  { limit = 100, offset = 0, orderBy = [] }: Pagination<Columns>
) => {
  const SEARCH_COLUMNS: Columns[] = ["name", "email", "phone", "description"];

  let where = or(
    ...SEARCH_COLUMNS.map((field) =>
      ilike(schema.contact[field], `%${search}%`)
    )
  );

  if (checked !== undefined) {
    where = and(where, eq(schema.contact.checked, checked));
  }

  return await db.query.contact.findMany({
    where,
    limit,
    offset,
    orderBy: orderBy.map(({ field, direction }) =>
      direction === "asc"
        ? asc(schema.contact[field])
        : desc(schema.contact[field])
    ),
  });
};

const getTotal = async ({
  search,
  checked,
}: {
  search: string;
  checked?: boolean;
}): Promise<number> => {
  const SEARCH_COLUMNS: Columns[] = ["name", "email", "phone", "description"];
  let where = or(
    ...SEARCH_COLUMNS.map((field) =>
      ilike(schema.contact[field], `%${search}%`)
    )
  );

  if (checked !== undefined) {
    where = and(where, eq(schema.contact.checked, checked));
  }

  const rows = await db
    .select({ count: count() })
    .from(schema.contact)
    .where(where);
  assert(rows[0], "Total must be defined");
  return rows[0].count;
};

const create = async (data: ContactCreate): Promise<{ id: Contact["id"] }> => {
  const rows = await db
    .insert(schema.contact)
    .values(data)
    .returning({ id: schema.contact.id });
  assert(rows[0]);
  return { id: rows[0].id };
};

const erase = async (id: Contact["id"]) => {
  await db.delete(schema.contact).where(eq(schema.contact.id, id));
};

const update = async (id: Contact["id"], delta: ContactUpdate) => {
  await db.update(schema.contact).set(delta).where(eq(schema.contact.id, id));
};

export const contact = {
  getList,
  delete: erase,
  create,
  getTotal,
  update,
};
