import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  SECRET_KEY: z.string(),
  SECRET_IV: z.string(),
});

const envData = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_IV: process.env.SECRET_IV,
};

const parsed = envSchema.safeParse(envData);

if (!parsed.success) {
  console.log('❌ Invalid environment variables');
  console.error(parsed.error.message);
  process.exit(1);
}

const env = parsed.data;
export default env;
