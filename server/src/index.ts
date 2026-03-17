import cors from '@elysiajs/cors'
import { app } from './app'
import { closeDb, connectDb } from './config/db'
import { env } from './config/env'

const server = app.use(
	cors({
		origin: env.TRUSTED_ORIGIN
	})
)

export type App = typeof server

async function start(): Promise<void> {
	// 1. DB first
	await connectDb()

	// 2. Then accept traffic
	server.listen(env.PORT, () => {
		console.log(`Server running on port ${env.PORT}`)
	})
}

async function shutdown(signal: string): Promise<void> {
	console.log(`\nReceived ${signal}. Shutting down gracefully...`)

	// Safety net: force exit if shutdown hangs
	const forceExit = setTimeout(() => {
		console.error('Shutdown timed out. Forcing exit.')
		process.exit(1)
	}, 10_000).unref()

	// 1. Stop accepting traffic first
	try {
		await server.stop()
		console.log('Server stopped.')
	} catch (error) {
		console.error('Error stopping server:', error)
	}

	// 2. Then close DB
	try {
		await closeDb()
	} catch (error) {
		console.error('Error closing database:', error)
	}

	clearTimeout(forceExit)
	console.log('Shutdown complete.')
	process.exit(0)
}

function handleFatalError(type: string) {
	return (error: unknown) => {
		console.error(`${type}:`, error)
		shutdown(type).catch(() => process.exit(1))
	}
}

process.on('SIGINT', () => shutdown('SIGINT').catch(() => process.exit(1)))
process.on('SIGTERM', () => shutdown('SIGTERM').catch(() => process.exit(1)))
process.on('uncaughtException', handleFatalError('uncaughtException'))
process.on('unhandledRejection', handleFatalError('unhandledRejection'))

start().catch(error => {
	console.error('Failed to start:', error)
	process.exit(1)
})
