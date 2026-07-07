import z from "zod";

export const transactionSortingSchema = z.object({
  sortBy: z
    .enum(["amount", "transactionDate", "createdAt"])
    .default("transactionDate"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
