import { env } from '@/common/utils'

import 'dotenv/config'

import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'

export default new DataSource({
	type: 'postgres',
	host: env('POSTGRES_HOST'),
	port: env('POSTGRES_PORT', { serialize: (value) => parseInt(value) }),
	username: env('POSTGRES_USER'),
	password: env('POSTGRES_PASSWORD'),
	entities: [join(__dirname, '../**/*.entity.{ts,js}'), join(__dirname, './**/*.entity.{ts,js}')],
	migrations: [join(__dirname, './migrations/*.{ts,js}')],
	seeds: [join(__dirname, './seeds/**/*.seeder.{ts,js}')],
	logging: true,
	synchronize: false,
	options: {
		trustServerCertificate: true,
		encrypt: false,
		enableArithAbort: true
	}
} as DataSourceOptions & SeederOptions)
