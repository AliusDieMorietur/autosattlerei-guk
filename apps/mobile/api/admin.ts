import { config } from "@/config";
import { wApi } from ".";

const init = async (fcmDeviceToken: string) =>
  wApi()
    .url("/api/admin/init")
    .post({ fcmDeviceToken, name: config.adminName })
    .json();

const report = async (message: string) =>
  wApi().url("/api/admin/report").post({ message }).json();

export const admin = {
  init,
  report,
};
