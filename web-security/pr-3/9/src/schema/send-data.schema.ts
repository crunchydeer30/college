import { z } from 'zod';

export const SendDataSchema = z.object({
  html: z.string(),
});
