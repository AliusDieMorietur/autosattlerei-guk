import fastify, { FastifyRequest } from "fastify";
import {
  ContactPhoto,
  ContactSubmitFormData,
  FileField,
  Form,
  FormSchema,
  GetContactListQuery,
  GetContactListQuerySchema,
} from "./src/types";
import { storage } from "./src/db/storage";
import { auth } from "./src/lib/auth";
import cors from "@fastify/cors";
import sizeOf from "image-size";
import sharp from "sharp";

const server = fastify({
  logger: true,
});

server.register(require("@fastify/multipart"), {
  attachFieldsToBody: true,
});

server.register(cors, {
  origin: "*",
});

server.post("/contact/submit", async (request) => {
  const fields = request.body as ContactSubmitFormData;
  if (fields.photos instanceof Array && fields.photos.length > 2) {
    throw new Error("Max 2 photos allowed");
  }
  const form: Form = {
    name: fields.name.value,
    email: fields.email.value,
    phone: fields.phone.value,
    description: fields.description.value,
  };

  const data = FormSchema.parse(form);
  const photos: ContactPhoto[] = [];
  const addPhoto = async (photo: FileField) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedMimeTypes.includes(photo.mimetype)) {
      return {
        statusCode: 400,
        error: "Bad Request",
        message: `Invalid photo type ${photo.mimetype}`,
      };
    }
    const buffer = await photo.toBuffer();
    const SIZE_LIMIT = 5 * 1024 * 1024;
    if (buffer.length > SIZE_LIMIT) {
      return {
        statusCode: 400,
        error: "Bad Request",
        message: `Photo is too large ${buffer.length}`,
      };
    }
    // 600 x 400
    const size = sizeOf(buffer);
    if (!size.width || !size.height) {
      return {
        statusCode: 400,
        error: "Bad Request",
        message: "Invalid photo",
      };
    }
    console.log("size", size);
    const max = size.width < size.height ? size.height : size.width;
    const MAX_SIDE = 500;
    const ratio = max > MAX_SIDE ? max / MAX_SIDE : 1;
    const cropped = await sharp(buffer).resize(500).toBuffer();
    const base64 = cropped.toString("base64");
    console.log("size 2", {
      width: Math.round(size.width / ratio),
      height: Math.round(size.height / ratio),
    });
    photos.push({
      width: Math.round(size.width / ratio),
      height: Math.round(size.height / ratio),
      base64,
    });
  };

  if (fields.photos instanceof Array) {
    for (const photo of fields.photos) {
      await addPhoto(photo);
    }
  } else if (fields.photos) {
    await addPhoto(fields.photos);
  }
  await storage.contact.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    description: data.description,
    photos: photos,
  });
  return { success: true };
});

server.get(
  "/contact/list",
  async ({
    query,
    headers,
  }: FastifyRequest<{
    Querystring: GetContactListQuery;
  }>) => {
    await auth.bearer(headers.authorization);
    console.log("query", query);
    const { offset: offsetString, search } =
      GetContactListQuerySchema.parse(query);
    console.log("search", search);
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
  }
);

server.delete(
  "/contact/:id",
  async ({
    params: { id },
    headers,
  }: FastifyRequest<{
    Params: { id: string };
  }>) => {
    await auth.bearer(headers.authorization);
    await storage.contact.delete(parseInt(id));
    return { id: parseInt(id) };
  }
);

server.listen({ host: "0.0.0.0", port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
