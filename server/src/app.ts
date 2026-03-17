import Elysia from 'elysia'
import { logger } from './lib/logger'

export const app = new Elysia().use(logger).get('/', () => 'Hello Elysia')
