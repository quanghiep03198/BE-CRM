import { env } from '@/common/utils'
import { createKeyv } from '@keyv/redis'
import { CacheModuleOptions } from '@nestjs/cache-manager'
import { ConfigFactory } from '@nestjs/config'
import { ThrottlerOptions } from '@nestjs/throttler'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const appConfigFactory: ConfigFactory = () => ({
	cache: {
		stores: [
			createKeyv({
				socket: {
					host: env<string>('REDIS_HOST'),
					port: env<number>('REDIS_PORT', { serialize: (value): number => parseInt(value) }),
					reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
					keepAlive: 30000
				},
				password: env<string>('REDIS_PASSWORD')
			})
		]
	} as CacheModuleOptions,
	database: {
		type: 'postgres',
		host: env('POSTGRES_HOST'),
		port: env('POSTGRES_PORT', { serialize: (value): number => parseInt(value) }),
		username: env('POSTGRES_USER'),
		password: env('POSTGRES_PASSWORD'),
		database: env('POSTGRES_DB'),
		schema: 'dbo',
		entities: [join(__dirname, '**', '*.entity.{ts,js}')],
		migrations: [join(__dirname, '/migrations/**/*.{ts,js}')],
		subscribers: [join(__dirname, '**', '*.subscriber.{ts,js}')],
		autoLoadEntities: true,
		synchronize: true,
		logging: ['error'],
		namingStrategy: new SnakeNamingStrategy(),
		connectTimeoutMS: 10000,
		cache: {
			type: 'redis',
			options: {
				socket: {
					host: env('REDIS_HOST'),
					port: env('REDIS_PORT', { serialize: (value): number => parseInt(value) }),
					password: env('REDIS_PASSWORD')
				}
			},
			ignoreErrors: true
		}
	} satisfies TypeOrmModuleOptions,
	throttler: [
		{
			name: 'short',
			ttl: 1000,
			limit: 3
		},
		{
			name: 'medium',
			ttl: 10000,
			limit: 20
		},
		{
			name: 'long',
			ttl: 60000,
			limit: 100
		}
	] satisfies ThrottlerOptions[]
})
