import { z } from "zod";

export type CommonField = {
  type: "field";
  value: string;
};

export type FileField = {
  type: "file";
  mimetype: string;
  toBuffer: () => Promise<Buffer>;
};

export type ContactSubmitFormData = {
  name: CommonField;
  email: CommonField;
  phone: CommonField;
  description: CommonField;
  photos: FileField[] | FileField;
};

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Should be at least 2 characters"),
  email: z.string().email("Invalid Email"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone"
    )
    .or(z.string().max(0)),
  description: z.string(),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

export const GetContactListQuerySchema = z.object({
  offset: z.string().optional().default("0"),
  search: z.string().optional().default(""),
  checked: z.enum(["1", "0"]).optional(),
});

export type GetContactListQuery = z.infer<typeof GetContactListQuerySchema>;

export const ContactPhotoSchema = z.object({
  base64: z.string(),
  width: z.number(),
  height: z.number(),
});

export type ContactPhoto = z.infer<typeof ContactPhotoSchema>;

export const ContactSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  description: z.string().optional(),
  photos: z.array(ContactPhotoSchema).default([]),
  checked: z.boolean().default(false),
  createdAt: z.string().datetime({ offset: true }),
});

export type Contact = z.infer<typeof ContactSchema>;

export const ContactCreateSchema = ContactSchema.omit({
  id: true,
  createdAt: true,
}).partial({
  photos: true,
  phone: true,
  checked: true,
});

export type ContactCreate = z.infer<typeof ContactCreateSchema>;

export const ContactUpdateSchema = ContactSchema.omit({
  id: true,
  createdAt: true,
}).partial();

export type ContactUpdate = z.infer<typeof ContactUpdateSchema>;

export type OrderBy<F extends string> = { field: F; direction: "asc" | "desc" };

export type Pagination<F extends string = string> = {
  limit?: number;
  offset?: number;
  orderBy?: OrderBy<F>[];
};

export const User = z.object({
  id: z.number(),
  name: z.string(),
  fcmDeviceToken: z.string(),
  createdAt: z.date(),
});

export type User = z.infer<typeof User>;

export const UserCreateSchema = User.omit({
  id: true,
  createdAt: true,
});

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = User.omit({
  id: true,
  createdAt: true,
}).partial();

export type UserUpdate = z.infer<typeof UserUpdateSchema>;
