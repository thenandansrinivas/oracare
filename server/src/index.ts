import cors from '@elysiajs/cors'
import { app } from './app'
import { env } from './config/env'

const server = app.use(
	cors({
		origin: env.TRUSTED_ORIGIN
	})
)

export type App = typeof server

server.listen(env.PORT)
