import { appConfig } from "../../config/app.js";
import { env } from "../../config/env.js";

export interface HealthStatus {
  name: string;
  description?: string;
  status: "ok" | "degraded" | "down";
  version: string;
  environment: string;
  uptime: number;
  timestamp: string;
  memory: {
    heapUsedMB: number;
    heapTotalMB: number;
  };
}

export const getHealthStatus = (): HealthStatus => {
  const mem = process.memoryUsage();

  return {
    name: appConfig.name,
    version: appConfig.version,
    status: "ok",
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: {
      heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
    },
  };
};
