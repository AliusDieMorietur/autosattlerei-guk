import assert from "assert";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { User, UserCreate, UserUpdate } from "../types";
import { schema } from "../db/schemas";

const create = async (data: UserCreate): Promise<Pick<User, "id">> => {
  const rows = await db
    .insert(schema.user)
    .values(data)
    .returning({ id: schema.user.id });
  assert(rows[0]);
  return { id: rows[0].id };
};

const getByName = async (name: User["name"]): Promise<User | null> => {
  const user = await db.query.user.findFirst({
    where: eq(schema.user.name, name),
  });
  return user ?? null;
};

const get = async (id: User["id"]): Promise<User | null> => {
  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, id),
  });
  return user ?? null;
};

const update = async (
  id: User["id"],
  delta: UserUpdate
): Promise<Pick<User, "id">> => {
  await db.update(schema.user).set(delta).where(eq(schema.user.id, id));
  return { id };
};

export const user = {
  create,
  update,
  get,
  getByName,
};
