import z from "zod";
export const productInputSchema = z.object({
  text: z.string(),
});
export const loadingInputSchema = z.object({
  value: z.number(),
});
