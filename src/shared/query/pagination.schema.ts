import { z } from "zod";

import { QUERY_CONSTANTS } from "./query.constants.js";

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(QUERY_CONSTANTS.MIN_PAGE)
    .default(QUERY_CONSTANTS.DEFAULT_PAGE),

  limit: z.coerce
    .number()
    .int()
    .min(QUERY_CONSTANTS.MIN_LIMIT)
    .max(QUERY_CONSTANTS.MAX_LIMIT)
    .default(QUERY_CONSTANTS.DEFAULT_LIMIT),
});

export type PaginationQueryDto = z.infer<typeof paginationSchema>;
