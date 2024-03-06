import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log('Env inválido.', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
