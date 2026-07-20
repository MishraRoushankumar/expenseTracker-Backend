import packageJson from "../../package.json" with { type: "json" };

export const appConfig = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  repository: packageJson.repository,
} as const;
