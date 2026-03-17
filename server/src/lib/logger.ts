import logixlysia from 'logixlysia'
import { isDev } from '@/config/env'

export const logger = logixlysia({
	config: {
		showStartupMessage: isDev,
		startupMessageFormat: 'simple',
		disableInternalLogger: !isDev,
		disableFileLogging: isDev,
		logFilePath: './logs/app.log',
		useColors: true,
		timestamp: {
			translateTime: 'yyyy-mm-dd HH:mm:ss'
		},
		logRotation: {
			maxSize: '1g',
			interval: '1d',
			maxFiles: '30d',
			compress: true
		},
		ip: true,
		customLogFormat: '🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}'
	}
})
