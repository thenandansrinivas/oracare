import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['dev', 'pro']).default('dev'),
	TRUSTED_ORIGIN: z.string().transform(val => val.split(',').map(s => s.trim())),
	DB_URL: z.url()
})

export const isDev = process.env.NODE_ENV === 'dev'

export const env = envSchema.parse(process.env)
