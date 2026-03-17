import { treaty } from '@elysiajs/eden'
import type { App } from '@server/index'
import { env } from '@/config/env'

const rpc = treaty<App>(env.VITE_SERVER_URL, {
	fetch: {
		credentials: 'include'
	}
})

export default rpc
