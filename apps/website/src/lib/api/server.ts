import { api } from ".";

export const serverApi = () => api({ baseUrl: process.env["CMS_URL"]! });
