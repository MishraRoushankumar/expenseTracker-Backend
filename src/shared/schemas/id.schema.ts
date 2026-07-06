import z from "zod";

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type IdParamDto = z.infer<typeof idParamsSchema>;
