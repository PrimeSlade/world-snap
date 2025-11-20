import z from 'zod';

export const summerizeNewSchema = z.object({
  url: z.string(),
});

export type SummerizeNewDto = z.infer<typeof summerizeNewSchema>;
