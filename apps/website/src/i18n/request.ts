import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import deMessages from "../../messages/de.json";

export default getRequestConfig(async () => ({
  locale: routing.defaultLocale,
  messages: deMessages,
}));
