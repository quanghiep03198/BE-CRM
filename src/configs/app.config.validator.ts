import { RuntimeEnvironment } from '@/common/constants'
import { Logger } from '@nestjs/common'
import { z } from 'zod'

export const configValidator = z.object({
	// * Application
	NODE_ENV: z.nativeEnum(RuntimeEnvironment),
	HOST: z.string().trim().ip({ version: 'v4' }),
	PORT: z
		.string()
		.trim()
		.min(1)
		.refine((value) => !isNaN(+value))
		.transform((value) => +value),

	// * PostgreSQL
	// POSTGRES_URL: z.string().trim().min(1),
	PGADMIN_DEFAULT_EMAIL: z.string().trim().min(1),
	PGADMIN_DEFAULT_PASSWORD: z.string().trim().min(1),

	// * Redis
	REDIS_HOST: z.string().trim().min(1),
	REDIS_PORT: z
		.string()
		.trim()
		.min(1)
		.refine((value) => value === '6379' || !isNaN(+value))
		.transform((value) => Number(value)),
	REDIS_PASSWORD: z.string().trim().min(1),

	// * Bcrypt
	BCRYPT_SALT_ROUNDS: z
		.string()
		.trim()
		.min(1)
		.refine((value) => !isNaN(+value))
		.transform((value) => Number(value)),

	// * JWT
	JWT_SECRET: z.string().trim().min(1),
	JWT_EXPIRES: z.string().trim().min(1).or(z.number().positive()),

	// * Sentry
	SENTRY_DSN: z.string().trim().min(1),
	SENTRY_AUTH_TOKEN: z.string().trim().min(1)
})

export const validateConfig = async (config: Record<string, any>) => {
	try {
		return await configValidator.parseAsync(config)
	} catch (error) {
		Logger.error(error)
	}
}
