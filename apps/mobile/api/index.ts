import { config } from "@/config";
import { admin } from "./admin";
import wretch from "wretch";

export const wApi = () =>
  wretch(config.serverUrl).auth(`Bearer ${config.secretToken}`);

export const api = {
  admin,
};
