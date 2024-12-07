import assert from "assert";
import { db } from "..";
import {
  Contact,
  ContactCreate,
  ContactSchema,
  ContactUpdate,
  Pagination,
} from "../../types";
import { schema } from "../schemas";
import { asc, desc, eq, ilike, or } from "drizzle-orm";
import { count } from "drizzle-orm";
import {} from "drizzle-orm";

export type Columns = keyof typeof schema.contact.$inferSelect;

const getList = async (
  { search }: { search: string },
  { limit = 100, offset = 0, orderBy = [] }: Pagination<Columns>
) => {
  const SEARCH_COLUMNS: Columns[] = ["name", "email", "phone", "description"];

  return await db.query.contact.findMany({
    where: or(
      ...SEARCH_COLUMNS.map((field) =>
        ilike(schema.contact[field], `%${search}%`)
      )
    ),
    limit,
    offset,
    orderBy: orderBy.map(({ field, direction }) =>
      direction === "asc"
        ? asc(schema.contact[field])
        : desc(schema.contact[field])
    ),
  });
};

const getTotal = async ({ search }: { search: string }): Promise<number> => {
  const SEARCH_COLUMNS: Columns[] = ["name", "email", "phone", "description"];
  const rows = await db
    .select({ count: count() })
    .from(schema.contact)
    .where(
      or(
        ...SEARCH_COLUMNS.map((field) =>
          ilike(schema.contact[field], `%${search}%`)
        )
      )
    );
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
