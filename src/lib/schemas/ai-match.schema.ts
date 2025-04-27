import { z } from 'zod';

export const AIMatchRequestSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Opis preferencji musi zawierać co najmniej 10 znaków')
    .max(1000, 'Opis preferencji nie może przekraczać 1000 znaków'),
  limit: z
    .number()
    .int('Limit musi być liczbą całkowitą')
    .min(1, 'Limit musi być większy lub równy 1')
    .max(50, 'Limit nie może przekraczać 50'),
});

export type AIMatchRequestSchemaType = z.infer<typeof AIMatchRequestSchema>;
