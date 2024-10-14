import { z } from 'zod';
import { Record } from '@prisma/client';

export const CreateRecordSchema = z.object({
  content: z.string(),
}) satisfies z.Schema<Omit<Record, 'id'>>;
