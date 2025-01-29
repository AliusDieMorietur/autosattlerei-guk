import z from "zod";

export const UpdateAdminBodySchema = z.object({
  name: z.string(),
  fcmDeviceToken: z.string(),
});

export type UpdateAdminBody = z.infer<typeof UpdateAdminBodySchema>;
