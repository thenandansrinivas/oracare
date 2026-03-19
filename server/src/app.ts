import Elysia from 'elysia'
import { logger } from './lib/logger'
import { globalRateLimiter } from './lib/ratelimiter'
import router from './routers/router'

export const app = new Elysia()
	.use(logger)
	.use(globalRateLimiter)
	// Handle the 429 inside Elysia's lifecycle so logger catches it
	.onAfterHandle(({ set }) => {
		if (set.status === 429) {
			set.headers['Content-Type'] = 'application/json'
			return {
				success: false,
				message: 'Too many requests. Please try again later.'
			}
		}
	})
	.use(router)
	.get('/live', () => {
		const now = new Date()
		return {
			status: 'ok',
			uptime: process.uptime(),
			timestamp: now.toISOString(),
			localTime: now.toLocaleString('en-IN')
		}
	})
