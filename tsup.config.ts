import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  minify: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  clean: true,
  dts: false,
  env: {
    NODE_ENV: process.env.NODE_ENV || "development",
  },
});
