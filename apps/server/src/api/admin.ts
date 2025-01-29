import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../lib/auth";
import {
  ReportAdminBody,
  UpdateAdminBody,
  UpdateAdminBodySchema,
} from "../types/api";
import { lib } from "../lib";

const init = async ({
  headers,
  body,
}: FastifyRequest<{
  Body: UpdateAdminBody;
}>) => {
  await auth.bearer(headers.authorization);
  const data = UpdateAdminBodySchema.parse(body);
  const admin = await lib.user.getByName(data.name);
  if (!admin) {
    await lib.user.create({
      name: data.name,
      fcmDeviceToken: data.fcmDeviceToken,
    });
  } else {
    if (admin.fcmDeviceToken === data.fcmDeviceToken) return { success: true };
    await lib.user.update(admin.id, {
      fcmDeviceToken: data.fcmDeviceToken,
    });
  }
  return { success: true };
};

const report = async ({
  headers,
  body,
}: FastifyRequest<{
  Body: ReportAdminBody;
}>) => {
  await auth.bearer(headers.authorization);
  const data = UpdateAdminBodySchema.parse(body);
  console.log("data", data);
  return { success: true };
};

export const admin = {
  init,
  report,
};
