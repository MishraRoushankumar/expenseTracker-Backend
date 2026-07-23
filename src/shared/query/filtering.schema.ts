import z from "zod";

export const transactionFilteringSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
