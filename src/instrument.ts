import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { env } from './common/utils'

Sentry.init({
	dsn: env('SENTRY_DSN'),
	integrations: [nodeProfilingIntegration()],
	tracesSampleRate: 1.0,
	enabled: env('NODE_ENV') === 'production'
})
