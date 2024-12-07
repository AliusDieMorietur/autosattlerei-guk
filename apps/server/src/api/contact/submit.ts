import sizeOf from "image-size";
import sharp from "sharp";
import { storage } from "../../db/storage";
import {
  ContactSubmitFormData,
  ContactForm,
  ContactFormSchema,
  ContactPhoto,
  FileField,
} from "../../types";
import { FastifyRequest } from "fastify";

export const submit = async (request: FastifyRequest) => {
  const fields = request.body as ContactSubmitFormData;
  if (fields.photos instanceof Array && fields.photos.length > 2) {
    throw new Error("Max 2 photos allowed");
  }
  const form: ContactForm = {
    name: fields.name.value,
    email: fields.email.value,
    phone: fields.phone.value,
    description: fields.description.value,
  };
  const data = ContactFormSchema.parse(form);
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
    const size = sizeOf(buffer);
    if (!size.width || !size.height) {
      return {
        statusCode: 400,
        error: "Bad Request",
        message: "Invalid photo",
      };
    }
    const max = size.width < size.height ? size.height : size.width;
    const MAX_SIDE = 500;
    const ratio = max > MAX_SIDE ? max / MAX_SIDE : 1;
    const cropped = await sharp(buffer).resize(500).toBuffer();
    const base64 = cropped.toString("base64");
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
};
