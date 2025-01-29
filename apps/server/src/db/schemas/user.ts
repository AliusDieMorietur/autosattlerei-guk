import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable(
  "User",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    fcmDeviceToken: text("fcmDeviceToken").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (user) => ({
    nameIdx: index("User_name_idx").on(user.name),
  })
);
