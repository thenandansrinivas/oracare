import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['dev', 'pro']).default('dev'),
	TRUSTED_ORIGIN: z.string().transform(val => val.split(',').map(s => s.trim())),
	DB_URL: z.url(),
	RATE_LIMIT_MAX: z.coerce.number().default(100),
	RATE_LIMIT_DURATION: z.coerce
		.number()
		.default(60)
		.transform(s => s * 1000),
	RATE_LIMIT_GLOBAL_IGNORE: z
		.string()
		.default('/live,/health')
		.transform(val => val.split(',').map(s => s.trim())),
	RATE_LIMIT_AUTH_IGNORE: z
		.string()
		.default('')
		.transform(val => (val ? val.split(',').map(s => s.trim()) : []))
})

export const isDev = process.env.NODE_ENV === 'dev'

export const env = envSchema.parse(process.env)
