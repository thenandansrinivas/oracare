import { defineConfig } from 'drizzle-kit'
import { env } from '@/config/env'

export default defineConfig({
	dialect: 'postgresql',
	out: './.drizzle',
	schema: './src/schemas',
	dbCredentials: {
		url: env.DB_URL
	}
})
