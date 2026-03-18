import { rateLimit } from 'elysia-rate-limit'
import { env } from '@/config/env'

export const globalRateLimiter = rateLimit({
	max: env.RATE_LIMIT_MAX,
	duration: env.RATE_LIMIT_DURATION,
	skip: req => env.RATE_LIMIT_GLOBAL_IGNORE.includes(new URL(req.url).pathname),
	countFailedRequest: false
})

export const authRateLimiter = rateLimit({
	max: env.RATE_LIMIT_MAX,
	duration: env.RATE_LIMIT_DURATION,
	skip: req => {
		if (env.RATE_LIMIT_AUTH_IGNORE.length === 0) return false
		return env.RATE_LIMIT_AUTH_IGNORE.includes(new URL(req.url).pathname)
	},
	countFailedRequest: true
})
