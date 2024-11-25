import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./start.ts"],
  sourcemap: true,
  format: ["esm"],
});
