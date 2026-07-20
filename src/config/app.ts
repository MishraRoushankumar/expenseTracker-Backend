import fs from "node:fs";

const packageJson = JSON.parse(
  fs.readFileSync(new URL("../../package.json", import.meta.url), "utf-8")
);

export const appConfig = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  repository: packageJson.repository,
} as const;
