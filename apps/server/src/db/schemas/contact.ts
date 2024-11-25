import { timestamp } from "drizzle-orm/pg-core";
import { index, pgTable, serial, text, jsonb } from "drizzle-orm/pg-core";
import { ContactPhoto } from "../../types";

export const contact = pgTable(
  "Contact",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    description: text("description"),
    photos: jsonb("photos").$type<ContactPhoto[]>().default([]),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (contact) => ({
    emailIdx: index("Contact_email_idx").on(contact.email),
    phoneIdx: index("Contact_phone_idx").on(contact.phone),
    nameIdx: index("Contact_name_idx").on(contact.name),
    descriptionIdx: index("Contact_description_idx").on(contact.description),
  })
);
