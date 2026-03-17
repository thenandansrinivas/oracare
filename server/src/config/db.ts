import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/schemas/schema'
import { env, isDev } from './env'

const client = postgres(env.DB_URL, {
	max: 10,
	idle_timeout: 30,
	connect_timeout: 10
})

export const db = drizzle({ client, schema })

export async function connectDb(): Promise<void> {
	await db.execute('SELECT 1')
	isDev && console.log('Database connection established.')
}

export async function closeDb(): Promise<void> {
	await db.$client.end()
	isDev && console.log('Database connection closed.')
}
