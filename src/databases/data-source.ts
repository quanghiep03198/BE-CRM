import { env } from '@/common/utils'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'

export default new DataSource({
	type: 'postgres',
	host: env('POSTGRES_HOST'),
	port: env('POSTGRES_PORT', { serialize: (value): number => parseInt(value) }),
	username: env('POSTGRES_USER'),
	password: env('POSTGRES_PASSWORD'),
	database: env('POSTGRES_DB'),
	schema: 'dbo',
	entities: [join(__dirname, '../**/*.entity.{ts,js}')],
	subscribers: [join(__dirname, '../**/*.subscriber.{ts,js}')],
	migrations: [join(__dirname, './migrations/*.{ts,js}')],
	seeds: [join(__dirname, './seeds/**/*.seeder.{ts,js}')],
	logging: true,
	synchronize: true,
	options: {
		trustServerCertificate: true,
		encrypt: false,
		enableArithAbort: true
	}
} as DataSourceOptions & SeederOptions)
