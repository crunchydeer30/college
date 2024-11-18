import { User } from '@prisma/client';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
}) satisfies z.Schema<Omit<User, 'id' | 'passwordHash'>>;
