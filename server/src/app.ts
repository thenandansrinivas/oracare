import Elysia from 'elysia'
import { logger } from './lib/logger'
import router from './routers/router'

export const app = new Elysia()
	.use(logger)
	.use(router)
	.get('/', () => 'Hello Elysia')
