export const RATE_LIMIT = {
  global: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },

  auth: {
    windowMs: 15 * 60 * 1000,
    max: 5,
  },
} as const;
