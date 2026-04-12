import z from "zod";

const ConfigSchema = z.object({
  hostUrl: z.string(),
  gtmId: z.string().optional(),
  gaId: z.string().optional(),
  gaConversionId: z.string().optional(),
});

export type Config = z.infer<typeof ConfigSchema>;

const rawConfig = {
  hostUrl: process.env["NEXT_PUBLIC_HOST_URL"],
  gtmId: process.env["NEXT_PUBLIC_GTM_ID"],
  gaId: process.env["NEXT_PUBLIC_GA_ID"],
  gaConversionId: process.env["NEXT_PUBLIC_GA_CONVERSION_ID"],
};

export const config: Config = ConfigSchema.parse(rawConfig);
