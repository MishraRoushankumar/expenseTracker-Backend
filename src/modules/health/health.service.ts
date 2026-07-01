import { env } from "../../config/env.js";

export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  environment: string;
  uptime: number;
  timestamp: string;
  memory: {
    used: number;
    total: number;
  };
}

export const getHealthStatus = (): HealthStatus => {
  const mem = process.memoryUsage();

  return {
    status: "ok",
    environment: env.NODE_ENV ?? "development",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    memory: {
      used: Math.round(mem.heapUsed / 1024 / 1024),
      total: Math.round(mem.heapTotal / 1024 / 1024),
    },
  };
};
