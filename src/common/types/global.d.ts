/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSourceOptions } from 'typeorm'

export declare global {
	type RuntimeEnvironment = 'development' | 'production' | 'test'

	interface PaginationParams {
		limit: number
		page: number
	}
	interface Pagination<T = unknown> extends PaginationParams {
		data: Array<T>
		hasNextPage: boolean
		hasPrevPage: boolean
		totalDocs: number
		totalPages: number
	}

	type DatabaseType<T = 'mssql'> = Extract<DataSourceOptions['type'], T>

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: RuntimeEnvironment
			HOST: string
			PORT: string

			// * Database
			POSTGRES_URL: string
			POSTGRES_HOST: string
			POSTGRES_PORT: string
			POSTGRES_USER: string
			POSTGRES_PASSWORD: string
			POSTGRES_DB: string
			PGADMIN_DEFAULT_EMAIL: string
			PGADMIN_DEFAULT_PASSWORD: string

			// * Redis
			REDIS_HOST: string
			REDIS_PORT: string
			REDIS_PASSWORD: string

			// * Bcrypt
			BCRYPT_SALT_ROUNDS: string

			// * Jwt
			JWT_SECRET: string
			JWT_EXPIRES: string
			// * Sentry
			SENTRY_DSN: string
			SENTRY_AUTH_TOKEN: string
		}
	}

	type FirstParameter<T> = T extends (first: infer FirstArgument, ...args: any[]) => infer T ? FirstArgument : never

	type ProcessEnv = {
		[K in keyof NodeJS.ProcessEnv as string extends K ? never : number extends K ? never : K]: NodeJS.ProcessEnv[K]
	}
}
