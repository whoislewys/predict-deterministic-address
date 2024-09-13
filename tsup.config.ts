import { defineConfig } from "tsup";

export default defineConfig({
  name: "@whoislewys/predict-deterministic-address",
  entry: ["index.ts"],
  outDir: "dist",
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  dts: true,
  clean: true,
  treeshake: true,
});
